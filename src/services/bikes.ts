import { BikeCountGetResponse, BikeSearchGetResponse } from '@/types/types';
import Api from './Api';

const searchRoute = '/search';
const countRoute = '/search/count';

export const defaultQueryParams = {
    page: 1,
    per_page: 10,
};

const getBikes = async (params: URLSearchParams) : Promise<BikeSearchGetResponse> => {
    const queryParams: Record<string, string> = {};
    for (const [key, value] of params.entries()) {
        queryParams[key] = value;
    }

    const updatedParams = { ...defaultQueryParams, ...queryParams };
    const response = await Api().get(searchRoute, { params: updatedParams });
    return response.data;
};

const getBikeCount = async () : Promise<BikeCountGetResponse> => {
    const response = await Api().get(countRoute);
    return response.data;
};

const BikeService = {
    getBikes,
    getBikeCount,
};

export default BikeService;
