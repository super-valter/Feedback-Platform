import { getDiffTimeBetweenCurrentDate } from './date'; // Replace with the correct path to your date utils file

describe('getDiffTimeBetweenCurrentDate function', () => {
  it('should return the correct time difference message', () => {

    const newDateGetTime = new Date().getTime();
    const oneDayAgoTimestamp = newDateGetTime - (24 * 60 * 60 * 1000);
    const oneHourAgoTimestamp = newDateGetTime - (60 * 60 * 1000);
    const oneSecondAgoTimestamp = newDateGetTime - 1000;
    const twoDaysAgoTimestamp = newDateGetTime - (2 * 24 * 60 * 60 * 1000);

    expect(getDiffTimeBetweenCurrentDate(oneDayAgoTimestamp)).toBe('1 dia atrás');
    expect(getDiffTimeBetweenCurrentDate(twoDaysAgoTimestamp)).toBe('2 dias atrás');
    expect(getDiffTimeBetweenCurrentDate(oneHourAgoTimestamp)).toBe('1 hora atrás');
    expect(getDiffTimeBetweenCurrentDate(oneSecondAgoTimestamp)).toBe('1 segundo atrás');

  });

  it('should handle invalid date strings', () => {

    expect(getDiffTimeBetweenCurrentDate(null)).toBe(null);
    expect(getDiffTimeBetweenCurrentDate(undefined)).toBe('');
    expect(getDiffTimeBetweenCurrentDate(false)).toBe(false);
    expect(getDiffTimeBetweenCurrentDate(true)).toBe(true);
    expect(getDiffTimeBetweenCurrentDate('invalidDateString')).toBe('invalidDateString');
  });

});
