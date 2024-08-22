'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { FormEvent, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { transferBalance } from '@/actions/transactions';

type Props = {
  currentBalance: number;
  currentSavings: number;
};

const SavingsModal = ({ currentBalance, currentSavings }: Props) => {
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const handleBalanceTransfer = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        toast.loading('Transferring...', {
          id: 'loading',
        });
        e.preventDefault();
        const res = await transferBalance(transferAmount, currentBalance);
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
    },
    [transferAmount, currentBalance]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="b-1 cursor-pointer rounded-md border bg-white p-1 hover:bg-slate-200">
          <ArrowUpRight />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Savings</DialogTitle>
        <DialogDescription></DialogDescription>
        <form onSubmit={handleBalanceTransfer}>
          <Card>
            <CardHeader>
              <CardTitle>Transfer Balance</CardTitle>
              <CardDescription>
                Here you can transfer money from your balance to your savings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentSavings">Current Savings</Label>
                  <Input value={currentSavings} disabled />
                </div>
                <div>
                  <Label htmlFor="currentBalance">Current Balance</Label>
                  <Input defaultValue={currentBalance} disabled />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="transferAmount">Transfer Amount</Label>
                <Input
                  id="transferAmount"
                  type="number"
                  step="0.01"
                  max={currentBalance}
                  min={0.01}
                  onChange={(e) => setTransferAmount(Number(e.target.value))}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                disabled={
                  !transferAmount ||
                  transferAmount > currentBalance ||
                  transferAmount <= 0
                }
              >
                Transfer
              </Button>
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SavingsModal;
