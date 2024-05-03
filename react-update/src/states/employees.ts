import { Employee, Employees } from '@/types/employee';
import { create } from 'zustand';

interface EmployeesState {
  employees: Employees;
  add: (employee: Employee) => void;
}

export const useEmployeesStore = create<EmployeesState>()((set) => ({
  employees: [],
  add: (employee) => set((state) => ({ employees: [...state.employees, employee] })),
}));
