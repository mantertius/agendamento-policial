'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '../context/AppContext';

export default function RelatorioPage() {
  const { bookings, slots } = useApp();
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const endereco = process.env.NEXT_PUBLIC_ENDERECO || 'Av. Norma Pimentel Costa s/nº, Benedito Bentes, Maceió - Alagoas';
  const telefone = process.env.NEXT_PUBLIC_TELEFONE_CONTATO || '(82) 3315-7917';
  const email = process.env.NEXT_PUBLIC_EMAIL_CONTATO || '8dp@pc.al.gov.br';

  // Filtrar agendamentos do dia selecionado
  const dailyBookings = bookings.filter(booking => {
    const slot = slots.find(s => s.id === booking.slotId);
    return slot?.date === selectedDate;
  });

  // Ordenar por horário
  const sortedBookings = [...dailyBookings].sort((a, b) => {
    const slotA = slots.find(s => s.id === a.slotId);
    const slotB = slots.find(s => s.id === b.slotId);
    if (!slotA || !slotB) return 0;
    return slotA.startTime.localeCompare(slotB.startTime);
  });

  const getSlotInfo = (slotId: string) => {
    return slots.find(s => s.id === slotId);
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today.toISOString().split('T')[0]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Controles - não aparecem na impressão */}
      <div className="print:hidden bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin" 
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Relatório de Atendimento Diário</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={goToToday}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Hoje
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Imprimir
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo do Relatório */}
      <div className="max-w-4xl mx-auto p-4 sm:p-8 print:p-0 print:max-w-none">
        <div className="bg-white rounded-xl shadow-lg print:shadow-none print:rounded-none">
          {/* Cabeçalho do Relatório */}
          <div className="p-6 border-b-2 border-blue-800 print:border-b-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 print:w-20 print:h-20">
                  <Image 
                    src="/logo.png" 
                    alt="Polícia Civil AL" 
                    width={80} 
                    height={80} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-blue-800">POLÍCIA CIVIL DE ALAGOAS</h1>
                  <p className="text-gray-600 text-sm">8º e 21º Distrito Policial da Capital</p>
                </div>
              </div>
              <div className="text-right text-xs text-gray-500 hidden sm:block print:block">
                <p>{endereco}</p>
                <p>Tel: {telefone} | {email}</p>
              </div>
            </div>
          </div>

          {/* Título do Relatório */}
          <div className="p-6 bg-blue-50 print:bg-blue-50 border-b">
            <h2 className="text-center text-xl sm:text-2xl font-bold text-blue-900">
              RELATÓRIO DE ATENDIMENTO DIÁRIO
            </h2>
            <p className="text-center text-lg text-blue-700 mt-2 capitalize">
              {formatDate(selectedDate)}
            </p>
            <p className="text-center text-sm text-gray-600 mt-1">
              Total de atendimentos: <span className="font-bold">{sortedBookings.length}</span>
            </p>
          </div>

          {/* Tabela de Atendimentos */}
          <div className="p-4 sm:p-6">
            {sortedBookings.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 print:bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700 w-8">#</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700 w-24">Horário</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700">Nome</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700 w-32 hidden sm:table-cell print:table-cell">CPF</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700 w-32 hidden sm:table-cell print:table-cell">Telefone</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700 w-20 print:w-24">Compareceu</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700 hidden print:table-cell">Observações</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedBookings.map((booking, index) => {
                    const slot = getSlotInfo(booking.slotId);
                    return (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-3 text-sm text-gray-600">{index + 1}</td>
                        <td className="border border-gray-300 px-3 py-3 text-sm font-medium text-gray-800">
                          {slot ? `${slot.startTime} - ${slot.endTime}` : '-'}
                        </td>
                        <td className="border border-gray-300 px-3 py-3 text-sm text-gray-800">
                          <div className="font-medium">{booking.name}</div>
                          {booking.description && (
                            <div className="text-xs text-gray-500 mt-1 print:text-gray-600">
                              {booking.description}
                            </div>
                          )}
                        </td>
                        <td className="border border-gray-300 px-3 py-3 text-sm text-gray-600 hidden sm:table-cell print:table-cell">
                          {booking.cpf ? booking.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '-'}
                        </td>
                        <td className="border border-gray-300 px-3 py-3 text-sm text-gray-600 hidden sm:table-cell print:table-cell">
                          {booking.phone ? booking.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') : '-'}
                        </td>
                        <td className="border border-gray-300 px-3 py-3 text-center">
                          <div className="w-5 h-5 border-2 border-gray-400 mx-auto print:border-gray-600"></div>
                        </td>
                        <td className="border border-gray-300 px-3 py-3 hidden print:table-cell">
                          {/* Espaço para anotações manuais */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 text-lg">Nenhum atendimento agendado para esta data</p>
              </div>
            )}
          </div>

          {/* Rodapé do Relatório - apenas na impressão */}
          <div className="hidden print:block border-t-2 border-gray-300 p-6 mt-4">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-gray-600 mb-12">Responsável pelo atendimento:</p>
                <div className="border-t border-gray-400 pt-2">
                  <p className="text-sm text-gray-600">Assinatura / Matrícula</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-12">Visto da chefia:</p>
                <div className="border-t border-gray-400 pt-2">
                  <p className="text-sm text-gray-600">Assinatura / Carimbo</p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center text-xs text-gray-500">
              <p>Relatório gerado em: {new Date().toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos de impressão */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 1cm;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:block {
            display: block !important;
          }
          
          .print\\:table-cell {
            display: table-cell !important;
          }
          
          .print\\:bg-blue-50 {
            background-color: #eff6ff !important;
          }
          
          .print\\:bg-gray-100 {
            background-color: #f3f4f6 !important;
          }
        }
      `}</style>
    </div>
  );
}
