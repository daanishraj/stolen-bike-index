import React from 'react';
import { BikeResponseGetData } from '@/types/types';
import BikesTable from '../components/bikes-table';
import styles from './index.module.css';
import useGetBikes from '../hooks/use-get-bikes';

const Search = () => {
    const [bikeData, setBikeData] = React.useState<BikeResponseGetData['bikes']>([]);
    const { data, isLoading, isError } = useGetBikes();

React.useEffect(() => {
    if (data) {
        setBikeData(data.bikes);
    }
}, [data]);

    const getContent = () => {
        if (isError) {
            return <div>There is an error..</div>;
        }

        if (isLoading) {
            return <div>Fetching the data..</div>;
        }

        return (
            <>
            <h3>Total thefts: <strong>1952</strong></h3>
            <div className={styles.tableContainer}>
                <BikesTable bikes={bikeData} />
            </div>
            </>
        );
    };

        return (
            <div className={styles.container}>
                {getContent()}
            </div>
        );
};

export default Search;
