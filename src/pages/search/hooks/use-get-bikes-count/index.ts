import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import BikeService from '@/services/bikes';
import { TBikeCountGetResponse, QueryKeys } from '@/types/types';

const useGetBikesCount = () => {
  const { data, isLoading, isError, error } = useQuery<TBikeCountGetResponse, AxiosError>({
    queryKey: [QueryKeys.BikesCount],
    queryFn: BikeService.getBikeCount,
  });

  return {
    countData: data,
    isCounting: isLoading,
    isCountingError: isError,
    countError: error,
  };
};

export default useGetBikesCount;
