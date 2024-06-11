import { Table } from '@/components/table/Table';
import { Title } from '@/components/title';
import { useEmployeesStore } from '@/states/employees';
import { Birthdate, Startdate, State } from '@/types/employee';
import { ITableColumns } from '@/types/table';
import { getLocalTimeZone } from '@internationalized/date';
import { Link } from '@nextui-org/react';
import { useDateFormatter } from '@react-aria/i18n';
import { useMemo } from 'react';

export const EmployeeList = () => {
  const formatter = useDateFormatter({ dateStyle: 'full' });
  const employees = useEmployeesStore((state) => state.employees);

  const columns = useMemo(() => {
    return [
      {
        key: 'firstname',
        label: 'First Name',
      },
      {
        key: 'lastname',
        label: 'Last Name',
      },
      {
        key: 'startdate',
        label: 'Start Date',
        render: (date: Startdate) => <>{formatter.format(date.toDate(getLocalTimeZone()))}</>,
        sort: (a: Startdate, b: Startdate) => {
          const dateA = formatter.format(a.toDate(getLocalTimeZone()));
          const dateB = formatter.format(b.toDate(getLocalTimeZone()));

          return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
        },
      },
      {
        key: 'department',
        label: 'Department',
      },
      {
        key: 'birthdate',
        label: 'Date of birth',
        render: (date: Birthdate) => <>{formatter.format(date.toDate(getLocalTimeZone()))}</>,
        sort: (a: Birthdate, b: Birthdate) => {
          const dateA = formatter.format(a.toDate(getLocalTimeZone()));
          const dateB = formatter.format(b.toDate(getLocalTimeZone()));

          return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
        },
      },
      {
        key: 'street',
        label: 'Street',
      },
      {
        key: 'city',
        label: 'City',
      },
      {
        key: 'state',
        label: 'State',
        render: (state: State) => <>{state.abbreviation}</>,
        sort: (a: State, b: State) =>
          a.abbreviation < b.abbreviation ? -1 : a.abbreviation > b.abbreviation ? 1 : 0,
      },
      {
        key: 'zipcode',
        label: 'Zipcode',
      },
    ];
  }, [formatter]) as ITableColumns;

  return (
    <>
      <div className='text-center my-8'>
        <Title label='Current employees' />
      </div>

      <Table columns={columns} rows={employees} isStriped searchKeys={['firstname', 'lastname']} />

      <div className='text-center my-8'>
        <Link href='/' className='my-2'>
          Home
        </Link>
      </div>
    </>
  );
};
