import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const slots = db.prepare('SELECT * FROM slots ORDER BY date, start_time').all();
    const bookings = db.prepare('SELECT * FROM bookings').all();

    const formattedSlots = slots.map((slot: any) => {
      const booking = bookings.find((b: any) => b.slot_id === slot.id);
      return {
        id: slot.id,
        date: slot.date,
        startTime: slot.start_time,
        endTime: slot.end_time,
        isBooked: slot.is_booked === 1,
        booking: booking ? {
          id: booking.id,
          slotId: booking.slot_id,
          name: booking.name,
          phone: booking.phone || undefined,
          email: booking.email || undefined,
          description: booking.description || undefined,
          createdAt: booking.created_at,
        } : undefined,
      };
    });

    return NextResponse.json(formattedSlots);
  } catch (error) {
    console.error('Erro ao buscar slots:', error);
    return NextResponse.json({ error: 'Erro ao buscar slots' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const slots = await request.json();
    
    const insertStmt = db.prepare(`
      INSERT OR IGNORE INTO slots (id, date, start_time, end_time, is_booked)
      VALUES (?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((slots: any[]) => {
      for (const slot of slots) {
        insertStmt.run(slot.id, slot.date, slot.startTime, slot.endTime, slot.isBooked ? 1 : 0);
      }
    });

    insertMany(Array.isArray(slots) ? slots : [slots]);

    return NextResponse.json({ success: true, count: Array.isArray(slots) ? slots.length : 1 });
  } catch (error) {
    console.error('Erro ao criar slots:', error);
    return NextResponse.json({ error: 'Erro ao criar slots' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    db.prepare('DELETE FROM bookings').run();
    db.prepare('DELETE FROM slots').run();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao limpar slots:', error);
    return NextResponse.json({ error: 'Erro ao limpar slots' }, { status: 500 });
  }
}
