/**
 * @jest-environment node
 */
import { GET } from '@/app/api/data/route';
import { NextResponse } from 'next/server';

// Mock DB
const mockAll = jest.fn();
const mockPrepare = jest.fn(() => ({
  all: mockAll,
}));

const mockDb = {
  prepare: mockPrepare,
};

jest.mock('@/lib/db', () => ({
  __esModule: true,
  default: jest.fn(() => mockDb),
}));

describe('/api/data', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return formatted slots, bookings and configs', async () => {
      const mockSlots = [
        { id: 's1', date: '2023-12-01', start_time: '10:00', end_time: '11:00', is_booked: 1, is_disabled: 0, is_internal: 0 },
      ];
      const mockBookings = [
        { id: 'b1', slot_id: 's1', name: 'John', phone: '123', email: 'john@example.com', description: 'Test', created_at: '2023-11-01', status: 'confirmed' },
      ];
      const mockConfigs = [
        { id: 'c1', start_date: '2023-01-01', days_of_week: '[]' },
      ];

      mockAll
        .mockReturnValueOnce(mockSlots)
        .mockReturnValueOnce(mockBookings)
        .mockReturnValueOnce(mockConfigs);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.slots).toHaveLength(1);
      expect(data.slots[0].booking).toBeDefined();
      expect(data.slots[0].booking.id).toBe('b1');
      expect(data.bookings).toHaveLength(1);
      expect(data.availabilityConfigs).toHaveLength(1);
    });

    it('should handle errors', async () => {
      mockAll.mockImplementation(() => {
        throw new Error('DB Error');
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Erro ao buscar dados');
    });
  });
});
