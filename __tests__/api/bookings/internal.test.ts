/**
 * @jest-environment node
 */
import { POST } from '@/app/api/bookings/internal/route';
import { NextResponse } from 'next/server';

// Mock DB
const mockRun = jest.fn();
const mockGet = jest.fn();
const mockPrepare = jest.fn(() => ({
  run: mockRun,
  get: mockGet,
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

describe('POST /api/bookings/internal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementations
    mockGet.mockReturnValue(undefined); // Default: no slot found
    mockRun.mockReturnValue({ changes: 1 });
  });

  it('should return 400 if required fields are missing', async () => {
    const request = new Request('http://localhost/api/bookings/internal', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Dados incompletos');
  });

  it('should create a new internal slot and booking when no slot exists', async () => {
    // Mock slot check: returns undefined (no slot)
    mockGet.mockReturnValueOnce(undefined);
    
    // Mock counter check inside transaction
    mockGet.mockReturnValueOnce({ value: 100 });

    const body = {
      date: '2023-12-25',
      startTime: '10:00',
      endTime: '11:00',
      name: 'Internal User',
      email: 'internal@example.com',
      phone: '123456789',
      cpf: '123.456.789-00',
      description: 'Internal booking',
    };

    const request = new Request('http://localhost/api/bookings/internal', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    // Verify slot creation
    expect(mockPrepare).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO slots'));
    
    // Verify booking creation
    expect(mockPrepare).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO bookings'));
    
    // Verify email sending
    const { sendEmail } = require('@/app/api/send-email/route');
    expect(sendEmail).toHaveBeenCalled();
  });

  it('should update existing slot and create booking when slot exists and is free', async () => {
    // Mock slot check: returns existing free slot
    mockGet.mockReturnValueOnce({ id: 'existing-slot-id', is_booked: 0 });
    
    // Mock counter check inside transaction
    mockGet.mockReturnValueOnce({ value: 101 });

    const body = {
      date: '2023-12-25',
      startTime: '10:00',
      endTime: '11:00',
      name: 'Internal User',
    };

    const request = new Request('http://localhost/api/bookings/internal', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    // Verify slot update
    expect(mockPrepare).toHaveBeenCalledWith('UPDATE slots SET is_booked = 1, is_internal = 1 WHERE id = ?');
    
    // Verify booking creation
    expect(mockPrepare).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO bookings'));
  });

  it('should return 409 if slot is already booked', async () => {
    // Mock slot check: returns existing booked slot
    mockGet.mockReturnValueOnce({ id: 'existing-slot-id', is_booked: 1 });

    const body = {
      date: '2023-12-25',
      startTime: '10:00',
      endTime: '11:00',
      name: 'Internal User',
    };

    const request = new Request('http://localhost/api/bookings/internal', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const response = await POST(request);
    expect(response.status).toBe(409);
    const data = await response.json();
    expect(data.error).toBe('Já existe um agendamento neste horário.');
  });
});
