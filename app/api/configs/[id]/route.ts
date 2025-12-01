import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = getDb();
    const { id } = await params;
    
    db.prepare('DELETE FROM availability_configs WHERE id = ?').run(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao remover configuração:', error);
    return NextResponse.json({ error: 'Erro ao remover configuração' }, { status: 500 });
  }
}
