/**
 * @jest-environment node
 */
import { POST } from '@/app/api/bookings/reallocate/route';

// Mock DB
const mockRun = jest.fn();
const mockGet = jest.fn();
const mockPrepare = jest.fn(() => ({
  run: mockRun,
  get: mockGet,
}));
const mockDb = {
  prepare: mockPrepare,
  transaction: jest.fn((fn) => fn),
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

// Mock sendEmail helper
jest.mock('@/app/api/send-email/route', () => ({
  sendEmail: jest.fn().mockResolvedValue(true),
}));

describe('POST /api/bookings/reallocate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if IDs are missing', async () => {
    const request = {
      json: async () => ({}),
    } as any;

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Booking ID e New Slot ID são obrigatórios');
  });

  it('should reallocate booking', async () => {
    const request = {
      json: async () => ({ bookingId: 'booking1', newSlotId: 'slot2' }),
    } as any;

    // Mock new slot check (available)
    mockGet.mockReturnValueOnce({ id: 'slot2', is_booked: 0, is_disabled: 0, date: '2024-12-26', start_time: '10:00' });
    // Mock booking check (exists)
    mockGet.mockReturnValueOnce({ id: 'booking1', email: 'test@test.com', name: 'Test' });

    const response = await POST(request);
    
    expect(mockPrepare).toHaveBeenCalledWith('SELECT * FROM slots WHERE id = ?');
    expect(mockPrepare).toHaveBeenCalledWith('SELECT * FROM bookings WHERE id = ?');
    
    // Updates
    expect(mockPrepare).toHaveBeenCalledWith('UPDATE bookings SET slot_id = ?, status = ? WHERE id = ?');
    expect(mockPrepare).toHaveBeenCalledWith('UPDATE slots SET is_booked = 1 WHERE id = ?');
    
    expect(response.status).toBe(200);
  });
});
