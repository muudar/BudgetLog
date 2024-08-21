import { deleteTransaction } from '@/actions/transactions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

export function DeleteTransactionModal({ id }: { id: string }) {
  const handleDeleteTransaction = useCallback(async () => {
    try {
      toast.loading('Deleting transaction...', {
        id: 'loading',
      });
      const res = await deleteTransaction(id);
      if (res.ok) {
        toast.success(res.message);
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
  }, [id]);
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div>Delete</div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            transaction and all related data from our server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteTransaction}
            className="bg-red-500 hover:bg-red-500"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
