import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface SlotRow {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_booked: number;
  is_disabled: number;
}

interface BookingRow {
  id: string;
  slot_id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  description: string;
  created_at: string;
  status: string;
}

export async function POST(request: NextRequest) {
  try {
    const { bookingId, newSlotId } = await request.json();

    if (!bookingId || !newSlotId) {
      return NextResponse.json({ error: 'Booking ID e New Slot ID são obrigatórios' }, { status: 400 });
    }

    const db = getDb();

    // 1. Verificar se o novo slot está livre
    const newSlot = db.prepare('SELECT * FROM slots WHERE id = ?').get(newSlotId) as SlotRow;
    if (!newSlot) {
      return NextResponse.json({ error: 'Slot não encontrado' }, { status: 404 });
    }
    if (newSlot.is_booked || newSlot.is_disabled) {
      return NextResponse.json({ error: 'Slot indisponível' }, { status: 400 });
    }

    // 2. Buscar o agendamento
    const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(bookingId) as BookingRow;
    if (!booking) {
      return NextResponse.json({ error: 'Agendamento não encontrado' }, { status: 404 });
    }

    // 3. Atualizar agendamento e slot
    const updateBookingStmt = db.prepare('UPDATE bookings SET slot_id = ?, status = ? WHERE id = ?');
    const updateSlotStmt = db.prepare('UPDATE slots SET is_booked = 1 WHERE id = ?');

    const transaction = db.transaction(() => {
      updateBookingStmt.run(newSlotId, 'confirmed', bookingId);
      updateSlotStmt.run(newSlotId);
    });

    transaction();

    // 4. Enviar email de confirmação
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && booking.email) {
      try {
        const dateStr = new Date(newSlot.date + 'T12:00:00').toLocaleDateString('pt-BR');
        
        await transporter.sendMail({
          from: `"Agendamento Policial" <${process.env.GMAIL_USER}>`,
          to: booking.email,
          subject: 'Agendamento Realocado - Novo Horário Confirmado',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2e7d32;">Agendamento Realocado com Sucesso</h2>
              <p>Olá, <strong>${booking.name}</strong>.</p>
              <p>Seu agendamento foi realocado para um novo horário:</p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Data:</strong> ${dateStr}</p>
                <p style="margin: 5px 0;"><strong>Horário:</strong> ${newSlot.start_time} às ${newSlot.end_time}</p>
                <p style="margin: 5px 0;"><strong>Local:</strong> ${process.env.NEXT_PUBLIC_ENDERECO || 'Delegacia'}</p>
              </div>
              <p>Por favor, compareça com 15 minutos de antecedência portando documento original com foto.</p>
              <br>
              <p>Atenciosamente,</p>
              <p><strong>Polícia Civil de Alagoas</strong></p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error(`Erro ao enviar email para ${booking.email}:`, emailError);
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erro ao realocar agendamento:', error);
    return NextResponse.json({ error: 'Erro ao realocar agendamento' }, { status: 500 });
  }
}
