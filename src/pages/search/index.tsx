import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Pagination, Flex, TextInput, rem } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import axios from 'axios';
import { Bike, BikeCountGetResponse, BikeSearchGetResponse } from '@/types/types';
import BikesTable from '../components/bikes-table';
import styles from './index.module.css';
import useGetBikes from '../hooks/use-get-bikes';
import useGetBikesCount from '../hooks/use-get-bikes-count';

const Search = () => {
    const [isCompleted, setIsCompleted] = React.useState(false);
    const [completeData, setCompleteData] = React.useState<BikeSearchGetResponse['bikes']>([]);
    const [bikeSearchData, setBikeSearchData] = React.useState<BikeSearchGetResponse['bikes']>([]);
    const [bikeCountData, setBikeCountData] = React.useState<Partial<BikeCountGetResponse>>({});
    const [page, setPage] = React.useState(1);
    const [searchText, setSearchText] = React.useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const { searchData, isSearching, isSearchingError, isRefetchingSearch, refetchSearch } =
    useGetBikes(searchParams);
    const { countData, isCounting, isCountingError } = useGetBikesCount();

    React.useEffect(() => {
        //when the component mounts, scrape all the data from the bikeindex api
        const url = 'https://bikeindex.org/api/v3/search';
        const per_page = '100';
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const getDataForPage = async (page: number) : Promise<BikeSearchGetResponse> => {
            const params = {
                page: `${page}`,
                per_page,
            };
            const response = await axios.get(url, { params });
            return response.data;
        };
        const getData = async () => {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < 41; i++) {
                const data = await getDataForPage(i);
                console.log(`page ${i}`);
                setCompleteData(prevData => [...prevData, ...data.bikes]);
                }
        };
        getData();
        console.log('fetched all pages');
        setIsCompleted(true);
    }, []);

    console.log('complete data: ', completeData.length);

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

const onSearchByText = (value: string) => {
    setSearchText(value);
    // if (!value) {
    //     const updatedSearchParams = new URLSearchParams(searchParams);
    //     updatedSearchParams.has('query') && updatedSearchParams.delete('query');
    //     setSearchParams(updatedSearchParams);
    // }
};

const onFilter = () => {
    const filteredData = completeData.filter((bike: Bike) =>
        bike.title?.toLowerCase().includes(searchText.toLowerCase()));
    setCompleteData(filteredData);
    // const updatedSearchParams = new URLSearchParams(searchParams);
    // if (!filterByTitleText) {
    //     updatedSearchParams.has('query') && updatedSearchParams.delete('query');
    //     setSearchParams(updatedSearchParams);
    //     return;
    // }
    // updatedSearchParams.set('query', filterByTitleText);
    // setSearchParams(updatedSearchParams);
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
              onChange={(event) => onSearchByText(event?.currentTarget.value)}
              value={searchText}
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
            {completeData.length === 0 && (<div> there is no data to display</div>)}
                {/* <BikesTable bikes={bikeSearchData} /> */}
                <BikesTable bikes={completeData} />
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
