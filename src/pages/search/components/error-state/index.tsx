import { Button, Image, Title } from '@mantine/core';
import errorStateImage from '../../../../images/error-state-image.jpg';
import styles from './styles.module.css';

type TProps = {
  message: string | undefined;
  refetch: () => void;
};

const ErrorState = ({ message, refetch }: TProps) => (
  <>
    <Image src={errorStateImage} alt="no data" className={styles.image} />
    <Title order={3}> Oops! There seems to be an error :(</Title>
    <Title className={styles.errorMessage} order={5} textWrap="wrap">
      {' '}
      {message}
    </Title>
    <Button radius="lg" color="steelblue" onClick={refetch}>
      Try again
    </Button>
  </>
);

export default ErrorState;
