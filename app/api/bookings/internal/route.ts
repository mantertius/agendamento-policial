import { NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { sendEmail } from '@/app/api/send-email/route';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, startTime, endTime, name, email, phone, cpf, description } = body;

    if (!date || !startTime || !endTime || !name) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    const db = getDb();

    // 1. Verificar se já existe um slot nesse horário
    let slot = db.prepare('SELECT * FROM slots WHERE date = ? AND start_time = ?').get(date, startTime) as any;

    let slotId;

    if (slot) {
      // Se o slot existe, verificar se está ocupado
      if (slot.is_booked) {
        // Opcional: Permitir override ou retornar erro. 
        // Como é admin, vamos assumir que ele sabe o que faz, mas idealmente não deveria sobrescrever.
        // Vamos retornar erro por segurança.
        return NextResponse.json({ error: 'Já existe um agendamento neste horário.' }, { status: 409 });
      }
      slotId = slot.id;
      
      // Atualizar slot para booked e internal (se não for)
      // Se já era um slot público, agora ele é usado internamente. 
      // Se quisermos esconder do público, setamos is_internal = 1.
      // Se quisermos apenas ocupar, deixamos is_internal como está (ou 0).
      // O requisito diz "não mostre isso na agenda pública".
      // Se o slot já existia publicamente, e agora está ocupado, ele vai aparecer como "Lotado" ou sumir?
      // Se setarmos is_internal=1, ele some da lista pública.
      db.prepare('UPDATE slots SET is_booked = 1, is_internal = 1 WHERE id = ?').run(slotId);

    } else {
      // Criar novo slot interno
      slotId = crypto.randomUUID();
      db.prepare(`
        INSERT INTO slots (id, date, start_time, end_time, is_booked, is_disabled, is_internal)
        VALUES (?, ?, ?, ?, 1, 0, 1)
      `).run(slotId, date, startTime, endTime);
    }

    // 2. Criar agendamento
    // Gerar ID sequencial para o booking (ex: #1001)
    // Usamos uma tabela de contadores para garantir atomicidade
    let bookingNumber = 0;
    
    // Transação para pegar e incrementar contador
    const getNextId = db.transaction(() => {
      db.prepare("UPDATE counters SET value = value + 1 WHERE name = 'booking'").run();
      const counter = db.prepare("SELECT value FROM counters WHERE name = 'booking'").get() as any;
      return counter.value;
    });
    
    bookingNumber = getNextId();
    const bookingId = bookingNumber.toString(); // ID simples para o usuário

    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO bookings (id, slot_id, name, cpf, phone, email, description, created_at, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')
    `).run(bookingId, slotId, name, cpf, phone, email, description, now);

    // 3. Enviar email (se houver email)
    if (email) {
      try {
        await sendEmail({
          to: email,
          subject: 'Agendamento Interno Confirmado - Polícia Civil AL',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1e3a8a;">Agendamento Confirmado</h2>
              <p>Olá <strong>${name}</strong>,</p>
              <p>Seu agendamento foi realizado com sucesso pela administração.</p>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Data:</strong> ${new Date(date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                <p style="margin: 5px 0;"><strong>Horário:</strong> ${startTime} - ${endTime}</p>
                <p style="margin: 5px 0;"><strong>Protocolo:</strong> #${bookingId}</p>
              </div>

              <p>Por favor, compareça com documento de identificação original.</p>
              
              <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
              <p style="color: #6b7280; font-size: 12px;">Este é um e-mail automático, não responda.</p>
            </div>
          `
        });
      } catch (emailError) {
        console.error('Erro ao enviar email:', emailError);
        // Não falhar o request se o email falhar
      }
    }

    return NextResponse.json({ 
      success: true, 
      booking: {
        id: bookingId,
        slotId,
        name,
        date,
        startTime,
        endTime
      }
    });

  } catch (error) {
    console.error('Erro ao criar agendamento interno:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
