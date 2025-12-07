/**
 * @jest-environment node
 */
import { NextResponse } from 'next/server';

// Mock Nodemailer
jest.mock('nodemailer', () => {
  const mockSendMail = jest.fn();
  return {
    createTransport: jest.fn(() => ({
      sendMail: mockSendMail,
    })),
    __mockSendMail: mockSendMail,
  };
});

import { POST, sendEmail } from '@/app/api/send-email/route';
import nodemailer from 'nodemailer';

const mockSendMail = (nodemailer as any).__mockSendMail;

describe('/api/send-email', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the mock implementation if needed, but here it's a constant ref
    mockSendMail.mockReset();
  });

  describe('sendEmail helper', () => {
    it('should send email successfully', async () => {
      mockSendMail.mockResolvedValue(true);

      const result = await sendEmail({
        to: 'test@example.com',
        subject: 'Test',
        html: '<p>Test</p>',
      });

      expect(result).toBe(true);
      expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
        to: 'test@example.com',
        subject: 'Test',
      }));
    });

    it('should handle send email error', async () => {
      mockSendMail.mockRejectedValue(new Error('SMTP Error'));

      await expect(sendEmail({
        to: 'test@example.com',
        subject: 'Test',
        html: '<p>Test</p>',
      })).rejects.toThrow('SMTP Error');
    });
  });

  describe('POST', () => {
    it('should send email via API', async () => {
      mockSendMail.mockResolvedValue(true);
      // Mock env vars
      process.env.GMAIL_USER = 'test@gmail.com';
      process.env.GMAIL_APP_PASSWORD = 'pass';

      const request = new Request('http://localhost/api/send-email', {
        method: 'POST',
        body: JSON.stringify({
          to: 'test@example.com',
          subject: 'Test',
          html: '<p>Test</p>',
        }),
      });

      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should return 500 on error', async () => {
      mockSendMail.mockRejectedValue(new Error('SMTP Error'));
      process.env.GMAIL_USER = 'test@gmail.com';
      process.env.GMAIL_APP_PASSWORD = 'pass';

      const request = new Request('http://localhost/api/send-email', {
        method: 'POST',
        body: JSON.stringify({
          to: 'test@example.com',
          subject: 'Test',
          html: '<p>Test</p>',
        }),
      });

      const response = await POST(request as any);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Erro ao enviar email');
    });
  });
});
