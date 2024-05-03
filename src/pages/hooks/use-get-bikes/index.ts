import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import BikeService from '@/services/bikes';
import { BikeResponseGetData, QueryKeys } from '@/types/types';

const useGetBikes = () => {
    const { data, isLoading, isError, error } = useQuery<BikeResponseGetData, AxiosError>({
      queryKey: [QueryKeys.Bikes],
      queryFn: BikeService.getBikes,
    });

    return { data, isLoading, isError, error };
  };

  export default useGetBikes;
