/**
 * @jest-environment node
 */
import { GET, POST } from '@/app/api/bookings/route';
import { NextResponse } from 'next/server';

// Mock DB
const mockRun = jest.fn();
const mockAll = jest.fn();
const mockGet = jest.fn();
const mockPrepare = jest.fn(() => ({
  run: mockRun,
  all: mockAll,
  get: mockGet,
}));

const mockDb = {
  prepare: mockPrepare,
};

jest.mock('@/lib/db', () => ({
  __esModule: true,
  default: jest.fn(() => mockDb),
}));

describe('/api/bookings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return all bookings', async () => {
      const mockBookings = [
        {
          id: 'AG-0001',
          slot_id: 'slot1',
          name: 'John Doe',
          cpf: '12345678900',
          phone: '123456789',
          email: 'john@example.com',
          description: 'Test',
          created_at: '2023-12-01T10:00:00Z',
        },
      ];
      mockAll.mockReturnValue(mockBookings);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(data[0].id).toBe('AG-0001');
      expect(mockPrepare).toHaveBeenCalledWith('SELECT * FROM bookings ORDER BY created_at DESC');
    });

    it('should handle errors', async () => {
      mockAll.mockImplementation(() => {
        throw new Error('DB Error');
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Erro ao buscar agendamentos');
    });
  });

  describe('POST', () => {
    it('should create a booking successfully', async () => {
      const bookingData = {
        slotId: 'slot1',
        name: 'John Doe',
        cpf: '12345678900',
        phone: '123456789',
        email: 'john@example.com',
        description: 'Test',
        createdAt: '2023-12-01T10:00:00Z',
      };

      // Mock slot check (exists and not booked)
      mockGet.mockReturnValueOnce({ id: 'slot1', is_booked: 0 });
      // Mock counter check
      mockGet.mockReturnValueOnce({ value: 0 });

      const request = new Request('http://localhost/api/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      });

      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.booking.id).toBe('AG-0001');
      
      // Verify DB calls
      expect(mockPrepare).toHaveBeenCalledWith('SELECT * FROM slots WHERE id = ?');
      expect(mockPrepare).toHaveBeenCalledWith('UPDATE counters SET value = ? WHERE name = ?');
      expect(mockPrepare).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO bookings'));
      expect(mockPrepare).toHaveBeenCalledWith('UPDATE slots SET is_booked = 1 WHERE id = ?');
    });

    it('should return 404 if slot does not exist', async () => {
      mockGet.mockReturnValueOnce(undefined); // Slot not found

      const request = new Request('http://localhost/api/bookings', {
        method: 'POST',
        body: JSON.stringify({ slotId: 'invalid' }),
      });

      const response = await POST(request as any);
      
      expect(response.status).toBe(404);
    });

    it('should return 400 if slot is already booked', async () => {
      mockGet.mockReturnValueOnce({ id: 'slot1', is_booked: 1 }); // Slot booked

      const request = new Request('http://localhost/api/bookings', {
        method: 'POST',
        body: JSON.stringify({ slotId: 'slot1' }),
      });

      const response = await POST(request as any);
      
      expect(response.status).toBe(400);
    });
  });
});
