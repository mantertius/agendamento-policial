import { calculateEaster, getMovableHolidays, isHoliday, getHolidaysForYear } from '@/app/utils/holidays';

describe('Holiday Utils', () => {
  describe('calculateEaster', () => {
    it('should calculate Easter date correctly for 2024', () => {
      const easter2024 = calculateEaster(2024);
      // Easter 2024 is March 31st
      expect(easter2024.getFullYear()).toBe(2024);
      expect(easter2024.getMonth()).toBe(2); // Month is 0-indexed
      expect(easter2024.getDate()).toBe(31);
    });

    it('should calculate Easter date correctly for 2025', () => {
      const easter2025 = calculateEaster(2025);
      // Easter 2025 is April 20th
      expect(easter2025.getFullYear()).toBe(2025);
      expect(easter2025.getMonth()).toBe(3);
      expect(easter2025.getDate()).toBe(20);
    });
  });

  describe('getMovableHolidays', () => {
    it('should return correct movable holidays for 2024', () => {
      const holidays = getMovableHolidays(2024);
      
      // Carnaval 2024: Feb 12 (Mon) and Feb 13 (Tue)
      expect(holidays).toContainEqual(expect.objectContaining({ date: '2024-02-12', name: 'Carnaval (Segunda)' }));
      expect(holidays).toContainEqual(expect.objectContaining({ date: '2024-02-13', name: 'Carnaval (Terça)' }));
      
      // Sexta-feira Santa 2024: Mar 29
      expect(holidays).toContainEqual(expect.objectContaining({ date: '2024-03-29', name: 'Sexta-feira Santa' }));
      
      // Corpus Christi 2024: May 30
      expect(holidays).toContainEqual(expect.objectContaining({ date: '2024-05-30', name: 'Corpus Christi' }));
    });
  });

  describe('isHoliday', () => {
    it('should identify fixed holidays', () => {
      // Christmas
      const result = isHoliday('2024-12-25');
      expect(result.isHoliday).toBe(true);
      expect(result.holidayName).toBe('Natal');
    });

    it('should identify movable holidays', () => {
      // Corpus Christi 2024
      const result = isHoliday('2024-05-30');
      expect(result.isHoliday).toBe(true);
      expect(result.holidayName).toBe('Corpus Christi');
    });

    it('should return false for non-holidays', () => {
      const result = isHoliday('2024-12-26');
      expect(result.isHoliday).toBe(false);
    });
  });
});
