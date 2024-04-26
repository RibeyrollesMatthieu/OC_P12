import { Input, DatePicker, Select, SelectItem, Button } from '@nextui-org/react';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import {
  isState,
  isDepartment,
  states,
  departments,
  Birthdate,
  Startdate,
  Firstname,
  Lastname,
  Street,
  City,
  Zipcode,
  Department,
} from '@/types/employee';

export const CreateEmployeeForm = () => {
  const [firstname, setFirstname] = useState<Firstname>('');
  const [lastname, setLastname] = useState<Lastname>('');
  const [birthdate, setBirthdate] = useState<Birthdate>();
  const [startdate, setStartdate] = useState<Startdate>();
  const [street, setStreet] = useState<Street>();
  const [city, setCity] = useState<City>();
  const [state, setState] = useState<string>('');
  const [zipcode, setZipcode] = useState<Zipcode>();
  const [department, setDepartment] = useState<Department>();

  const isSubmittable = useMemo(() => {
    if (
      !firstname?.length ||
      !lastname?.length ||
      !birthdate ||
      !startdate ||
      !street?.length ||
      !city?.length ||
      !isState(state) ||
      !zipcode ||
      !isDepartment(department)
    ) {
      return false;
    }

    return true;
  }, [
    birthdate,
    city?.length,
    department,
    firstname?.length,
    lastname?.length,
    startdate,
    state,
    street?.length,
    zipcode,
  ]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!isSubmittable) return;
    },
    [isSubmittable]
  );

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <Input
        type='text'
        label='First name'
        labelPlacement='outside'
        placeholder=' '
        isRequired
        value={firstname}
        onValueChange={setFirstname}
      />
      <Input
        type='text'
        label='Last name'
        labelPlacement='outside'
        placeholder=' '
        isRequired
        value={lastname}
        onValueChange={setLastname}
      />
      <DatePicker
        label='Date of birth'
        labelPlacement='outside'
        showMonthAndYearPickers
        isRequired
        value={birthdate}
        onChange={setBirthdate}
      />
      <DatePicker
        label='Start date'
        labelPlacement='outside'
        showMonthAndYearPickers
        isRequired
        value={startdate}
        onChange={setStartdate}
      />

      <fieldset className='p-4 border flex flex-col gap-4 rounded-small'>
        <legend className='px-2'>Address</legend>

        <Input
          type='text'
          label='Street'
          labelPlacement='outside'
          placeholder=' '
          isRequired
          value={street}
          onValueChange={setStreet}
        />
        <Input
          type='text'
          label='City'
          labelPlacement='outside'
          placeholder=' '
          isRequired
          value={city}
          onValueChange={setCity}
        />
        <Select
          label='State'
          labelPlacement='outside'
          placeholder=' '
          isRequired
          selectedKeys={[state]}
          onChange={({ target: { value } }) => setState(value)}>
          {states.map(({ name }) => (
            <SelectItem key={name}>{name}</SelectItem>
          ))}
        </Select>
        <Input
          type='number'
          min={0}
          label='Zip code'
          labelPlacement='outside'
          placeholder=' '
          onValueChange={(e) => setZipcode(+e)}
          isRequired
        />
      </fieldset>

      <Select
        label='Department'
        labelPlacement='outside'
        isRequired
        selectedKeys={[department as string]}
        onChange={({ target: { value } }) => setDepartment(value as Department)}>
        {departments.map((department) => (
          <SelectItem key={department}>{department}</SelectItem>
        ))}
      </Select>

      <Button type='submit' isDisabled={!isSubmittable}>
        Save
      </Button>
    </form>
  );
};
