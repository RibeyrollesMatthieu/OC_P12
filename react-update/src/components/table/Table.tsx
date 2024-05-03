import { RowsPerPageSelect } from '@/components/table/RowsPerPageSelect';
import { Search } from '@/components/table/Search';
import {
  IRowsPerPage,
  ITableColumn,
  ITableColumns,
  ITableRow,
  ITableRows,
  rowsPerPage as rowsPerPageOptions,
} from '@/types/table';
import {
  Table as NuiTable,
  Pagination,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { Key, useCallback, useMemo, useState } from 'react';

interface Props {
  columns: ITableColumns;
  rows: ITableRows;
}

export const Table = ({ columns, rows }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<IRowsPerPage>(rowsPerPageOptions[0]);

  const renderCell = useCallback(
    (item: ITableRow, columnKey: Key) => {
      const cellValue = item[columnKey as keyof ITableRow];

      const column = columns.find((column) => column.key === columnKey);

      if (column?.render) {
        return column.render(cellValue, item);
      }

      return <>{cellValue}</>;
    },
    [columns]
  );

  const pages = useMemo(() => {
    return Math.ceil(rows.length / rowsPerPage);
  }, [rows.length, rowsPerPage]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rowsPerPage, rows]);

  const bottomContent = useMemo(() => {
    return (
      <div className='flex'>
        <p>
          Showing {(page - 1) * rowsPerPage} to {(page - 1) * rowsPerPage + items.length} out of{' '}
          {rows.length} entries
        </p>
        {rows.length > rowsPerPage && (
          <div className='flex justify-center ml-auto'>
            <Pagination
              isCompact
              showControls
              showShadow
              color='secondary'
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        )}
      </div>
    );
  }, [items.length, page, pages, rows.length, rowsPerPage]);

  const topContent = useMemo(() => {
    return (
      <div className='flex justify-between'>
        <div className='flex gap-1 items-center'>
          Show
          <RowsPerPageSelect selection={rowsPerPage} onSelectionChange={setRowsPerPage} />
          entries
        </div>

        <Search />
      </div>
    );
  }, [rowsPerPage]);

  return (
    <NuiTable
      bottomContentPlacement='outside'
      bottomContent={bottomContent}
      topContentPlacement='outside'
      topContent={topContent}
      isStriped>
      <TableHeader columns={columns}>
        {(column: ITableColumn) => (
          <TableColumn allowsSorting key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={items} emptyContent='No data available in table'>
        {(item: ITableRow) => (
          <TableRow key={`${item.firstname}-${item.lastname}`}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </NuiTable>
  );
};
