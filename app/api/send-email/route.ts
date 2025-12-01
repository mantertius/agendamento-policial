import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuração do transporter do Gmail
// Para usar, você precisa:
// 1. Habilitar "Acesso a apps menos seguros" OU
// 2. Criar uma "Senha de App" em https://myaccount.google.com/apppasswords
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // seu-email@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD, // senha de app gerada no Google
  },
});

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: to, subject, html' },
        { status: 400 }
      );
    }

    // Verificar se as credenciais estão configuradas
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.warn('Credenciais do Gmail não configuradas. Email não enviado.');
      return NextResponse.json({ 
        success: true, 
        message: 'Email não enviado (credenciais não configuradas)',
        emailSent: false 
      });
    }

    await transporter.sendMail({
      from: `"Agendamento Policial" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return NextResponse.json({ success: true, emailSent: true });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar email', details: String(error) },
      { status: 500 }
    );
  }
}
