import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@mantine/core';
import { BikeCountGetResponse, BikeSearchGetResponse } from '@/types/types';
import BikesTable from '../components/bikes-table';
import styles from './index.module.css';
import useGetBikes from '../hooks/use-get-bikes';
import useGetBikesCount from '../hooks/use-get-bikes-count';

const Search = () => {
    const [bikeSearchData, setBikeSearchData] = React.useState<BikeSearchGetResponse['bikes']>([]);
    const [bikeCountData, setBikeCountData] = React.useState<Partial<BikeCountGetResponse>>({});
    const [searchParams, setSearchParams] = useSearchParams();
    const { searchData, isSearching, isSearchingError, refetchSearch } =
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

const handleClickMunichOnly = () => {
    setSearchParams({ ...searchParams, stolenness: 'proximity', location: 'munich' });
};

const handleClickAll = () => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.delete('location');
    updatedSearchParams.delete('stolenness');
    setSearchParams(updatedSearchParams);
};

React.useEffect(() => {
    refetchSearch();
  }, [searchParams]);

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

    const getSearchContent = () => {
        if (isSearchingError) {
            return <div>There is an error..</div>;
        }

        if (isSearching) {
            return <div>Fetching the data..</div>;
        }

        return (
            <>
            <div className={styles.tableContainer}>
            <Button onClick={handleClickMunichOnly} color="dark">Stolen in Munich</Button>
            <Button onClick={handleClickAll} color="dark">Stolen everywhere</Button>
                <BikesTable bikes={bikeSearchData} />
            </div>
            </>
        );
    };

        return (
            <div className={styles.container}>
                {getHeaderContent()}
                {getSearchContent()}
            </div>
        );
};

export default Search;
