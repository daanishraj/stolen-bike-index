import { Table, Tooltip } from '@mantine/core';
import { TBike } from '@/types/types';
import styles from './styles.module.css';
import { getDateFromTimestamp } from '@/helpers';

const BikeTable = ({ bikes }: { bikes: TBike[] }) => {
  const handleRowClick = (id: number) => {
    window.open(`/bikes/${id}`, '_blank');
  };

  const rows = bikes.map(
    ({ id, date_stolen, title, description, stolen_location, thumb }: TBike) => (
      <Table.Tr key={id} onClick={() => handleRowClick(id)} className={styles.onHover}>
        <Table.Td>{title}</Table.Td>
        <Table.Td>
          <Tooltip
            className={styles.tooltip}
            label={description}
            offset={{ mainAxis: -50, crossAxis: 50 }}
          >
            <div className={styles.truncate}>{description}</div>
          </Tooltip>
        </Table.Td>
        <Table.Td>{getDateFromTimestamp(date_stolen)}</Table.Td>
        <Table.Td>
          <Tooltip
            className={styles.tooltip}
            label={stolen_location}
            offset={{ mainAxis: -50, crossAxis: 50 }}
            color="gray"
          >
            <div className={styles.truncate}>{stolen_location}</div>
          </Tooltip>
        </Table.Td>
        <Table.Td className={styles.thumbnail}>
          {thumb && <img className={styles.thumbnail} alt="" src={thumb} />}
        </Table.Td>
      </Table.Tr>
    )
  );

  return (
    <Table
      className={styles.table}
      striped
      stripedColor="aliceblue"
      highlightOnHover
      highlightOnHoverColor="azure"
      withTableBorder
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Title</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Date of Theft</Table.Th>
          <Table.Th>Location of Theft</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default BikeTable;
