import { Title } from '@/components/title';
import { Link } from '@nextui-org/react';

export const NotFoundPage = () => {
  return (
    <main className='max-w-96 w-[min(24rem,100%)] mx-auto pb-14 flex flex-col items-center h-screen'>
      <div className='text-center my-auto'>
        <Title label='404 not found' />

        <Link href='/' className='my-2'>
          Back to homepage
        </Link>
      </div>
    </main>
  );
};
