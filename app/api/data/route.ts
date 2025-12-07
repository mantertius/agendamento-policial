import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const slots = db.prepare('SELECT * FROM slots ORDER BY date, start_time').all();
    const bookings = db.prepare('SELECT * FROM bookings').all();
    const configs = db.prepare('SELECT * FROM availability_configs').all();

    // Otimização: Criar um Map de bookings para acesso O(1)
    const bookingsMap = new Map();
    bookings.forEach((b: any) => {
      bookingsMap.set(b.slot_id, b);
    });

    // Converter formato do banco para formato da aplicação
    const formattedSlots = slots.map((slot: any) => {
      const booking = bookingsMap.get(slot.id);
      return {
        id: slot.id,
        date: slot.date,
        startTime: slot.start_time,
        endTime: slot.end_time,
        isBooked: slot.is_booked === 1,
        isDisabled: slot.is_disabled === 1,
        isInternal: slot.is_internal === 1,
        booking: booking ? {
          id: booking.id,
          slotId: booking.slot_id,
          name: booking.name,
          phone: booking.phone || undefined,
          email: booking.email || undefined,
          description: booking.description || undefined,
          createdAt: booking.created_at,
          status: booking.status,
        } : undefined,
      };
    });

    const formattedBookings = bookings.map((b: any) => ({
      id: b.id,
      slotId: b.slot_id,
      name: b.name,
      phone: b.phone || undefined,
      email: b.email || undefined,
      description: b.description || undefined,
      createdAt: b.created_at,
    }));

    const formattedConfigs = configs.map((c: any) => ({
      id: c.id,
      startDate: c.start_date,
      endDate: c.end_date,
      startTime: c.start_time,
      endTime: c.end_time,
      slotDuration: c.slot_duration,
      daysOfWeek: JSON.parse(c.days_of_week),
    }));

    return NextResponse.json({
      slots: formattedSlots,
      bookings: formattedBookings,
      availabilityConfigs: formattedConfigs,
    });
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 });
  }
}
