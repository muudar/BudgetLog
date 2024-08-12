import React, { useState } from 'react';
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
import EmojiPicker from 'emoji-picker-react';
import { addCategory } from '@/actions/actions';

const AddCategoryModal = () => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [emoji, setEmoji] = useState('💰');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCategory(categoryName, emoji);
    setEmojiPickerOpen(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Add Category</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
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
                onClick={() => setEmojiPickerOpen((prev) => !prev)}
              >
                Emoji picker
              </Button>
              <Button type="submit" disabled={!categoryName || !emoji}>
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
