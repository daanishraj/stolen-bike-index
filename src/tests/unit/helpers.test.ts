import { DateTime } from 'luxon';
import { getDateFromTimestamp, getDateToday, getStringFromDate } from '@/helpers';

describe('helpers', () => {
  describe('getDateFromTimestamp', () => {
    it('should return the correct date in the expected format when a timestamp in seconds is passed', () => {
      const timestampInSeconds = 1714730035;
      const expectedDate = 'May 3, 2024';
      const actualDate = getDateFromTimestamp(timestampInSeconds);

      expect(actualDate).toBe(expectedDate);
    });
  });

  describe('getStringFromDate', () => {
    it('returns empty string when input date is null', () => {
      expect(getStringFromDate(null)).toBe('');
    });

    it('returns formatted date string when input date is not null', () => {
      const date = new Date('2024-05-15T12:00:00Z');
      const expectedDateString = DateTime.fromJSDate(date)
        .setZone('Europe/Berlin')
        .toFormat('dd.MM.yyyy');

      expect(getStringFromDate(date)).toBe(expectedDateString);
    });
  });

  describe('getDateToday', () => {
    test("returns today's date in Europe/Berlin timezone", () => {
      const now = DateTime.local().setZone('Europe/Berlin');
      const expectedDate = now.startOf('day').toJSDate();

      const result = getDateToday();

      expect(result).toEqual(expectedDate);
    });
  });
});
