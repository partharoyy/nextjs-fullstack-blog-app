'use client';

import { useState } from 'react';
import AddNewBlog from '../add-new-blog';

const initialFormData = {
  title: '',
  description: '',
};

function BlogOverview() {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  async function handleSaveNewBlog() {
    try {
      setLoading(true);
      const apiResponse = await fetch('/api/add-blog', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      const result = await apiResponse.json();
      if (result?.success) {
        setFormData(formData);
        setOpenBlogDialog(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setFormData(initialFormData);
    }
  }

  return (
    <div className='min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6'>
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        formData={formData}
        setFormData={setFormData}
        handleSaveNewBlog={handleSaveNewBlog}
      />
      <div>Blog list section</div>
    </div>
  );
}

export default BlogOverview;
