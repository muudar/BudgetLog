import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '@/lib/types';
import { useCallback, useState } from 'react';
import AddCategoryModal from '../../_components/cards/modals/AddCategoryModal';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import { editTransaction } from '@/actions/transactions';

export function EditTransactionModal({
  transaction,
  categories,
}: {
  transaction: any;
  categories: any[];
}) {
  const [open, setOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [data, setData] = useState({
    id: transaction.id,
    amount: transaction.amount,
    category: transaction.category.name,
    description: transaction.description,
  });

  const handleEditTransaction = useCallback(async () => {
    try {
      toast.loading('Editing...', {
        id: 'loading',
      });
      const res = await editTransaction(data);
      if (res.ok) {
        toast.success(res.message);
        setOpen(false);
      }
      if (!res.ok) {
        toast.error(res.message || 'Internal server error');
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Internal server error'
      );
      console.error(error);
    } finally {
      toast.remove('loading');
    }
  }, [data]);
  console.log(data.category);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex w-full justify-start">
        <div>Edit</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <form className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="type">Type </Label>
            <Input id="type" value={transaction.type} disabled></Input>
          </div>
          <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Label htmlFor="type">Amount</Label>
              <Input
                className="sm:w-[120px]"
                type="number"
                min="0"
                step="0.01"
                id="type"
                value={data.amount}
                onChange={(e) => setData({ ...data, amount: e.target.value })}
              ></Input>
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="type">Category</Label>
              <Select
                value={data.category ?? undefined}
                onValueChange={(e: string) => setData({ ...data, category: e })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="max-h-[250px] overflow-y-scroll">
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categories.length > 0 ? (
                      categories.map((category: Category) => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.emoji + ' ' + category.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="m-2 flex justify-center text-sm">
                        No categories found
                      </div>
                    )}
                    <AddCategoryModal
                      open={categoryModalOpen}
                      setOpen={setCategoryModalOpen}
                    ></AddCategoryModal>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="transferAmount">Description</Label>
            <Textarea
              value={data.description}
              id="description"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            ></Textarea>
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleEditTransaction}
            disabled={
              !data.amount ||
              !data.category ||
              (transaction.amount == data.amount &&
                transaction.category.name == data.category &&
                transaction.description == data.description)
            }
          >
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
