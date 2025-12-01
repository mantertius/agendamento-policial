'use client';

import { useState } from 'react';
import { TimeSlot } from '../types';
import { useApp } from '../context/AppContext';

interface BookingModalProps {
  slot: TimeSlot;
  onClose: () => void;
}

interface BookingData {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}

export default function BookingModal({ slot, onClose }: BookingModalProps) {
  const { addBooking } = useApp();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingData | null>(null);
  const [emailStatus, setEmailStatus] = useState<'pending' | 'sent' | 'failed' | null>(null);
  
  const telefoneContato = process.env.NEXT_PUBLIC_TELEFONE_CONTATO || '(82) 3315-7917';
  const endereco = process.env.NEXT_PUBLIC_ENDERECO || 'Av. Norma Pimentel Costa s/nº, Benedito Bentes, Maceió - Alagoas';
  const emailContato = process.env.NEXT_PUBLIC_EMAIL_CONTATO || '8dp@pc.al.gov.br';

  const generateEmailHtml = (booking: BookingData) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Comprovante de Agendamento</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; border-bottom: 2px solid #1e40af; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="margin: 0; color: #1e40af;">🛡️ Agendamento Policial</h1>
            <p style="margin: 5px 0 0; color: #666;">Comprovante de Agendamento</p>
          </div>

          <div style="background: #dbeafe; border: 2px solid #1e40af; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <p style="margin: 0; color: #1e3a8a; font-weight: bold; text-align: center;">📍 Este agendamento é válido apenas para:</p>
            <ul style="margin: 10px 0 0; color: #1e3a8a; padding-left: 20px;">
              <li><strong>8º Distrito Policial da Capital</strong></li>
              <li><strong>21º Distrito Policial da Capital</strong></li>
            </ul>
          </div>
          
          <div style="background: #f0f9ff; border: 2px solid #1e40af; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
            <div style="font-size: 18px; font-weight: bold; color: #1e40af;">${formatDate(booking.date)}</div>
            <div style="font-size: 24px; font-weight: bold; color: #333; margin-top: 10px;">${booking.startTime} - ${booking.endTime}</div>
          </div>

          <div style="margin-bottom: 25px;">
            <div style="font-weight: bold; color: #333; margin-bottom: 10px; font-size: 14px; text-transform: uppercase;">Dados do Agendamento</div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Nome:</td>
                <td style="padding: 8px 0; color: #333;">${booking.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">CPF:</td>
                <td style="padding: 8px 0; color: #333;">${booking.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Telefone:</td>
                <td style="padding: 8px 0; color: #333;">${booking.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">E-mail:</td>
                <td style="padding: 8px 0; color: #333;">${booking.email}</td>
              </tr>
              ${booking.description ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Descrição:</td>
                <td style="padding: 8px 0; color: #333;">${booking.description}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Código:</td>
                <td style="padding: 8px 0; color: #333; font-family: monospace;">${booking.id}</td>
              </tr>
            </table>
          </div>

          <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin-top: 30px;">
            <h3 style="color: #b45309; margin: 0 0 10px 0; font-size: 14px;">⚠️ IMPORTANTE - LEVE NO DIA DO ATENDIMENTO:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #92400e;">
              <li style="margin-bottom: 8px;"><strong>Documento de identificação com foto</strong> (RG, CNH ou outro documento oficial)</li>
              <li style="margin-bottom: 8px;"><strong>Provas e evidências relacionadas ao relato:</strong>
                <ul style="margin-top: 5px;">
                  <li>Mensagens de texto (prints de WhatsApp, SMS, etc.)</li>
                  <li>Áudios e vídeos relevantes</li>
                  <li>Fotos e imagens</li>
                  <li>Documentos e artefatos relacionados</li>
                </ul>
              </li>
            </ul>
          </div>

          <div style="margin-top: 40px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px;">
            <p style="margin-bottom: 10px;"><strong>📍 Endereço:</strong> ${endereco}</p>
            <p><strong>📞 Telefone:</strong> ${telefoneContato} | <strong>📧 E-mail:</strong> ${emailContato}</p>
            <p style="margin-top: 15px; font-size: 11px;">Agendamento realizado em: ${new Date(booking.createdAt).toLocaleString('pt-BR')}</p>
            <p style="font-size: 11px;">Em caso de necessidade de cancelamento ou dúvidas, entre em contato conosco.</p>
          </div>
        </body>
      </html>
    `;
  };

  const sendConfirmationEmail = async (booking: BookingData) => {
    try {
      setEmailStatus('pending');
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: booking.email,
          subject: `Confirmação de Agendamento - ${formatDate(booking.date)} às ${booking.startTime}`,
          html: generateEmailHtml(booking),
        }),
      });

      const result = await response.json();
      if (result.success && result.emailSent) {
        setEmailStatus('sent');
      } else {
        setEmailStatus('failed');
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setEmailStatus('failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Nome é obrigatório');
      return;
    }

    if (!cpf.trim()) {
      setError('CPF é obrigatório');
      return;
    }

    // Validar formato de CPF (apenas números, 11 dígitos)
    const cpfClean = cpf.replace(/\D/g, '');
    if (cpfClean.length !== 11) {
      setError('CPF inválido. Digite os 11 dígitos.');
      return;
    }

    // Validar se todos os dígitos são iguais (CPF inválido)
    if (/^(\d)\1{10}$/.test(cpfClean)) {
      setError('CPF inválido.');
      return;
    }

    // Validar dígitos verificadores do CPF
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfClean.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfClean.charAt(9))) {
      setError('CPF inválido.');
      return;
    }
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfClean.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfClean.charAt(10))) {
      setError('CPF inválido.');
      return;
    }

    if (!phone.trim()) {
      setError('Celular é obrigatório');
      return;
    }

    // Validar formato de celular brasileiro (11 dígitos: DDD + 9 + 8 dígitos)
    const phoneClean = phone.replace(/\D/g, '');
    if (!/^[1-9]{2}9[0-9]{8}$/.test(phoneClean)) {
      setError('Celular inválido. Use o formato (XX) 9XXXX-XXXX');
      return;
    }

    if (!email.trim()) {
      setError('E-mail é obrigatório');
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('E-mail inválido');
      return;
    }

    setIsSubmitting(true);

    try {
      const booking = {
        id: '', // Será gerado pelo servidor
        slotId: slot.id,
        name: name.trim(),
        cpf: cpf.replace(/\D/g, ''),
        phone: phone.replace(/\D/g, ''),
        email: email.trim(),
        description: description.trim() || undefined,
        createdAt: new Date().toISOString(),
      };

      const savedBooking = await addBooking(booking);
      if (savedBooking) {
        const bookingData: BookingData = {
          ...savedBooking,
          cpf: savedBooking.cpf || '',
          phone: savedBooking.phone || '',
          email: savedBooking.email || '',
          date: slot.date,
          startTime: slot.startTime,
          endTime: slot.endTime,
        };
        
        // Mostrar tela de confirmação
        setConfirmedBooking(bookingData);
        
        // Enviar email de confirmação
        sendConfirmationEmail(bookingData);
      } else {
        setError('Erro ao fazer agendamento. Tente novamente.');
      }
    } catch {
      setError('Erro ao fazer agendamento. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCpf = (cpf: string) => {
    const cleaned = cpf.replace(/\D/g, '');
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  };

  const handlePrint = () => {
    if (!confirmedBooking) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const cpfHtml = confirmedBooking.cpf ? `<div class="info-row"><span class="info-label">CPF:</span><span class="info-value">${formatCpf(confirmedBooking.cpf)}</span></div>` : '';
    const phoneHtml = confirmedBooking.phone ? `<div class="info-row"><span class="info-label">Telefone:</span><span class="info-value">${formatPhone(confirmedBooking.phone)}</span></div>` : '';
    const emailHtml = confirmedBooking.email ? `<div class="info-row"><span class="info-label">E-mail:</span><span class="info-value">${confirmedBooking.email}</span></div>` : '';
    const descHtml = confirmedBooking.description ? `<div class="info-row"><span class="info-label">Descrição:</span><span class="info-value">${confirmedBooking.description}</span></div>` : '';

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Comprovante de Agendamento</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              max-width: 600px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0;
              color: #1e40af;
            }
            .header p {
              margin: 5px 0 0;
              color: #666;
            }
            .section {
              margin-bottom: 25px;
            }
            .section-title {
              font-weight: bold;
              color: #333;
              margin-bottom: 10px;
              font-size: 14px;
              text-transform: uppercase;
            }
            .info-row {
              display: flex;
              margin-bottom: 8px;
            }
            .info-label {
              font-weight: bold;
              width: 120px;
              color: #555;
            }
            .info-value {
              color: #333;
            }
            .highlight-box {
              background: #f0f9ff;
              border: 2px solid #1e40af;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              margin-bottom: 30px;
            }
            .highlight-box .date {
              font-size: 18px;
              font-weight: bold;
              color: #1e40af;
            }
            .highlight-box .time {
              font-size: 24px;
              font-weight: bold;
              color: #333;
              margin-top: 10px;
            }
            .warning-box {
              background: #fef3c7;
              border: 1px solid #f59e0b;
              border-radius: 8px;
              padding: 15px;
              margin-top: 30px;
            }
            .warning-box h3 {
              color: #b45309;
              margin: 0 0 10px 0;
              font-size: 14px;
            }
            .warning-box ul {
              margin: 0;
              padding-left: 20px;
              color: #92400e;
            }
            .warning-box li {
              margin-bottom: 8px;
            }
            .warning-box ul ul {
              margin-top: 5px;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #666;
              font-size: 12px;
              border-top: 1px solid #ddd;
              padding-top: 20px;
            }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🛡️ Agendamento Policial</h1>
            <p>Comprovante de Agendamento</p>
          </div>

          <div style="background: #dbeafe; border: 2px solid #1e40af; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <p style="margin: 0; color: #1e3a8a; font-weight: bold; text-align: center;">📍 Este agendamento é válido apenas para:</p>
            <ul style="margin: 10px 0 0; color: #1e3a8a; padding-left: 20px;">
              <li><strong>8º Distrito Policial da Capital</strong></li>
              <li><strong>21º Distrito Policial da Capital</strong></li>
            </ul>
          </div>
          
          <div class="highlight-box">
            <div class="date">${formatDate(confirmedBooking.date)}</div>
            <div class="time">${confirmedBooking.startTime} - ${confirmedBooking.endTime}</div>
          </div>

          <div class="section">
            <div class="section-title">Dados do Agendamento</div>
            <div class="info-row">
              <span class="info-label">Nome:</span>
              <span class="info-value">${confirmedBooking.name}</span>
            </div>
            ${cpfHtml}
            ${phoneHtml}
            ${emailHtml}
            ${descHtml}
            <div class="info-row">
              <span class="info-label">Código:</span>
              <span class="info-value">${confirmedBooking.id}</span>
            </div>
          </div>

          <div class="warning-box">
            <h3>⚠️ IMPORTANTE - LEVE NO DIA DO ATENDIMENTO:</h3>
            <ul>
              <li><strong>Documento de identificação com foto</strong> (RG, CNH ou outro documento oficial)</li>
              <li><strong>Provas e evidências relacionadas ao relato:</strong>
                <ul>
                  <li>Mensagens de texto (prints de WhatsApp, SMS, etc.)</li>
                  <li>Áudios e vídeos relevantes</li>
                  <li>Fotos e imagens</li>
                  <li>Documentos e artefatos relacionados</li>
                </ul>
              </li>
            </ul>
          </div>

          <div class="footer">
            <p style="margin-bottom: 10px;"><strong>📍 Endereço:</strong> ${endereco}</p>
            <p><strong>📞 Telefone:</strong> ${telefoneContato} | <strong>📧 E-mail:</strong> ${emailContato}</p>
            <p style="margin-top: 15px;">Agendamento realizado em: ${new Date(confirmedBooking.createdAt).toLocaleString('pt-BR')}</p>
            <p>Em caso de necessidade de cancelamento ou dúvidas, entre em contato conosco.</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Tela de confirmação após agendamento
  if (confirmedBooking) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
        <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg overflow-hidden max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
          {/* Header de Sucesso */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 sm:p-6 text-white sticky top-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Agendamento Confirmado!</h2>
                <p className="text-green-100 text-sm">Seu atendimento foi agendado com sucesso</p>
              </div>
            </div>
          </div>

          {/* Resumo na Tela */}
          <div className="p-4 sm:p-6 space-y-4">
            {/* Aviso de Distritos */}
            <div className="bg-blue-100 border-2 border-blue-400 rounded-xl p-4">
              <p className="text-blue-800 font-bold text-center mb-2 flex items-center justify-center gap-2">
                <span>📍</span> Este agendamento é válido apenas para:
              </p>
              <ul className="text-blue-900 text-sm space-y-1 ml-4">
                <li><strong>• 8º Distrito Policial da Capital</strong></li>
                <li><strong>• 21º Distrito Policial da Capital</strong></li>
              </ul>
            </div>

            {/* Box com Data e Horário */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
              <p className="text-blue-800 font-medium">{formatDate(confirmedBooking.date)}</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">
                {confirmedBooking.startTime} - {confirmedBooking.endTime}
              </p>
            </div>

            {/* Dados do Agendamento */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800 text-sm uppercase">Seus Dados</h3>
              <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-sm">
                <p><span className="font-medium text-gray-600">Nome:</span> {confirmedBooking.name}</p>
                {confirmedBooking.cpf && (
                  <p><span className="font-medium text-gray-600">CPF:</span> {formatCpf(confirmedBooking.cpf)}</p>
                )}
                {confirmedBooking.phone && (
                  <p><span className="font-medium text-gray-600">Telefone:</span> {formatPhone(confirmedBooking.phone)}</p>
                )}
                {confirmedBooking.email && (
                  <p><span className="font-medium text-gray-600">E-mail:</span> {confirmedBooking.email}</p>
                )}
                {confirmedBooking.description && (
                  <p><span className="font-medium text-gray-600">Descrição:</span> {confirmedBooking.description}</p>
                )}
              </div>
            </div>

            {/* Avisos Importantes */}
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4">
              <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Importante - Leve no dia:
              </h3>
              <ul className="text-amber-900 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">📄</span>
                  <span><strong>Documento de identificação com foto</strong> (RG, CNH ou outro documento oficial)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">📱</span>
                  <span><strong>Mensagens de texto</strong> (prints de WhatsApp, SMS, redes sociais)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">🎵</span>
                  <span><strong>Áudios e vídeos</strong> relevantes ao caso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">📷</span>
                  <span><strong>Fotos e imagens</strong> relacionadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">📁</span>
                  <span><strong>Documentos e artefatos</strong> que comprovem o relato</span>
                </li>
              </ul>
            </div>

            {/* Código do Agendamento e Contatos */}
            <div className="text-center text-xs text-gray-500 space-y-2 bg-gray-50 rounded-lg p-3">
              <p className="text-gray-700"><strong>📍 Endereço:</strong> {endereco}</p>
              <p><strong>📞</strong> {telefoneContato} | <strong>📧</strong> {emailContato}</p>
              <p className="pt-1 border-t border-gray-200">Código: <span className="font-mono">{confirmedBooking.id}</span></p>
            </div>

            {/* Status do Email */}
            <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
              emailStatus === 'pending' ? 'bg-blue-50 text-blue-700' :
              emailStatus === 'sent' ? 'bg-green-50 text-green-700' :
              emailStatus === 'failed' ? 'bg-red-50 text-red-700' :
              'bg-gray-50 text-gray-600'
            }`}>
              {emailStatus === 'pending' && (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Enviando comprovante para {confirmedBooking.email}...</span>
                </>
              )}
              {emailStatus === 'sent' && (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Comprovante enviado para {confirmedBooking.email}</span>
                </>
              )}
              {emailStatus === 'failed' && (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Não foi possível enviar o email. Use o botão Imprimir.</span>
                </>
              )}
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Imprimir
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md overflow-hidden max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 sm:p-6 text-white sticky top-0 z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-base sm:text-xl font-semibold">Agendar Atendimento</h2>
              <p className="mt-0.5 sm:mt-1 text-blue-100 text-xs sm:text-sm">{formatDate(slot.date)}</p>
              <p className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">
                {slot.startTime} - {slot.endTime}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-6 space-y-3">
          {/* Aviso Legal - Art. 299 CP */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 sm:p-3 text-xs text-red-800">
            <p className="font-bold flex items-center gap-1 mb-1">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Art. 299 do Código Penal
            </p>
            <p className="text-red-700 leading-snug text-[11px] sm:text-xs">
              Inserir declaração falsa em documento: <strong>Pena - reclusão de 1 a 5 anos, e multa.</strong>
            </p>
          </div>

          {error && (
            <div className="p-2.5 sm:p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Por favor, preencha este campo.')}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-base"
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CPF <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 11) {
                  const formatted = value
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                  setCpf(formatted);
                }
              }}
              onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Por favor, preencha este campo.')}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-base"
              placeholder="000.000.000-00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Celular <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 11) {
                  let formatted = value;
                  if (value.length > 0) {
                    formatted = '(' + value.substring(0, 2);
                    if (value.length > 2) {
                      formatted += ') ' + value.substring(2, 7);
                    }
                    if (value.length > 7) {
                      formatted += '-' + value.substring(7, 11);
                    }
                  }
                  setPhone(formatted);
                }
              }}
              onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Por favor, preencha este campo.')}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-base"
              placeholder="(82) 99999-9999"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onInvalid={(e) => {
                const input = e.target as HTMLInputElement;
                if (input.validity.valueMissing) {
                  input.setCustomValidity('Por favor, preencha este campo.');
                } else if (input.validity.typeMismatch) {
                  input.setCustomValidity('Por favor, insira um endereço de e-mail válido.');
                }
              }}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-base"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição breve <span className="text-gray-400">(opcional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none text-base"
              placeholder="Motivo do atendimento..."
            />
          </div>

          <div className="flex gap-2 sm:gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-3 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Agendando...
                </>
              ) : (
                'Confirmar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
