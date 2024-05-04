import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import BikeService from '@/services/bikes';
import { BikeSearchGetResponse, QueryKeys } from '@/types/types';

const useGetBikes = () => {
    const { data, isLoading, isError, error } = useQuery<BikeSearchGetResponse, AxiosError>({
      queryKey: [QueryKeys.Bikes],
      queryFn: BikeService.getBikes,
    });

    return {
        searchData: data,
        isSearching: isLoading,
        isSearchingError: isError,
        searchError: error };
        };

  export default useGetBikes;
