/**
 * @jest-environment node
 */
import { GET, POST, DELETE } from '@/app/api/slots/route';
import { NextResponse } from 'next/server';

// Mock DB
const mockRun = jest.fn();
const mockAll = jest.fn();
const mockPrepare = jest.fn(() => ({
  run: mockRun,
  all: mockAll,
}));
const mockTransaction = jest.fn((fn) => fn);

const mockDb = {
  prepare: mockPrepare,
  transaction: mockTransaction,
};

jest.mock('@/lib/db', () => ({
  __esModule: true,
  default: jest.fn(() => mockDb),
}));

describe('/api/slots', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return all slots with formatted data', async () => {
      const mockSlots = [
        { id: '1', date: '2023-12-25', start_time: '10:00', end_time: '11:00', is_booked: 0 },
        { id: '2', date: '2023-12-25', start_time: '11:00', end_time: '12:00', is_booked: 1 },
      ];
      const mockBookings = [
        {
          id: 'b1',
          slot_id: '2',
          name: 'John Doe',
          phone: '123',
          email: 'john@example.com',
          description: 'Test',
          created_at: '2023-12-01',
          status: 'confirmed',
        },
      ];

      mockAll.mockReturnValueOnce(mockSlots).mockReturnValueOnce(mockBookings);

      const response = await GET();
      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data).toHaveLength(2);
      expect(data[0]).toEqual({
        id: '1',
        date: '2023-12-25',
        startTime: '10:00',
        endTime: '11:00',
        isBooked: false,
        booking: undefined,
      });
      expect(data[1]).toEqual({
        id: '2',
        date: '2023-12-25',
        startTime: '11:00',
        endTime: '12:00',
        isBooked: true,
        booking: {
          id: 'b1',
          slotId: '2',
          name: 'John Doe',
          phone: '123',
          email: 'john@example.com',
          description: 'Test',
          createdAt: '2023-12-01',
          status: 'confirmed',
        },
      });
    });

    it('should handle empty DB', async () => {
      mockAll.mockReturnValue([]);
      const response = await GET();
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual([]);
    });
  });

  describe('POST', () => {
    it('should create multiple slots', async () => {
      const slots = [
        { id: '1', date: '2023-12-25', startTime: '10:00', endTime: '11:00', isBooked: false },
        { id: '2', date: '2023-12-25', startTime: '11:00', endTime: '12:00', isBooked: true },
      ];

      const request = new Request('http://localhost/api/slots', {
        method: 'POST',
        body: JSON.stringify(slots),
      });

      const response = await POST(request as any);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.count).toBe(2);

      expect(mockPrepare).toHaveBeenCalledWith(expect.stringContaining('INSERT OR IGNORE INTO slots'));
      expect(mockRun).toHaveBeenCalledTimes(2);
    });
  });

  describe('DELETE', () => {
    it('should delete all bookings and slots', async () => {
      const response = await DELETE();
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);

      expect(mockPrepare).toHaveBeenCalledWith('DELETE FROM bookings');
      expect(mockPrepare).toHaveBeenCalledWith('DELETE FROM slots');
      expect(mockRun).toHaveBeenCalledTimes(2);
    });
  });
});
