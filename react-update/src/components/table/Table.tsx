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
  SortDescriptor,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableProps,
  TableRow,
} from '@nextui-org/react';
import { Key, useCallback, useMemo, useState } from 'react';

interface Props extends TableProps {
  columns: ITableColumns;
  rows: ITableRows;
  searchKeys?: (keyof ITableRow)[];
}

export const Table = ({ columns, rows, searchKeys, ...rest }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<IRowsPerPage>(rowsPerPageOptions[0]);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  type Item = (typeof items)[0];
  const hasSearchFilter = Boolean(searchValue);

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

  const getColumnSortFunction = useCallback(() => {
    if (!sortDescriptor || sortDescriptor.column === undefined) return null;

    const column = columns.find((column) => column.key === sortDescriptor.column);

    if (!column) return null;

    return column.sort;
  }, [columns, sortDescriptor]);

  const filteredItems = useMemo(() => {
    let _filteredItems = [...items];

    /* filters using search query */
    if (hasSearchFilter) {
      _filteredItems = _filteredItems.filter((item) => {
        let found = false;

        searchKeys?.forEach((key) => {
          if ((item[key] as string).toLowerCase().includes(searchValue.toLowerCase())) {
            found = true;
            return;
          }
        });

        return found;
      });
    }

    return _filteredItems;
  }, [items, hasSearchFilter, searchKeys, searchValue]);

  const sortedItems = useMemo(() => {
    if (!sortDescriptor) return filteredItems;

    return [...filteredItems].sort((a, b) => {
      if (sortDescriptor.column === undefined) return 0;

      const first = a[sortDescriptor.column as keyof Item];
      const second = b[sortDescriptor.column as keyof Item];

      const sortFunction = getColumnSortFunction();
      let cmp;

      if (sortFunction) cmp = sortFunction(first, second);
      else cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems, getColumnSortFunction]);

  const onSearchChange = useCallback((value?: string) => {
    if (!value) {
      setSearchValue('');
      return;
    }

    setSearchValue(value);
    setPage(1);
  }, []);

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

        <Search search={searchValue} onSearchChange={onSearchChange} />
      </div>
    );
  }, [onSearchChange, rowsPerPage, searchValue]);

  return (
    <NuiTable
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      topContent={topContent}
      topContentPlacement='outside'
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      {...rest}>
      <TableHeader columns={columns}>
        {(column: ITableColumn) => (
          <TableColumn allowsSorting={column.allowsSorting ?? true} key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={sortedItems} emptyContent='No data available in table'>
        {(item: ITableRow) => (
          <TableRow key={`${item.firstname}-${item.lastname}`}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </NuiTable>
  );
};
