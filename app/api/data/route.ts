import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const slots = db.prepare('SELECT * FROM slots ORDER BY date, start_time').all();
    const bookings = db.prepare('SELECT * FROM bookings').all();
    const configs = db.prepare('SELECT * FROM availability_configs').all();

    // Converter formato do banco para formato da aplicação
    const formattedSlots = slots.map((slot: any) => ({
      id: slot.id,
      date: slot.date,
      startTime: slot.start_time,
      endTime: slot.end_time,
      isBooked: slot.is_booked === 1,
      isDisabled: slot.is_disabled === 1,
      booking: bookings.find((b: any) => b.slot_id === slot.id) ? {
        id: (bookings.find((b: any) => b.slot_id === slot.id) as any).id,
        slotId: (bookings.find((b: any) => b.slot_id === slot.id) as any).slot_id,
        name: (bookings.find((b: any) => b.slot_id === slot.id) as any).name,
        phone: (bookings.find((b: any) => b.slot_id === slot.id) as any).phone || undefined,
        email: (bookings.find((b: any) => b.slot_id === slot.id) as any).email || undefined,
        description: (bookings.find((b: any) => b.slot_id === slot.id) as any).description || undefined,
        createdAt: (bookings.find((b: any) => b.slot_id === slot.id) as any).created_at,
      } : undefined,
    }));

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
