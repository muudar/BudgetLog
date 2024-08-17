import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import EmojiPicker from 'emoji-picker-react';
import { addCategory } from '@/actions/categories';
import toast from 'react-hot-toast';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddCategoryModal = ({ open, setOpen }: Props) => {
  const [categoryName, setCategoryName] = useState('');
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [emoji, setEmoji] = useState('💰');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      toast.loading('Creating category', {
        id: 'loading',
      });
      const res = await addCategory(categoryName, emoji);
      setEmojiPickerOpen(false);
      setOpen(false);
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
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Add Category</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form name="category" id="category" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            <div className="grid grid-cols-5 items-center gap-2">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="col-span-2"
              />
              <Label htmlFor="name" className="text-right">
                Emoji
              </Label>
              <div className="ml-2 text-2xl">{emoji}</div>
            </div>
            <div className="flex justify-center">
              <div>
                <EmojiPicker
                  open={emojiPickerOpen}
                  onEmojiClick={(emoji) => {
                    setEmojiPickerOpen(false);
                    setEmoji(emoji.emoji);
                  }}
                  width={'100%'}
                  height={350}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-center gap-2">
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setEmojiPickerOpen((prev) => !prev);
                }}
              >
                Emoji picker
              </Button>
              <Button
                type="submit"
                form="category"
                disabled={!categoryName || !emoji}
              >
                Add Category
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
