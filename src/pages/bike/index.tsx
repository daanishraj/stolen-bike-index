import { useParams } from 'react-router-dom';
import { Group, Badge, Image, Text, Flex, Title, Stack, Card } from '@mantine/core';
import React from 'react';
import classnames from 'classnames';
import useGetBikeDetails from './hooks/use-get-bike-details';
import styles from './index.module.css';
import { TBikeDetails } from '@/types/types';
import { getDateFromTimestamp } from '@/helpers';
import bikeImage from '../../images/bike-image.jpg';
import { MISSING_DETAILS } from '@/constants';

const BikeDetails = () => {
  const { id } = useParams();
  if (!id) {
    return <div>There is an error - no id was provided</div>;
  }

  const [bikeData, setBikeData] = React.useState<TBikeDetails | null>(null);

  const { data, isLoading, isError, error } = useGetBikeDetails(Number(id));

  React.useEffect(() => {
    if (data) {
      setBikeData(data.bike);
    }
  }, [data]);

  const getContent = () => {
    if (isError) {
      return <div>There is an error {error?.message}</div>;
    }

    if (!bikeData || isLoading) {
      return <div>Loading...</div>;
    }

    const {
      title,
      serial,
      manufacturer,
      description,
      frame_model,
      frame_colors,
      registration_created_at,
      stolen_record,
    } = bikeData;

    return (
      <div className={styles.container}>
        <Flex justify="space-evenly" columnGap="md" mt="lg">
          <Stack className={styles.stack} gap="xl">
            <Card
              className={classnames(styles.identifiers, styles.card)}
              shadow="lg"
              radius="md"
              padding="lg"
            >
              <Group>
                <Title order={2} size="h2">
                  {title}
                </Title>
                <Badge color="red">Stolen</Badge>
              </Group>
              <div>
                <Text>serial: </Text>
                <Text fw={600}>{serial || MISSING_DETAILS}</Text>
              </div>
              <div>
                <Text>police department: </Text>
                <Text>{stolen_record?.police_report_department || MISSING_DETAILS}</Text>
              </div>
              <div>
                <Text>manufacturer: </Text>
                <Text> {manufacturer || MISSING_DETAILS}</Text>
              </div>
              <div>
                <Text>frame_model:</Text>
                <Text>{frame_model || MISSING_DETAILS}</Text>
              </div>
              <div>
                <Text>frame_colors:</Text>
                <Text>{frame_colors || MISSING_DETAILS}</Text>
              </div>
              <div>
                <Text>regsistered at: </Text>
                <Text>
                  {' '}
                  {registration_created_at
                    ? getDateFromTimestamp(registration_created_at)
                    : 'missing'}
                </Text>
              </div>
              <div>
                <Text>date of theft: </Text>
                <Text>
                  {' '}
                  {stolen_record?.date_stolen
                    ? getDateFromTimestamp(stolen_record?.date_stolen)
                    : 'missing'}
                </Text>
              </div>
              <div>
                <Text>location of theft: </Text>
                <Text>{stolen_record?.location || MISSING_DETAILS}</Text>
              </div>
            </Card>

            <Card
              className={classnames(styles.card, styles.details)}
              shadow="lg"
              radius="md"
              padding="lg"
            >
              <div>
                <Text>description: </Text>
                <Text>{description || MISSING_DETAILS}</Text>
              </div>
              <div>
                <Text>details of lock:</Text>
                <Text>{stolen_record?.locking_description || MISSING_DETAILS}</Text>
              </div>
              <div>
                <Text>details of theft: </Text>
                <Text>{stolen_record?.theft_description || MISSING_DETAILS}</Text>
              </div>
            </Card>
          </Stack>
          <Image
            fallbackSrc={bikeImage}
            {...(bikeData.large_img ? { src: bikeData.large_img } : {})}
            alt="Norway"
            className={styles.image}
          />
        </Flex>
      </div>
    );
  };

  return <div>{getContent()}</div>;
};

export default BikeDetails;
