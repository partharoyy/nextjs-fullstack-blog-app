'use client';

import { useEffect, useState } from 'react';
import AddNewBlog from '../add-new-blog';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const initialFormData = {
  title: '',
  description: '',
};

function BlogOverview({ blogList }) {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [toBeUpdatedBlogId, setToBeUpdatedBlogId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  function handleUpdateBlog(blog) {
    setToBeUpdatedBlogId(blog._id);
    setFormData({
      title: blog?.title,
      description: blog?.description,
    });
    setOpenBlogDialog(true);
  }

  async function handleSaveNewBlog() {
    try {
      setLoading(true);
      const apiResponse =
        toBeUpdatedBlogId !== null
          ? await fetch(`/api/update-blog?id=${toBeUpdatedBlogId}`, {
              method: 'PUT',
              body: JSON.stringify(formData),
            })
          : await fetch('/api/add-blog', {
              method: 'POST',
              body: JSON.stringify(formData),
            });

      const result = await apiResponse.json();
      if (result?.success) {
        router.refresh();
        setFormData(formData);
        setOpenBlogDialog(false);
        setLoading(false);
        setToBeUpdatedBlogId(null);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setFormData(initialFormData);
    }
  }

  const handleDeleteBlog = async (id) => {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${id}`, {
        method: 'DELETE',
      });

      const result = await apiResponse.json();

      if (result?.success) router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6'>
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        formData={formData}
        setFormData={setFormData}
        handleSaveNewBlog={handleSaveNewBlog}
        toBeUpdatedBlogId={toBeUpdatedBlogId}
        setToBeUpdatedBlogId={setToBeUpdatedBlogId}
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-6'>
        {blogList && blogList.length > 0 ? (
          blogList.map((blog) => (
            <Card className='p-5' key={blog._id}>
              <CardContent>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>{blog.description}</CardDescription>
                <div className='flex items-center mt-5 gap-5'>
                  <Button onClick={() => handleUpdateBlog(blog)}>Edit</Button>
                  <Button onClick={() => handleDeleteBlog(blog._id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <label className='text-4xl font-extrabold'>No blogs found! Please add one.</label>
        )}
      </div>
    </div>
  );
}

export default BlogOverview;
