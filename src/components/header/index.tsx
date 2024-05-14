import { Flex, Title, Image } from '@mantine/core';
import styles from './styles.module.css';
import bikeHeaderImage from '../../images/bike-header-image.jpg';

const Header = () => (
  <Flex className={styles.container} mb="-xl" align="center" justify="center">
    <Title fz="3rem" c="steelblue" className={styles.title} order={1}>
      Find Your
    </Title>
    <Image className={styles.image} alt="bike header" src={bikeHeaderImage} />
    <Title fz="4rem" c="steelblue">
      !
    </Title>
  </Flex>
);

export default Header;
