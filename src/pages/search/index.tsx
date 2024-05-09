import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Pagination, Flex, TextInput, rem, Stack } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { TBikeCountGetResponse, TBikeSearchGetResponse } from '@/types/types';
import BikesTable from './components/bikes-table';
import styles from './index.module.css';
import useGetBikes from './hooks/use-get-bikes';
import useGetBikesCount from './hooks/use-get-bikes-count';
import TableLoadingState from './components/loading-state';
import EmptyState from './components/empty-state';

const Search = () => {
    const [bikeSearchData, setBikeSearchData] = React.useState<TBikeSearchGetResponse['bikes']>([]);
    const [bikeCountData, setBikeCountData] = React.useState<Partial<TBikeCountGetResponse>>({});
    const [page, setPage] = React.useState(1);
    const [filterByTitleText, setFilterByTitleText] = React.useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const { searchData, isSearching, isSearchingError, isRefetchingSearch, refetchSearch } =
    useGetBikes(searchParams);
    const { countData, isCounting, isCountingError } = useGetBikesCount();

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

const onFilter = () => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    if (!filterByTitleText) {
        updatedSearchParams.has('query') && updatedSearchParams.delete('query');
        setSearchParams(updatedSearchParams);
        return;
    }
    updatedSearchParams.set('query', filterByTitleText);
    setSearchParams(updatedSearchParams);
};

  const onPageChange = ((pageNum: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('page', pageNum.toString());
    setSearchParams(updatedSearchParams);
    setPage(pageNum);
  });

const getHeaderContent = () => {
    if (isCountingError) {
            return <div>There is an error counting bikes..</div>;
        }

        if (isCounting) {
            return <div>Fetching the count data..</div>;
        }
        return (
            <h3>Total thefts: <strong>{bikeCountData.stolen}</strong></h3>
        );
    };

    const getFiltersContent = () => bikeSearchData.length > 0 ? (
         <Flex>
            <TextInput
              placeholder="search by text.."
              onChange={(event) => onFilterByTitle(event?.currentTarget.value)}
              value={filterByTitleText}
              radius="lg"
          />
            <Button onClick={onFilter} color="dark"><IconFilter style={{ width: rem(14), height: rem(14) }} /></Button>
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
            <Button onClick={handleClickMunichOnly} color="dark">Stolen in Munich</Button>
            <Button onClick={handleClickAll} color="dark">Stolen everywhere</Button>
            </Flex>
            <div className={styles.tableContainer}>
                <BikesTable bikes={bikeSearchData} />
            </div>
            </>
        );
    };

    const getFooterContent = () => (
            <Pagination mt="xl" className={styles.pagination} value={page} onChange={onPageChange} total={10} siblings={2} size="sm" />
          );

        return (
            <Stack align="center" className={styles.container}>
                {getHeaderContent()}
                {getFiltersContent()}
                {getTableContent()}
                {getFooterContent()}
            </Stack>
        );
};

export default Search;
