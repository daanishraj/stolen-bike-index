import { getDateFromTimestamp } from '@/helpers';

describe('helpers', () => {
    it('should return the correct date in the expected format when a timestamp in seconds is passed', () => {
        const timestampInSeconds = 1714730035;
        const expectedDate = 'May 3, 2024';
        const actualDate = getDateFromTimestamp(timestampInSeconds);
        expect(actualDate).toBe(expectedDate);
    });
});
