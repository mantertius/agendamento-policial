import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Buscar o agendamento para obter o slot_id
    const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(id) as any;

    if (!booking) {
      return NextResponse.json({ error: 'Agendamento não encontrado' }, { status: 404 });
    }

    // Deletar agendamento
    db.prepare('DELETE FROM bookings WHERE id = ?').run(id);

    // Liberar o slot
    db.prepare('UPDATE slots SET is_booked = 0 WHERE id = ?').run(booking.slot_id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao cancelar agendamento:', error);
    return NextResponse.json({ error: 'Erro ao cancelar agendamento' }, { status: 500 });
  }
}
