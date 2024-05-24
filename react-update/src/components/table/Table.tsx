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

  // render a cell with custom styling
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

  const getColumnSortFunction = useCallback(() => {
    if (!sortDescriptor || sortDescriptor.column === undefined) return null;

    const column = columns.find((column) => column.key === sortDescriptor.column);

    if (!column) return null;

    return column.sort;
  }, [columns, sortDescriptor]);

  // returns items matching search input
  const filteredItems = useMemo(() => {
    let _filteredItems = [...rows];

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
  }, [rows, hasSearchFilter, searchKeys, searchValue]);

  const pages = useMemo(() => {
    return Math.ceil(filteredItems.length / rowsPerPage);
  }, [filteredItems.length, rowsPerPage]);

  // gets items for current page
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, rowsPerPage, filteredItems]);

  const sortedItems = useMemo(() => {
    if (!sortDescriptor) return items;

    return [...items].sort((a, b) => {
      if (sortDescriptor.column === undefined) return 0;

      const first = a[sortDescriptor.column as keyof Item];
      const second = b[sortDescriptor.column as keyof Item];

      const sortFunction = getColumnSortFunction();
      let cmp;

      if (sortFunction) cmp = sortFunction(first, second);
      else cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items, getColumnSortFunction]);

  const onSearchChange = useCallback((value?: string) => {
    if (!value) {
      setSearchValue('');
      return;
    }

    setSearchValue(value);
    setPage(1);
  }, []);

  const onClear = useCallback(() => {
    setSearchValue('');
    setPage(1);
  }, []);

  const bottomContent = useMemo(() => {
    return (
      <div className='flex'>
        {filteredItems.length > 0 && (
          <p>
            Showing {(page - 1) * rowsPerPage + 1} to{' '}
            {Math.min(page * rowsPerPage, filteredItems.length)} of {filteredItems.length} entries
          </p>
        )}
        {filteredItems.length > rowsPerPage && (
          <div className='flex justify-center ml-auto'>
            <Pagination
              isCompact
              showControls
              showShadow
              color='primary'
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        )}
      </div>
    );
  }, [filteredItems.length, page, pages, rowsPerPage]);

  const topContent = useMemo(() => {
    return (
      <div className='flex justify-between'>
        <div className='flex gap-1 items-center'>
          Show
          <RowsPerPageSelect selection={rowsPerPage} onSelectionChange={setRowsPerPage} />
          entries
        </div>

        <Search search={searchValue} onSearchChange={onSearchChange} onClear={onClear} />
      </div>
    );
  }, [onClear, onSearchChange, rowsPerPage, searchValue]);

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
