import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = getDb();
    const { id } = await params;

    // Buscar o agendamento
    const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(id) as any;

    if (!booking) {
      return NextResponse.json({ error: 'Agendamento não encontrado' }, { status: 404 });
    }

    // Atualizar status do agendamento
    db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run('pending_reallocation', id);

    // Liberar o slot
    db.prepare('UPDATE slots SET is_booked = 0 WHERE id = ?').run(booking.slot_id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao mover para pool:', error);
    return NextResponse.json({ error: 'Erro ao mover para pool' }, { status: 500 });
  }
}
