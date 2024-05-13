import { Skeleton } from '@mantine/core';

const TableLoadingState = () => {
  const rows = Array(10).fill(0);

  return (
    <>
      {rows.map((_, index) => (
        <Skeleton key={index} height={20} mt={6} width="70%" radius="md" />
      ))}
    </>
  );
};
export default TableLoadingState;
