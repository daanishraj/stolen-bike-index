import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Pagination, Flex, TextInput, rem, Stack, Pill } from '@mantine/core';
import { IconCalendar, IconFilter } from '@tabler/icons-react';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import { TBikeCountGetResponse, TBikeSearchGetResponse } from '@/types/types';
import BikesTable from './components/bikes-table';
import styles from './index.module.css';
import useGetBikes from './hooks/use-get-bikes';
import useGetBikesCount from './hooks/use-get-bikes-count';
import TableLoadingState from './components/loading-state';
import EmptyState from './components/empty-state';
import { getDateToday, getStringFromDate } from '@/helpers';
import BikeService from '@/services/bikes';

const Search = () => {
    const [bikeSearchData, setBikeSearchData] = React.useState<TBikeSearchGetResponse['bikes']>([]);
    const [bikeCountData, setBikeCountData] = React.useState<Partial<TBikeCountGetResponse>>({});
    const [munichBikeCountData, setMunichBikeCountData] = React.useState<number | null>(null);
    const [page, setPage] = React.useState(1);
    const [filterByTitleText, setFilterByTitleText] = React.useState('');
    const [filterByDateRange, setFilterByDateRange] =
    React.useState<[Date | null, Date | null]>([null, null]);
    const dateFilterIcon =
    <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

    const [searchParams, setSearchParams] = useSearchParams();
    const { searchData, isSearching, isSearchingError, isRefetchingSearch, refetchSearch } =
    useGetBikes(searchParams);
    const { countData } = useGetBikesCount();

React.useEffect(() => {
    if (searchData) {
        setBikeSearchData(searchData.bikes);
    }
}, [searchData]);

React.useEffect(() => {
    if (countData) {
        setBikeCountData({ ...bikeCountData, stolen: countData?.stolen });
    }
}, [countData]);

React.useEffect(() => {
    const getStoleCountForMunich = async () => {
        try {
            const response = await BikeService.getMunichBikeCount();
            setMunichBikeCountData(response.proximity);
        } catch (error) {
            console.log({ error });
        }
    };

    getStoleCountForMunich();
}, []);

React.useEffect(() => {
    refetchSearch();
  }, [searchParams]);

  const handleClickMunichOnly = () => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('location', 'munich');
    updatedSearchParams.set('stolenness', 'proximity');
    setSearchParams(updatedSearchParams);
};

const handleClickAll = () => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.delete('location');
    updatedSearchParams.delete('stolenness');
    setSearchParams(updatedSearchParams);
};

const onFilterByTitle = (value: string) => {
    setFilterByTitleText(value);
    if (!value) {
        const updatedSearchParams = new URLSearchParams(searchParams);
        updatedSearchParams.has('query') && updatedSearchParams.delete('query');
        setSearchParams(updatedSearchParams);
    }
};

const onFilterByDateRange = (value: DatesRangeValue) => {
    setFilterByDateRange(value);
    if (!value[0] || ![value[1]]) {
        const updatedSearchParams = new URLSearchParams(searchParams);
        updatedSearchParams.has('from') && updatedSearchParams.delete('from');
        updatedSearchParams.has('to') && updatedSearchParams.delete('to');
        setSearchParams(updatedSearchParams);
    }
};

const onFilter = () => {
    const updatedSearchParams = new URLSearchParams(searchParams);

    //handle search text
    if (!filterByTitleText) {
        updatedSearchParams.has('query') && updatedSearchParams.delete('query');
    } else {
        updatedSearchParams.set('query', filterByTitleText);
    }

    //handle dates
    if (!filterByDateRange[0] && !filterByDateRange[1]) {
        updatedSearchParams.has('from') && updatedSearchParams.delete('from');
        updatedSearchParams.has('to') && updatedSearchParams.delete('to');
    } else {
        const fromDate = getStringFromDate(filterByDateRange[0]);
        const toDate = getStringFromDate(filterByDateRange[1]);
        updatedSearchParams.set('from', fromDate);
        updatedSearchParams.set('to', toDate);
    }

    setSearchParams(updatedSearchParams);
};

  const onPageChange = ((pageNum: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('page', pageNum.toString());
    setSearchParams(updatedSearchParams);
    setPage(pageNum);
  });

    const getFiltersContent = () => bikeSearchData.length > 0 ? (
         <Flex className={styles.filters} justify="center" columnGap="xl">
            <Button onClick={handleClickMunichOnly} radius="lg">Stolen in Munich
            <Pill className={styles.pill} ml="md" color="dark" size="xs">{munichBikeCountData}</Pill>
            </Button>
            <Button onClick={handleClickAll} radius="lg">
                Stolen everywhere
                <Pill className={styles.pill} ml="md" size="xs">{bikeCountData.stolen}</Pill>
            </Button>

            <TextInput
              placeholder="search by text.."
              onChange={(event) => onFilterByTitle(event?.currentTarget.value)}
              value={filterByTitleText}
              radius="lg"
              className={styles.searchFilter}
          />
            <DatePickerInput
              leftSection={dateFilterIcon}
              leftSectionPointerEvents="none"
              type="range"
              radius="lg"
              aria-label="Pick dates range"
              placeholder="Pick dates range"
              value={filterByDateRange}
              onChange={onFilterByDateRange}
              clearable
              maxDate={getDateToday()}
              className={styles.datePicker}
            />
            <Button onClick={onFilter}>
                <IconFilter style={{ width: rem(14), height: rem(14) }} />
            </Button>
         </Flex>
        ) : null;

    const getTableContent = () => {
        if (isSearchingError) {
            return <div>There is an error..</div>;
        }

        if (isSearching || isRefetchingSearch) {
            return (<TableLoadingState />);
        }

        if (bikeSearchData.length === 0) {
            return (<EmptyState />);
        }

        return (
            <>
            <Flex>

            </Flex>
            <div className={styles.tableContainer}>
                <BikesTable bikes={bikeSearchData} />
            </div>
            </>
        );
    };

    const getFooterContent = () => (
            <Pagination mt="xl" color="steelblue" value={page} onChange={onPageChange} total={10} siblings={2} size="sm" />
          );

        return (
            <Stack align="center" justify="center" className={styles.container}>
                {getFiltersContent()}
                {getTableContent()}
                {getFooterContent()}
            </Stack>
        );
};

export default Search;
