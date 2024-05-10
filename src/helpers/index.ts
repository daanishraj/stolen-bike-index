import { DateTime } from 'luxon';

export const getDateFromTimestamp = (timestamp: number | null) => {
    if (timestamp === null) {
      return null;
    }
    const date = DateTime.fromSeconds(timestamp);
    return date.toFormat("MMMM d',' yyyy");
};

export const getStringFromDate = (date: Date | null) => {
  if (!date) {
    return '';
  }
  const strDate = DateTime.fromJSDate(date);
  return strDate.setZone('Europe/Berlin').toFormat('dd.MM.yyyy');
};

export const getDateToday = () => {
  const today = DateTime.now().setZone('Europe/Berlin').startOf('day');
  return today.toJSDate();
};
