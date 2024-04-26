import { Input } from '@nextui-org/react';

export const Search = () => {
  return (
    <Input
      className='max-w-64 w-full'
      type='search'
      label='Search:'
      labelPlacement='outside-left'></Input>
  );
};
