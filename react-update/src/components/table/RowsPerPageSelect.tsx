import { IRowsPerPage, rowsPerPage } from '@/types/table';
import { Select, SelectItem } from '@nextui-org/react';

const items = rowsPerPage.map((row) => {
  return {
    label: row,
    value: row,
  };
});

interface Props {
  selection: IRowsPerPage;
  onSelectionChange: (value: IRowsPerPage) => void;
}

export const RowsPerPageSelect = ({ selection, onSelectionChange }: Props) => {
  return (
    <Select
      size='sm'
      className='w-20'
      items={items}
      disallowEmptySelection
      selectedKeys={[selection.toString()]}
      onChange={({ target: { value } }) => onSelectionChange(+value as IRowsPerPage)}>
      {({ value, label }) => <SelectItem key={value}>{label.toString()}</SelectItem>}
    </Select>
  );
};
