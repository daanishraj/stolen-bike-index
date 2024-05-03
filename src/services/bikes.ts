import { BikeResponseGetData } from '@/types/types';
import Api from './Api';

const searchRoute = '/search';

const getBikes = async () : Promise<BikeResponseGetData> => {
    const response = await Api().get(searchRoute);
    return response.data;
};

const BikeService = {
    getBikes,
};

export default BikeService;
