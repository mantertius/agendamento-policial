'use client';

import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TimeSlot } from '../types';
import BookingModal from './BookingModal';

const DAYS_OF_WEEK = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function Calendar() {
  const { slots, isReady } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const slotsByDate = useMemo(() => {
    const map: Record<string, TimeSlot[]> = {};
    // Filtrar slots desativados
    const activeSlots = slots.filter(s => !s.isDisabled);
    activeSlots.forEach(slot => {
      if (!map[slot.date]) {
        map[slot.date] = [];
      }
      map[slot.date].push(slot);
    });
    // Ordenar slots por horário
    Object.keys(map).forEach(date => {
      map[date].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });
    return map;
  }, [slots]);

  const getDayStatus = (dateStr: string) => {
    const daySlots = slotsByDate[dateStr] || [];
    if (daySlots.length === 0) return 'none';
    const availableSlots = daySlots.filter(s => !s.isBooked);
    if (availableSlots.length === 0) return 'full';
    if (availableSlots.length < daySlots.length) return 'partial';
    return 'available';
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(year, month + (direction === 'next' ? 1 : -1), 1));
    setSelectedDate(null);
  };

  const formatDateStr = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const today = new Date().toISOString().split('T')[0];

  if (!isReady) {
    return (
      <div className="w-full max-w-4xl mx-auto flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-0">
      {/* Header do Calendário */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
          {MONTHS[month]} {year}
        </h2>
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dias da Semana */}
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-2">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-500 py-1 sm:py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Grid do Calendário */}
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        {/* Células vazias antes do primeiro dia */}
        {Array.from({ length: startingDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="h-14 sm:h-24 bg-gray-50 rounded-lg" />
        ))}

        {/* Dias do mês */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = formatDateStr(day);
          const status = getDayStatus(dateStr);
          const isSelected = selectedDate === dateStr;
          const isPast = dateStr < today;
          const daySlots = slotsByDate[dateStr] || [];
          const availableCount = daySlots.filter(s => !s.isBooked).length;

          return (
            <button
              key={day}
              onClick={() => !isPast && status !== 'none' && setSelectedDate(isSelected ? null : dateStr)}
              disabled={isPast || status === 'none'}
              className={`
                h-14 sm:h-24 rounded-lg p-1 sm:p-2 text-left transition-all relative
                ${isPast ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                ${status === 'none' && !isPast ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}
                ${status === 'available' && !isPast ? 'bg-green-50 hover:bg-green-100 border-2 border-green-200 cursor-pointer' : ''}
                ${status === 'partial' && !isPast ? 'bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-200 cursor-pointer' : ''}
                ${status === 'full' && !isPast ? 'bg-red-50 text-gray-500 border-2 border-red-200 cursor-not-allowed' : ''}
                ${isSelected ? 'ring-2 ring-blue-500 ring-offset-1 sm:ring-offset-2' : ''}
              `}
            >
              <span className={`text-xs sm:text-sm font-medium ${dateStr === today ? 'bg-blue-600 text-white rounded-full w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center' : ''}`}>
                {day}
              </span>
              {status !== 'none' && !isPast && (
                <div className="mt-0.5 sm:mt-1 hidden sm:block">
                  <span className={`text-xs ${status === 'full' ? 'text-red-600' : 'text-green-600'}`}>
                    {status === 'full' ? 'Lotado' : `${availableCount} vaga${availableCount !== 1 ? 's' : ''}`}
                  </span>
                </div>
              )}
              {/* Indicador mobile */}
              {status !== 'none' && !isPast && (
                <div className="sm:hidden absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className={`w-1.5 h-1.5 rounded-full ${status === 'full' ? 'bg-red-500' : status === 'partial' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Slots do dia selecionado */}
      {selectedDate && (
        <div className="mt-4 sm:mt-8 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
            Horários disponíveis - {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {(slotsByDate[selectedDate] || []).map(slot => (
              <button
                key={slot.id}
                onClick={() => !slot.isBooked && setSelectedSlot(slot)}
                disabled={slot.isBooked}
                className={`
                  p-2 sm:p-4 rounded-lg text-center transition-all
                  ${slot.isBooked 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through' 
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-200 hover:border-blue-300 cursor-pointer'
                  }
                `}
              >
                <span className="font-medium text-sm sm:text-base">{slot.startTime}</span>
                <span className="text-gray-400 mx-0.5 sm:mx-1 text-sm">-</span>
                <span className="font-medium text-sm sm:text-base">{slot.endTime}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Legenda */}
      <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-4 justify-center text-xs sm:text-sm">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-green-200 border border-green-300"></div>
          <span className="text-gray-600">Disponível</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-yellow-200 border border-yellow-300"></div>
          <span className="text-gray-600">Parcial</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-red-200 border border-red-300"></div>
          <span className="text-gray-600">Lotado</span>
        </div>
      </div>

      {/* Modal de Agendamento */}
      {selectedSlot && (
        <BookingModal 
          slot={selectedSlot} 
          onClose={() => setSelectedSlot(null)} 
        />
      )}
    </div>
  );
}
