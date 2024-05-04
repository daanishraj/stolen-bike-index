import { BikeCountGetResponse, BikeSearchGetResponse } from '@/types/types';
import Api from './Api';

const searchRoute = '/search';
const countRoute = '/search/count';

const getBikes = async () : Promise<BikeSearchGetResponse> => {
    const response = await Api().get(searchRoute);
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
