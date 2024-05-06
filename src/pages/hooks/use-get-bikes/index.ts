import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import BikeService from '@/services/bikes';
import { BikeSearchGetResponse, QueryKeys } from '@/types/types';

const useGetBikes = (searchParams: URLSearchParams) => {
    const { data, isLoading, isError, error, isRefetching, refetch } =
    useQuery<BikeSearchGetResponse, AxiosError>({
      queryKey: [QueryKeys.Bikes, searchParams],
      queryFn: () => BikeService.getBikes(searchParams),
    });

    return {
        searchData: data,
        isSearching: isLoading,
        isSearchingError: isError,
        searchError: error,
        isRefetchingSearch: isRefetching,
        refetchSearch: refetch,
      };
  };

  export default useGetBikes;
