'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowUpRight } from 'lucide-react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getCategories } from '@/actions/categories';
import { transferBalance } from '@/actions/actions';
import AddCategoryModal from './AddCategoryModal';

type Props = {
  currentBalance: number;
  currentSavings: number;
};

//TODO: Create category type
type Category = any;

const EarningsModal = ({ currentBalance, currentSavings }: Props) => {
  const [categories, setCategories]: Category[] = useState([]);
  console.log(categories);
  const [amount, setAmount] = useState<number>(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      if (res.ok && res.data) {
        setCategories(res.data);
      }
    };
    fetchCategories();
  }, []);
  //   const handleBalanceTransfer = useCallback(
  //     async (e: FormEvent<HTMLFormElement>) => {
  //       try {
  //         toast.loading('Transferring...', {
  //           id: 'loading',
  //         });
  //         e.preventDefault();
  //         const res = await transferBalance(transferAmount, currentBalance);
  //         if (res.ok) {
  //           toast.success(res.message);
  //           setOpen(false);
  //         }
  //         if (!res.ok) {
  //           toast.error(res.message || 'Internal server error');
  //         }
  //       } catch (error) {
  //         toast.error(
  //           error instanceof Error ? error.message : 'Internal server error'
  //         );
  //         console.error(error);
  //       } finally {
  //         toast.remove('loading');
  //       }
  //     },
  //     [transferAmount, currentSavings]
  //   );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="b-1 cursor-pointer rounded-md border bg-white p-1 hover:bg-slate-200">
          <ArrowUpRight />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Earnings</DialogTitle>
        <form>
          <Card>
            <CardHeader>
              <CardTitle>Add Earnings Record</CardTitle>
              <CardDescription>
                Here you can log your earnings such as wage, investments, sales,
                etc ...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <Label htmlFor="currentBalance">Current Balance</Label>
                <Input defaultValue={currentBalance} disabled />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="transferAmount">Earnings Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min={0.01}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="transferAmount">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {categories.length > 0 ? (
                          categories.map((category: Category) => (
                            <SelectItem
                              key={category.name}
                              value={category.emoji + ' ' + category.name}
                            >
                              {category.emoji + ' ' + category.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="m-2 flex justify-center text-sm">
                            No categories found
                          </div>
                        )}
                        <AddCategoryModal></AddCategoryModal>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Add Record</Button>
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EarningsModal;
