import { Table, Tooltip } from '@mantine/core';
import { Bike } from '@/types/types';
import styles from './styles.module.css';
import { getDateFromTimestamp } from '@/helpers';

const BikeTable = ({ bikes }: { bikes: Bike[] }) => {
    const rows = bikes.map((
      { id, date_stolen, title, description, stolen_location, thumb }: Bike) => (
        <Table.Tr key={id}>
          <Table.Td>{title}</Table.Td>
          <Table.Td>
            <Tooltip label={description} offset={{ mainAxis: -50, crossAxis: 50 }} color="gray">
          <div className={styles.truncate}>
            {description}
          </div>
            </Tooltip>
          </Table.Td>
          <Table.Td>{getDateFromTimestamp(date_stolen)}</Table.Td>
          <Table.Td>
          <Tooltip label={stolen_location} offset={{ mainAxis: -50, crossAxis: 50 }} color="gray">
          <div className={styles.truncate}>
            {stolen_location}
          </div>
          </Tooltip>
          </Table.Td>
          <Table.Td>{stolen_location}</Table.Td>
          <Table.Td>{thumb && <img className={styles.thumbnail} alt="" src={thumb} />}</Table.Td>

        </Table.Tr>
      ));

      return (
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Date of Theft</Table.Th>
              <Table.Th>Date of Case Reported</Table.Th>
              <Table.Th>Location of Theft</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      );
};

export default BikeTable;
