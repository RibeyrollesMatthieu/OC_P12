import { Input } from '@nextui-org/react';

interface Props {
  onSearchChange: (a: string) => void;
  onClear: () => void;
  search?: string;
}

export const Search = ({ onSearchChange, onClear, search }: Props) => {
  return (
    <Input
      className='max-w-64 w-full'
      type='search'
      label='Search:'
      onValueChange={onSearchChange}
      value={search}
      isClearable
      onClear={onClear}
      labelPlacement='outside-left'></Input>
  );
};
