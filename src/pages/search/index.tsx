import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Pagination } from '@mantine/core';
import { BikeCountGetResponse, BikeSearchGetResponse } from '@/types/types';
import BikesTable from '../components/bikes-table';
import styles from './index.module.css';
import useGetBikes from '../hooks/use-get-bikes';
import useGetBikesCount from '../hooks/use-get-bikes-count';

const Search = () => {
    const [bikeSearchData, setBikeSearchData] = React.useState<BikeSearchGetResponse['bikes']>([]);
    const [bikeCountData, setBikeCountData] = React.useState<Partial<BikeCountGetResponse>>({});
    const [page, setPage] = React.useState(1);
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

React.useEffect(() => {
    refetchSearch();
  }, [searchParams]);

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
                {getSearchContent()}
                {getFooterContent()}
            </div>
        );
};

export default Search;
