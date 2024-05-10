import { Image, Title } from '@mantine/core';
import emptyStateImage from '../../../../images/empty-state-image.jpg';
import styles from './styles.module.css';

const EmptyState = () => (
    <>
    <Image
      src={emptyStateImage}
      alt="empty"
      className={styles.image} />
      <Title order={3}> Oops! No bikes to be found.</Title>
    </>
  );

  export default EmptyState;
