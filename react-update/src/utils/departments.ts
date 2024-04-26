export const departments = [
  'Sales',
  'Marketing',
  'Engineering',
  'Human Resources',
  'Legal',
] as const;

export type Department = (typeof departments)[number];
export type Departments = Department[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDepartment = (department: any): department is Department => {
  return departments.includes(department);
};
