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
import { useState } from 'react';

export function EditTransactionModal({ transaction }: { transaction: any }) {
  const [open, setOpen] = useState(false);
  console.log(transaction);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex w-full justify-start">
        <div>Edit</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <form>
          <div className="flex items-center gap-2">
            <Label htmlFor="type">Type </Label>
            <Input id="type" value={transaction.type} disabled></Input>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="type">Amount</Label>
              <Input id="type" value={transaction.amount}></Input>
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button>Edit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
