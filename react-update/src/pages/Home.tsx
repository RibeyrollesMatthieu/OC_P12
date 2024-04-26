import { CreateEmployeeForm } from '@/components/forms/CreateEmployee';
import { Link } from '@nextui-org/react';

export const HomePage = () => {
  return (
    <main className='max-w-96 w-[min(24rem,100%)] mx-auto pb-14'>
      <div className='text-center my-8'>
        <h1 className='text-3xl font-semibold'>HRnet</h1>

        <Link href='/employee-list' className='my-2'>
          View current employees
        </Link>

        <h2 className='text-2xl font-semibold'>Create employee</h2>
      </div>

      <CreateEmployeeForm />
    </main>
  );
};
