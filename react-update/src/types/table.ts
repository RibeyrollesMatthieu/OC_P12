import {
  Firstname,
  Lastname,
  Startdate,
  Department,
  Birthdate,
  Street,
  City,
  State,
  Zipcode,
} from '@/types/employee';
import { ReactNode } from 'react';

export interface ITableRow {
  key: string;
  firstname: Firstname;
  lastname: Lastname;
  startdate: Startdate;
  department: Department;
  birthdate: Birthdate;
  street: Street;
  city: City;
  state: State;
  zipcode: Zipcode;
}

export type ITableRows = ITableRow[];

export interface ITableColumn {
  key: string;
  label: string;
  render?: (cellValue: unknown, item: ITableRow) => ReactNode;
}

export type ITableColumns = ITableColumn[];

export const rowsPerPage = [10, 25, 50, 100] as const;
export type IRowsPerPage = (typeof rowsPerPage)[number];