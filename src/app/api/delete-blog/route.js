import connectDB from '@/database';
import Blog from '@/models/blog';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Blog ID is required',
      });
    }

    const deleteCurrentBlog = await Blog.findByIdAndDelete(id);

    if (deleteCurrentBlog) {
      return NextResponse.json({
        success: true,
        message: 'Blog has been deleted successfully',
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong! Please try again',
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
