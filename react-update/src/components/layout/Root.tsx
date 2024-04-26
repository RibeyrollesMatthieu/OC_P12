import { NextUIProvider } from '@nextui-org/react';
import { Outlet, useNavigate } from 'react-router-dom';

export const RootLayout = () => {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <div className='flex h-screen flex-col'>
        <Outlet />
      </div>
    </NextUIProvider>
  );
};
