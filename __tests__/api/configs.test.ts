/**
 * @jest-environment node
 */
import { GET, POST } from '@/app/api/configs/route';
import { NextResponse } from 'next/server';

// Mock DB
const mockRun = jest.fn();
const mockAll = jest.fn();
const mockPrepare = jest.fn(() => ({
  run: mockRun,
  all: mockAll,
}));

const mockDb = {
  prepare: mockPrepare,
};

jest.mock('@/lib/db', () => ({
  __esModule: true,
  default: jest.fn(() => mockDb),
}));

describe('/api/configs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return all configs', async () => {
      const mockConfigs = [
        {
          id: '1',
          start_date: '2023-01-01',
          end_date: '2023-12-31',
          start_time: '08:00',
          end_time: '17:00',
          slot_duration: 30,
          days_of_week: '[1, 2, 3, 4, 5]',
          lunch_break_enabled: 1,
          lunch_break_start: '12:00',
          lunch_break_duration: 60,
        },
      ];
      mockAll.mockReturnValue(mockConfigs);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(data[0].daysOfWeek).toEqual([1, 2, 3, 4, 5]);
      expect(data[0].lunchBreakEnabled).toBe(true);
    });

    it('should handle errors', async () => {
      mockAll.mockImplementation(() => {
        throw new Error('DB Error');
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Erro ao buscar configurações');
    });
  });

  describe('POST', () => {
    it('should create a config successfully', async () => {
      const configData = {
        id: '1',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        startTime: '08:00',
        endTime: '17:00',
        slotDuration: 30,
        daysOfWeek: [1, 2, 3, 4, 5],
        lunchBreakEnabled: true,
        lunchBreakStart: '12:00',
        lunchBreakDuration: 60,
      };

      const request = new Request('http://localhost/api/configs', {
        method: 'POST',
        body: JSON.stringify(configData),
      });

      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      
      expect(mockPrepare).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO availability_configs'));
      expect(mockRun).toHaveBeenCalledWith(
        configData.id,
        configData.startDate,
        configData.endDate,
        configData.startTime,
        configData.endTime,
        configData.slotDuration,
        JSON.stringify(configData.daysOfWeek),
        1,
        configData.lunchBreakStart,
        configData.lunchBreakDuration
      );
    });
  });
});
