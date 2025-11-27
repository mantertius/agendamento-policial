import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const configs = db.prepare('SELECT * FROM availability_configs').all();

    const formattedConfigs = configs.map((c: any) => ({
      id: c.id,
      startDate: c.start_date,
      endDate: c.end_date,
      startTime: c.start_time,
      endTime: c.end_time,
      slotDuration: c.slot_duration,
      daysOfWeek: JSON.parse(c.days_of_week),
    }));

    return NextResponse.json(formattedConfigs);
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return NextResponse.json({ error: 'Erro ao buscar configurações' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const config = await request.json();

    db.prepare(`
      INSERT INTO availability_configs (id, start_date, end_date, start_time, end_time, slot_duration, days_of_week)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      config.id,
      config.startDate,
      config.endDate,
      config.startTime,
      config.endTime,
      config.slotDuration,
      JSON.stringify(config.daysOfWeek)
    );

    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error('Erro ao criar configuração:', error);
    return NextResponse.json({ error: 'Erro ao criar configuração' }, { status: 500 });
  }
}
