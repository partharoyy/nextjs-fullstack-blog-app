import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600 p-6'>
      <div className='container mx-auto flex flex-col justify-center items-center'>
        <h2 className='text-4xl font-bold text-white mb-4'>Browse our blog collection</h2>
        <Link href={'/blogs'} className='rounded font-semibold text-sm text-blue-600 bg-white py-2 px-6'>
          Explore Blogs
        </Link>
      </div>
    </main>
  );
}
