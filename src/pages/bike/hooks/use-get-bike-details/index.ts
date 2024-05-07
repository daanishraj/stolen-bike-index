import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import BikeService from '@/services/bikes';
import { BikeDetailsGetResponse, QueryKeys } from '@/types/types';

const useGetBikeDetails = (id: number) => {
    const { data, isLoading, isError, error, isRefetching, refetch } =
    useQuery<BikeDetailsGetResponse, AxiosError>({
      queryKey: [QueryKeys.BikeDetails, id],
      queryFn: () => BikeService.getBikeDetails(id),
    });

    return {
        data,
        isLoading,
        isError,
        error,
        isRefetching,
        refetch,
      };
  };

  export default useGetBikeDetails;
