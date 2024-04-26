import { Table, TableColumns, TableRows } from '@/components/table/Table';
import { Birthdate, Startdate, State } from '@/types/employee';
import { getLocalTimeZone } from '@internationalized/date';
import { Link } from '@nextui-org/react';
import { useDateFormatter } from '@react-aria/i18n';
import { useMemo } from 'react';

// MOCKED DATA
const rows: TableRows = [];

export const EmployeeList = () => {
  const formatter = useDateFormatter({ dateStyle: 'full' });

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
  }, [formatter]) as TableColumns;

  return (
    <>
      <div className='text-center my-8'>
        <h1 className='text-3xl font-semibold'>Current employees</h1>
      </div>

      <Table columns={columns} rows={rows} />

      <div className='text-center my-8'>
        <Link href='/' className='my-2'>
          Home
        </Link>
      </div>
    </>
  );
};
