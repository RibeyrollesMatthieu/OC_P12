import { Table } from '@/components/table/Table';
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
      },
      {
        key: 'department',
        label: 'Department',
      },
      {
        key: 'birthdate',
        label: 'Date of birth',
        render: (date: Birthdate) => <>{formatter.format(date.toDate(getLocalTimeZone()))}</>,
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
        <h1 className='text-3xl font-semibold'>Current employees</h1>
      </div>

      <Table columns={columns} rows={employees} />

      <div className='text-center my-8'>
        <Link href='/' className='my-2'>
          Home
        </Link>
      </div>
    </>
  );
};
