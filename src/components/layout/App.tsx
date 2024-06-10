import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <main className='max-w-5xl w-full mx-auto pb-14'>
      <Outlet />
    </main>
  );
};
