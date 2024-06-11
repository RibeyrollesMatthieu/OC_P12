import { employeeRoutes } from '@/router/employee';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { RootLayout } = await import('@/components/layout/Root');
      return { Component: RootLayout };
    },
    children: [
      {
        path: '/',
        lazy: async () => {
          const { HomePage } = await import('@/pages/Home');
          return { Component: HomePage };
        },
      },
      employeeRoutes,
      {
        path: '*',
        lazy: async () => {
          const { NotFoundPage } = await import('@/pages/NotFound');
          return { Component: NotFoundPage };
        },
      },
    ],
  },
]);
