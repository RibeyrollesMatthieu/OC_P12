import { Input } from '@nextui-org/react';

interface Props {
  onSearchChange: (a: string) => void;
  search?: string;
}

export const Search = ({ onSearchChange, search }: Props) => {
  return (
    <Input
      className='max-w-64 w-full'
      type='search'
      label='Search:'
      onValueChange={onSearchChange}
      value={search}
      labelPlacement='outside-left'></Input>
  );
};
