import connectDB from '@/database';
import Blog from '@/models/blog';
import Joi from 'joi';
import { NextResponse } from 'next/server';

const UpdateBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const getUpdateBlogId = searchParams.get('id');

    if (!getUpdateBlogId) {
      return NextResponse.json({
        success: false,
        message: 'Blog ID is required',
      });
    }

    const { title, description } = await req.json();

    const { error } = UpdateBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const updatedBlogId = await Blog.findOneAndUpdate({ _id: getUpdateBlogId }, { title, description }, { new: true });

    if (updatedBlogId) {
      return NextResponse.json({
        success: true,
        message: 'Blog updated successfully',
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again',
    });
  }
}
