import { useParams } from 'react-router-dom';
import useGetBikeDetails from './hooks/use-get-bike-details';

const BikeDetails = () => {
    const { id } = useParams();
    if (!id) {
        return <div>There is an error - no id was provided</div>;
    }
    const { data, isLoading, isError, error } = useGetBikeDetails(Number(id));

    const getContent = () => {
        if (isError) {
            return <div>There is an error {error?.message}</div>;
        }

        if (isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <div>{data?.bike.title}</div>
        );
    };

    return (
        <div>
            {getContent()}
        </div>
    );
};

export default BikeDetails;
