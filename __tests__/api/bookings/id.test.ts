/**
 * @jest-environment node
 */
import { DELETE } from '@/app/api/bookings/[id]/route';
import { NextResponse } from 'next/server';

// Mock DB
const mockRun = jest.fn();
const mockGet = jest.fn();
const mockPrepare = jest.fn(() => ({
  run: mockRun,
  get: mockGet,
}));

const mockDb = {
  prepare: mockPrepare,
};

jest.mock('@/lib/db', () => ({
  __esModule: true,
  default: jest.fn(() => mockDb),
}));

describe('/api/bookings/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('DELETE', () => {
    it('should delete a booking and free the slot', async () => {
      const bookingId = 'AG-0001';
      const slotId = 'slot1';

      // Mock booking lookup
      mockGet.mockReturnValue({ id: bookingId, slot_id: slotId });

      const request = new Request(`http://localhost/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      // Mock params
      const params = Promise.resolve({ id: bookingId });

      const response = await DELETE(request as any, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      // Verify DB calls
      expect(mockPrepare).toHaveBeenCalledWith('SELECT * FROM bookings WHERE id = ?');
      expect(mockPrepare).toHaveBeenCalledWith('DELETE FROM bookings WHERE id = ?');
      expect(mockPrepare).toHaveBeenCalledWith('UPDATE slots SET is_booked = 0 WHERE id = ?');
      
      expect(mockRun).toHaveBeenCalledWith(bookingId); // For DELETE
      expect(mockRun).toHaveBeenCalledWith(slotId); // For UPDATE slot
    });

    it('should return 404 if booking not found', async () => {
      mockGet.mockReturnValue(undefined);

      const request = new Request('http://localhost/api/bookings/invalid', {
        method: 'DELETE',
      });
      const params = Promise.resolve({ id: 'invalid' });

      const response = await DELETE(request as any, { params });
      
      expect(response.status).toBe(404);
    });

    it('should handle errors', async () => {
      mockGet.mockImplementation(() => {
        throw new Error('DB Error');
      });

      const request = new Request('http://localhost/api/bookings/1', {
        method: 'DELETE',
      });
      const params = Promise.resolve({ id: '1' });

      const response = await DELETE(request as any, { params });
      
      expect(response.status).toBe(500);
    });
  });
});
