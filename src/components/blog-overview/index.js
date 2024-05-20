'use client';

import { useState } from 'react';
import AddNewBlog from '../add-new-blog';

function BlogOverview() {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);

  return (
    <div className='min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6'>
      <AddNewBlog openBlogDialog={openBlogDialog} setOpenBlogDialog={setOpenBlogDialog} />
      <div>Blog list section</div>
    </div>
  );
}

export default BlogOverview;
