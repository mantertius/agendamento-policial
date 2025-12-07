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
    const { date } = await request.json();

    if (!date) {
      return NextResponse.json({ error: 'Data é obrigatória' }, { status: 400 });
    }

    const db = getDb();

    // 1. Buscar todos os slots do dia
    const slots = db.prepare('SELECT * FROM slots WHERE date = ?').all(date) as SlotRow[];
    const slotIds = slots.map(s => s.id);

    if (slotIds.length === 0) {
      return NextResponse.json({ message: 'Nenhum slot encontrado para esta data' });
    }

    // 2. Buscar agendamentos nesses slots
    const placeholders = slotIds.map(() => '?').join(',');
    const bookings = db.prepare(`SELECT * FROM bookings WHERE slot_id IN (${placeholders})`).all(...slotIds) as BookingRow[];

    // 3. Atualizar status dos agendamentos para 'pending_reallocation'
    const updateBookingStmt = db.prepare('UPDATE bookings SET status = ? WHERE id = ?');
    
    // 4. Desativar slots (ou deletar, mas desativar mantém histórico)
    const disableSlotStmt = db.prepare('UPDATE slots SET is_disabled = 1, is_booked = 0 WHERE id = ?');

    const transaction = db.transaction(() => {
      // Atualizar agendamentos
      for (const booking of bookings) {
        updateBookingStmt.run('pending_reallocation', booking.id);
      }
      // Desativar slots
      for (const slotId of slotIds) {
        disableSlotStmt.run(slotId);
      }
    });

    transaction();

    // 5. Enviar emails
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      for (const booking of bookings) {
        if (booking.email) {
          try {
            await transporter.sendMail({
              from: `"Agendamento Policial" <${process.env.GMAIL_USER}>`,
              to: booking.email,
              subject: 'Cancelamento de Agendamento - Necessária Realocação',
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #d32f2f;">Agendamento Cancelado</h2>
                  <p>Olá, <strong>${booking.name}</strong>.</p>
                  <p>Informamos que devido a imprevistos, todos os atendimentos do dia <strong>${new Date(date + 'T12:00:00').toLocaleDateString('pt-BR')}</strong> precisaram ser cancelados.</p>
                  <p>Seu agendamento entrou em nossa <strong>lista de prioridade para realocação</strong>.</p>
                  <p>Em breve entraremos em contato para definir um novo horário, ou você receberá um novo email com a confirmação do novo horário.</p>
                  <p>Pedimos desculpas pelo transtorno.</p>
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
      }
    }

    return NextResponse.json({ 
      success: true, 
      affectedBookings: bookings.length,
      affectedSlots: slotIds.length 
    });

  } catch (error) {
    console.error('Erro ao cancelar dia:', error);
    return NextResponse.json({ error: 'Erro ao cancelar dia' }, { status: 500 });
  }
}
