import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Pagination, Flex, TextInput, rem } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { BikeCountGetResponse, BikeSearchGetResponse } from '@/types/types';
import BikesTable from './components/bikes-table';
import styles from './index.module.css';
import useGetBikes from './hooks/use-get-bikes';
import useGetBikesCount from './hooks/use-get-bikes-count';

const Search = () => {
    const [bikeSearchData, setBikeSearchData] = React.useState<BikeSearchGetResponse['bikes']>([]);
    const [bikeCountData, setBikeCountData] = React.useState<Partial<BikeCountGetResponse>>({});
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

    const getFiltersContent = () => (
        <Flex>
            <TextInput
              placeholder="search by text.."
              onChange={(event) => onFilterByTitle(event?.currentTarget.value)}
              value={filterByTitleText}
              radius="lg"
          />
            <Button onClick={onFilter} color="dark"><IconFilter style={{ width: rem(14), height: rem(14) }} /></Button>
        </Flex>
        );

    const getTableContent = () => {
        if (isSearchingError) {
            return <div>There is an error..</div>;
        }

        if (isSearching || isRefetchingSearch) {
            return <div>Fetching the data..</div>;
        }

        return (
            <>
            <Flex>
            <Button onClick={handleClickMunichOnly} color="dark">Stolen in Munich</Button>
            <Button onClick={handleClickAll} color="dark">Stolen everywhere</Button>
            </Flex>
            <div className={styles.tableContainer}>
            {bikeSearchData.length === 0 && (<div> there is no data to display</div>)}
                <BikesTable bikes={bikeSearchData} />
            </div>
            </>
        );
    };

    const getFooterContent = () => (
            <Pagination value={page} onChange={onPageChange} total={10} siblings={2} size="sm" />
          );

        return (
            <div className={styles.container}>
                {getHeaderContent()}
                {getFiltersContent()}
                {getTableContent()}
                {getFooterContent()}
            </div>
        );
};

export default Search;
