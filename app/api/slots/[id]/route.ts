import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verificar se o slot existe
    const slot = db.prepare('SELECT * FROM slots WHERE id = ?').get(id);

    if (!slot) {
      return NextResponse.json({ error: 'Slot não encontrado' }, { status: 404 });
    }

    // Deletar booking associado se existir
    db.prepare('DELETE FROM bookings WHERE slot_id = ?').run(id);
    
    // Deletar o slot
    db.prepare('DELETE FROM slots WHERE id = ?').run(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao remover slot:', error);
    return NextResponse.json({ error: 'Erro ao remover slot' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Verificar se o slot existe
    const slot = db.prepare('SELECT * FROM slots WHERE id = ?').get(id);

    if (!slot) {
      return NextResponse.json({ error: 'Slot não encontrado' }, { status: 404 });
    }

    // Atualizar isDisabled
    if (typeof body.isDisabled === 'boolean') {
      db.prepare('UPDATE slots SET is_disabled = ? WHERE id = ?').run(body.isDisabled ? 1 : 0, id);
      
      // Se estiver desativando, também remove o booking
      if (body.isDisabled) {
        db.prepare('DELETE FROM bookings WHERE slot_id = ?').run(id);
        db.prepare('UPDATE slots SET is_booked = 0 WHERE id = ?').run(id);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar slot:', error);
    return NextResponse.json({ error: 'Erro ao atualizar slot' }, { status: 500 });
  }
}
