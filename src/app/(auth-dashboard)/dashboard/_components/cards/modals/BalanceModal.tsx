'use client';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ArrowUpRight } from 'lucide-react';
import { FormEvent, useCallback, useState, useTransition } from 'react';
import { transferSavings, updateBalance } from '@/actions/actions';

type Props = {
  currentBalance: number;
  currentSavings: number;
};

const BalanceModal = ({ currentBalance, currentSavings }: Props) => {
  const [newBalance, setNewBalance] = useState<number>(currentBalance);
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const handleSavingsTransfer = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        toast.loading('Transferring...', {
          id: 'loading',
        });
        e.preventDefault();
        const res = await transferSavings(transferAmount, currentSavings);
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
    [transferAmount, currentSavings]
  );

  const handleChangeBalanceSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      let res = null;
      try {
        toast.loading('Updating...', {
          id: 'loading',
        });
        e.preventDefault();
        res = await updateBalance(newBalance);
      } catch (error) {
        console.log(error);
      } finally {
        toast.remove('loading');
        if (res?.ok) {
          toast.success(res.message);
          setOpen(false);
        } else {
          toast.error(res?.message || 'Internal server error');
        }
      }
    },
    [newBalance]
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="b-1 cursor-pointer rounded-md border bg-white p-1 hover:bg-slate-200">
          <ArrowUpRight />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Balance</DialogTitle>
        <Tabs defaultValue="account" className="w-full p-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="modify">Change Balance</TabsTrigger>
            <TabsTrigger value="transfer">Transfer Savings</TabsTrigger>
          </TabsList>
          <TabsContent value="modify">
            <form className="space-y-2" onSubmit={handleChangeBalanceSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Modify Balance</CardTitle>
                  <CardDescription>
                    {
                      "Use 'Modify Balance' only for setting your initial balance or adjusting for non-transactional changes (e.g., found money). For regular updates, log your spendings or earnings instead."
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <Label htmlFor="currentBalance">Current Balance</Label>
                    <Input
                      id="currentBalance"
                      defaultValue={currentBalance}
                      disabled
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="newBalance">New Balance</Label>
                    <Input
                      id="newBalance"
                      value={newBalance}
                      type="number"
                      step="0.01"
                      onChange={(e) => setNewBalance(Number(e.target.value))}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    disabled={
                      newBalance == currentBalance ||
                      newBalance == null ||
                      newBalance == undefined
                    }
                  >
                    Save changes
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>
          <TabsContent value="transfer">
            <form onSubmit={handleSavingsTransfer}>
              <Card>
                <CardHeader>
                  <CardTitle>Transfer Savings</CardTitle>
                  <CardDescription>
                    Here you can transfer money from your savings back to your
                    balance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currentBalance">Current Balance</Label>
                      <Input defaultValue={currentBalance} disabled />
                    </div>
                    <div>
                      <Label htmlFor="currentSavings">Current Savings</Label>
                      <Input value={currentSavings} disabled />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="transferAmount">Transfer Amount</Label>
                    <Input
                      id="transferAmount"
                      type="number"
                      step="0.01"
                      max={currentSavings}
                      min={0.01}
                      onChange={(e) =>
                        setTransferAmount(Number(e.target.value))
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    disabled={
                      !transferAmount ||
                      transferAmount > currentSavings ||
                      transferAmount <= 0
                    }
                  >
                    Transfer
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default BalanceModal;
