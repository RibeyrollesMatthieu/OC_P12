export const employeeRoutes = {
  children: [
    {
      path: '/',
      lazy: async () => {
        const { AppLayout } = await import('@/components/layout/App');
        return { Component: AppLayout };
      },
      children: [
        {
          path: 'employee-list',
          lazy: async () => {
            const { EmployeeList } = await import('@/pages/EmployeeList');
            return { Component: EmployeeList };
          },
        },
      ],
    },
  ],
};
