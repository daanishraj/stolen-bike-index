import { DateTime } from 'luxon';

export const getDateFromTimestamp = (timestamp: number | null) => {
    if (timestamp === null) {
      return null;
    }
    const date = DateTime.fromSeconds(timestamp);
    return date.toFormat("MMMM d',' yyyy");
};
