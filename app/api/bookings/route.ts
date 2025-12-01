import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const bookings = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all();

    const formattedBookings = bookings.map((b: any) => ({
      id: b.id,
      slotId: b.slot_id,
      name: b.name,
      cpf: b.cpf || undefined,
      phone: b.phone || undefined,
      email: b.email || undefined,
      description: b.description || undefined,
      createdAt: b.created_at,
    }));

    return NextResponse.json(formattedBookings);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return NextResponse.json({ error: 'Erro ao buscar agendamentos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const booking = await request.json();

    // Verificar se o slot existe e não está reservado
    const slot = db.prepare('SELECT * FROM slots WHERE id = ?').get(booking.slotId) as any;
    
    if (!slot) {
      return NextResponse.json({ error: 'Slot não encontrado' }, { status: 404 });
    }

    if (slot.is_booked === 1) {
      return NextResponse.json({ error: 'Slot já está reservado' }, { status: 400 });
    }

    // Gerar ID sequencial no formato AG-0001
    const counter = db.prepare('SELECT value FROM counters WHERE name = ?').get('booking') as any;
    const nextValue = (counter?.value || 0) + 1;
    db.prepare('UPDATE counters SET value = ? WHERE name = ?').run(nextValue, 'booking');
    const bookingId = `AG-${String(nextValue).padStart(4, '0')}`;

    // Inserir agendamento
    db.prepare(`
      INSERT INTO bookings (id, slot_id, name, cpf, phone, email, description, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      bookingId,
      booking.slotId,
      booking.name,
      booking.cpf || null,
      booking.phone || null,
      booking.email || null,
      booking.description || null,
      booking.createdAt
    );

    // Atualizar slot como reservado
    db.prepare('UPDATE slots SET is_booked = 1 WHERE id = ?').run(booking.slotId);

    return NextResponse.json({ success: true, booking: { ...booking, id: bookingId } });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    return NextResponse.json({ error: 'Erro ao criar agendamento' }, { status: 500 });
  }
}
