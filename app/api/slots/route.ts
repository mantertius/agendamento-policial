import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';

interface SlotRow {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_booked: number;
}

interface BookingRow {
  id: string;
  slot_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  description: string | null;
  created_at: string;
}

export async function GET() {
  try {
    const db = getDb();
    const slots = db.prepare('SELECT * FROM slots ORDER BY date, start_time').all() as SlotRow[];
    const bookings = db.prepare('SELECT * FROM bookings').all() as BookingRow[];

    const formattedSlots = slots.map((slot) => {
      const booking = bookings.find((b) => b.slot_id === slot.id);
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
    const db = getDb();
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
    const db = getDb();
    db.prepare('DELETE FROM bookings').run();
    db.prepare('DELETE FROM slots').run();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao limpar slots:', error);
    return NextResponse.json({ error: 'Erro ao limpar slots' }, { status: 500 });
  }
}
