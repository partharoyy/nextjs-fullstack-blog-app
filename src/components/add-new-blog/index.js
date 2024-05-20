'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function AddNewBlog({ openBlogDialog, setOpenBlogDialog }) {
  return (
    <>
      <div>
        <Button onClick={() => setOpenBlogDialog(true)}>Add new blog</Button>
      </div>
      <Dialog open={openBlogDialog} onOpenChange={setOpenBlogDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add New Blog</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Title
              </Label>
              <Input id='name' className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Description
              </Label>
              <Input id='username' className='col-span-3' />
            </div>
          </div>
          <DialogFooter>
            <Button type='button'>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewBlog;
