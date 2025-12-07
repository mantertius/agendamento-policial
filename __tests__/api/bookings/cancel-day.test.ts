/**
 * @jest-environment node
 */
import { POST } from '@/app/api/bookings/cancel-day/route';
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
  transaction: (fn: any) => fn,
};

jest.mock('@/lib/db', () => ({
  __esModule: true,
  default: jest.fn(() => mockDb),
}));

// Mock Nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue(true),
  }),
}));

// Mock sendEmail helper if it's used directly
jest.mock('@/app/api/send-email/route', () => ({
  sendEmail: jest.fn().mockResolvedValue(true),
}));

describe('POST /api/bookings/cancel-day', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if date is missing', async () => {
    const request = {
      json: async () => ({}),
    } as any;

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Data é obrigatória');
  });

  it('should cancel bookings and disable slots', async () => {
    const request = {
      json: async () => ({ date: '2024-12-25' }),
    } as any;

    // Mock slots found
    mockAll.mockReturnValueOnce([{ id: 'slot1' }, { id: 'slot2' }]); // slots query
    // Mock bookings found
    mockAll.mockReturnValueOnce([
      { id: 'booking1', email: 'test@test.com', name: 'Test', slot_id: 'slot1' }
    ]); // bookings query

    const response = await POST(request);
    
    expect(mockPrepare).toHaveBeenCalledWith('SELECT * FROM slots WHERE date = ?');
    // The query for bookings uses IN clause, so it might vary slightly
    expect(mockPrepare).toHaveBeenCalledWith(expect.stringContaining('SELECT * FROM bookings WHERE slot_id IN'));
    
    // Updates
    expect(mockPrepare).toHaveBeenCalledWith('UPDATE bookings SET status = ? WHERE id = ?');
    expect(mockPrepare).toHaveBeenCalledWith('UPDATE slots SET is_disabled = 1, is_booked = 0 WHERE id = ?');
    
    expect(response.status).toBe(200);
  });
});
