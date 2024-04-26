export const employeeRoutes = {
  children: [
    {
      path: '/employee-list',
      lazy: async () => {
        const { EmployeeList } = await import('@/pages/EmployeeList');
        return { Component: EmployeeList };
      },
    },
  ],
};
