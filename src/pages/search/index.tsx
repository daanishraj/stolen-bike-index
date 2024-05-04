import React from 'react';
import { BikeCountGetResponse, BikeSearchGetResponse } from '@/types/types';
import BikesTable from '../components/bikes-table';
import styles from './index.module.css';
import useGetBikes from '../hooks/use-get-bikes';
import useGetBikesCount from '../hooks/use-get-bikes-count';

const Search = () => {
    const [bikeSearchData, setBikeSearchData] = React.useState<BikeSearchGetResponse['bikes']>([]);
    const [stolenCount, setStolenCount] = React.useState<BikeCountGetResponse['stolen']>(0);
    const { searchData, isSearching, isSearchingError } = useGetBikes();
    const { countData, isCounting, isCountingError } = useGetBikesCount();

React.useEffect(() => {
    if (searchData) {
        setBikeSearchData(searchData.bikes);
    }
}, [searchData]);

React.useEffect(() => {
    if (countData) {
        setStolenCount(countData.stolen);
    }
}, [countData]);

console.log({ stolenCount });

    const getHeaderContent = () => {
        if (isCountingError) {
            return <div>There is an error counting bikes..</div>;
        }

        if (isCounting) {
            return <div>Fetching the count data..</div>;
        }
        return (
            <h3>Total thefts: <strong>{stolenCount}</strong></h3>
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
