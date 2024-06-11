interface Props {
  label: string;
}

export const Title = ({ label }: Props) => {
  return <h1 className='text-3xl font-semibold'>{label}</h1>;
};
