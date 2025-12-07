'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { AvailabilityConfig, Booking } from '../types';
import { getHolidaysForYear, FIXED_HOLIDAYS, isHoliday } from '../utils/holidays';

// Buscar senha administrativa de .env.local (exportar como NEXT_PUBLIC_ADMIN_PASSWORD para uso no cliente)
// Atenção: expor senhas no cliente não é inseguro — prefira validar no servidor (API) em produção.
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'admin123';

const DAYS_OF_WEEK = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Segunda-feira' },
  { value: 2, label: 'Terça-feira' },
  { value: 3, label: 'Quarta-feira' },
  { value: 4, label: 'Quinta-feira' },
  { value: 5, label: 'Sexta-feira' },
  { value: 6, label: 'Sábado' },
];

const DAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Verificar autenticação no cliente
function getInitialAuth(): boolean {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('admin-auth') === 'true';
  }
  return false;
}

export default function AdminPage() {
  const { 
    slots, 
    bookings, 
    availabilityConfigs, 
    addAvailabilityConfig, 
    removeAvailabilityConfig,
    generateSlotsFromConfig,
    cancelBooking,
    moveToPool,
    cancelDay,
    reallocateBooking,
    disableSlot,
    reactivateSlot,
    clearAllSlots
  } = useApp();

  const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuth);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<'config' | 'bookings' | 'calendar' | 'holidays' | 'reallocation' | 'internal'>('config');
  const [selectedDateView, setSelectedDateView] = useState<string | null>(null);
  const [filterView, setFilterView] = useState<'all' | 'booked' | 'available' | 'disabled'>('all');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [reallocationBooking, setReallocationBooking] = useState<Booking | null>(null); // Booking sendo realocado

  // Internal Booking State
  const [internalDate, setInternalDate] = useState('');
  const [internalStartTime, setInternalStartTime] = useState('');
  const [internalEndTime, setInternalEndTime] = useState('');
  const [internalName, setInternalName] = useState('');
  const [internalEmail, setInternalEmail] = useState('');
  const [internalPhone, setInternalPhone] = useState('');
  const [internalCpf, setInternalCpf] = useState('');
  const [internalDescription, setInternalDescription] = useState('');
  const [internalLoading, setInternalLoading] = useState(false);

  const holidaysMap = useMemo(() => {
    const year = calendarDate.getFullYear();
    const holidays = getHolidaysForYear(year);
    const map: Record<string, { name: string; type: string }> = {};
    holidays.forEach(h => {
      map[h.date] = { name: h.name, type: h.type };
    });
    return map;
  }, [calendarDate]);

  // Form state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');
  const [slotDuration, setSlotDuration] = useState(30);
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [lunchBreakEnabled, setLunchBreakEnabled] = useState(false);
  const [lunchBreakStart, setLunchBreakStart] = useState('12:00');
  const [lunchBreakDuration, setLunchBreakDuration] = useState(60);
  const [vacationMonths, setVacationMonths] = useState<number[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin-auth', 'true');
      setPasswordError('');
    } else {
      setPasswordError('Senha incorreta');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin-auth');
    setPassword('');
  };

  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day].sort()
    );
  };

  const toggleVacationMonth = (month: number) => {
    setVacationMonths(prev => 
      prev.includes(month) 
        ? prev.filter(m => m !== month)
        : [...prev, month].sort((a, b) => a - b)
    );
  };

  const handleCreateConfig = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate || selectedDays.length === 0) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const config: AvailabilityConfig = {
      id: `config-${Date.now()}`,
      startDate,
      endDate,
      startTime,
      endTime,
      slotDuration,
      daysOfWeek: selectedDays,
      lunchBreakEnabled,
      lunchBreakStart: lunchBreakEnabled ? lunchBreakStart : undefined,
      lunchBreakDuration: lunchBreakEnabled ? lunchBreakDuration : undefined,
      vacationMonths: vacationMonths.length > 0 ? vacationMonths : undefined,
    };

    addAvailabilityConfig(config);
    generateSlotsFromConfig(config);

    // Reset form
    setStartDate('');
    setEndDate('');
    setStartTime('08:00');
    setEndTime('17:00');
    setSlotDuration(30);
    setSelectedDays([1, 2, 3, 4, 5]);
    setLunchBreakEnabled(false);
    setLunchBreakStart('12:00');
    setLunchBreakDuration(60);
    setVacationMonths([]);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR');
  };

  const handleInternalBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setInternalLoading(true);

    try {
      const response = await fetch('/api/bookings/internal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: internalDate,
          startTime: internalStartTime,
          endTime: internalEndTime,
          name: internalName,
          email: internalEmail,
          phone: internalPhone,
          cpf: internalCpf,
          description: internalDescription
        })
      });

      if (response.ok) {
        alert('Agendamento interno criado com sucesso!');
        setInternalDate('');
        setInternalStartTime('');
        setInternalEndTime('');
        setInternalName('');
        setInternalEmail('');
        setInternalPhone('');
        setInternalCpf('');
        setInternalDescription('');
        window.location.reload();
      } else {
        const data = await response.json();
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao criar agendamento');
    } finally {
      setInternalLoading(false);
    }
  };

  // Tela de Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Área Administrativa</h1>
            <p className="text-gray-500 mt-2">Digite a senha para acessar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {passwordError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {passwordError}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Digite a senha"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Painel Administrativo
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <div className="flex justify-between items-center mb-4 sm:mb-8">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800">Painel Administrativo</h1>
        <button
          onClick={handleLogout}
          className="px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Sair
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-4 sm:mb-8">
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:gap-4 text-center sm:text-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2 sm:mb-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Total Slots</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-800">{slots.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:gap-4 text-center sm:text-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2 sm:mb-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Disponíveis</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-800">{slots.filter(s => !s.isBooked && !s.isDisabled).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:gap-4 text-center sm:text-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2 sm:mb-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Agendados</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-800">{bookings.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex min-w-max">
            <button
              onClick={() => setActiveTab('config')}
              className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'config'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Configurar
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'calendar'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Visualizar Agenda
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'bookings'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Agendamentos ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('holidays')}
              className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'holidays'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Feriados
            </button>
            <button
              onClick={() => setActiveTab('reallocation')}
              className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'reallocation'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Realocação ({bookings.filter(b => b.status === 'pending_reallocation').length})
            </button>
            <button
              onClick={() => setActiveTab('internal')}
              className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'internal'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Agendamento Interno
            </button>
            <Link
              href="/relatorio"
              className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap text-gray-500 hover:text-gray-700 flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Relatório Diário
            </Link>
          </nav>
        </div>

        <div className="p-3 sm:p-6">
          {activeTab === 'config' ? (
            <div className="space-y-8">
              {/* Formulário de configuração */}
              <form onSubmit={handleCreateConfig} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data Inicial
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data Final
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Horário Inicial
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Horário Final
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duração do Slot (min)
                    </label>
                    <select
                      value={slotDuration}
                      onChange={(e) => setSlotDuration(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value={15}>15 minutos</option>
                      <option value={30}>30 minutos</option>
                      <option value={45}>45 minutos</option>
                      <option value={60}>1 hora</option>
                      <option value={90}>1h 30min</option>
                      <option value={120}>2 horas</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Dias da Semana
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS_OF_WEEK.map(day => (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => toggleDay(day.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedDays.includes(day.value)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Configuração de Horário de Almoço */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={lunchBreakEnabled}
                        onChange={(e) => setLunchBreakEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <span className="text-sm font-medium text-gray-700">
                      Incluir Horário de Almoço
                    </span>
                  </div>

                  {lunchBreakEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Início do Almoço
                        </label>
                        <input
                          type="time"
                          value={lunchBreakStart}
                          onChange={(e) => setLunchBreakStart(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duração do Almoço
                        </label>
                        <select
                          value={lunchBreakDuration}
                          onChange={(e) => setLunchBreakDuration(Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        >
                          <option value={30}>30 minutos</option>
                          <option value={45}>45 minutos</option>
                          <option value={60}>1 hora</option>
                          <option value={90}>1h 30min</option>
                          <option value={120}>2 horas</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-xs text-orange-700">
                          Os slots que caírem dentro do horário de almoço ({lunchBreakStart} - {
                            (() => {
                              const [h, m] = lunchBreakStart.split(':').map(Number);
                              const totalMin = h * 60 + m + lunchBreakDuration;
                              const endH = Math.floor(totalMin / 60);
                              const endM = totalMin % 60;
                              return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
                            })()
                          }) não serão criados.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Configuração de Meses de Férias */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                        </svg>
                        Meses de Férias (sem atendimento)
                      </span>
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Selecione os meses em que não haverá atendimento. Nenhum slot será criado nesses meses.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {MONTHS.map((month, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => toggleVacationMonth(index + 1)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            vacationMonths.includes(index + 1)
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {month.substring(0, 3)}
                        </button>
                      ))}
                    </div>
                    {vacationMonths.length > 0 && (
                      <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-xs text-purple-700">
                          🏖️ Meses de férias selecionados: {vacationMonths.map(m => MONTHS[m - 1]).join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Criar Disponibilidade
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Tem certeza que deseja limpar todos os slots e agendamentos?')) {
                        clearAllSlots();
                      }
                    }}
                    className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                  >
                    Limpar Todos os Slots
                  </button>
                </div>
              </form>

              {/* Lista de configurações */}
              {availabilityConfigs.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Configurações Ativas</h3>
                  <div className="space-y-3">
                    {availabilityConfigs.map(config => (
                      <div key={config.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">
                            {formatDate(config.startDate)} - {formatDate(config.endDate)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {config.startTime} às {config.endTime} | {config.slotDuration}min por slot
                          </p>
                          <p className="text-sm text-gray-500">
                            {config.daysOfWeek.map(d => DAYS_OF_WEEK.find(day => day.value === d)?.label).join(', ')}
                          </p>
                          {config.lunchBreakEnabled && config.lunchBreakStart && config.lunchBreakDuration && (
                            <p className="text-sm text-orange-600">
                              🍽️ Almoço: {config.lunchBreakStart} ({config.lunchBreakDuration}min)
                            </p>
                          )}
                          {config.vacationMonths && config.vacationMonths.length > 0 && (
                            <p className="text-sm text-purple-600">
                              🏖️ Férias: {config.vacationMonths.map(m => MONTHS[m - 1]).join(', ')}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeAvailabilityConfig(config.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === 'calendar' ? (
            /* Visualização de Calendário da Agenda */
            <div className="space-y-4 sm:space-y-6">
              {/* Filtros */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-full sm:w-auto">
                  <span className="text-xs sm:text-sm text-gray-600 block sm:inline mb-1 sm:mb-0 sm:mr-2">Filtrar:</span>
                  <div className="flex rounded-lg overflow-hidden border border-gray-300">
                    <button
                      onClick={() => setFilterView('all')}
                      className={`flex-1 sm:flex-none px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors ${
                        filterView === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Todos
                    </button>
                    <button
                      onClick={() => setFilterView('booked')}
                      className={`flex-1 sm:flex-none px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors border-l border-gray-300 ${
                        filterView === 'booked' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Agendados
                    </button>
                    <button
                      onClick={() => setFilterView('available')}
                      className={`flex-1 sm:flex-none px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors border-l border-gray-300 ${
                        filterView === 'available' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Livres
                    </button>
                    <button
                      onClick={() => setFilterView('disabled')}
                      className={`flex-1 sm:flex-none px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors border-l border-gray-300 ${
                        filterView === 'disabled' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Off
                    </button>
                  </div>
                </div>

                {/* Navegação do mês */}
                <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto justify-center">
                  <button
                    onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-sm sm:text-lg font-semibold text-gray-800 min-w-[130px] sm:min-w-[180px] text-center">
                    {MONTHS[calendarDate.getMonth()]} {calendarDate.getFullYear()}
                  </span>
                  <button
                    onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Calendário compacto */}
              <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-4">
                {DAYS_SHORT.map(day => (
                  <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-500 py-1 sm:py-2">
                    {day}
                  </div>
                ))}
                {(() => {
                  const year = calendarDate.getFullYear();
                  const month = calendarDate.getMonth();
                  const firstDay = new Date(year, month, 1).getDay();
                  const daysInMonth = new Date(year, month + 1, 0).getDate();
                  const today = new Date().toISOString().split('T')[0];
                  
                  const cells = [];
                  
                  // Células vazias antes do primeiro dia
                  for (let i = 0; i < firstDay; i++) {
                    cells.push(<div key={`empty-${i}`} className="h-8 sm:h-10" />);
                  }
                  
                  // Dias do mês
                  for (let day = 1; day <= daysInMonth; day++) {
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const daySlots = slots.filter(s => s.date === dateStr);
                    const bookedCount = daySlots.filter(s => s.isBooked).length;
                    const hasSlots = daySlots.length > 0;
                    const isSelected = selectedDateView === dateStr;
                    const isToday = dateStr === today;
                    
                    // Verificar se é feriado
                    const holidayInfo = holidaysMap[dateStr];
                    const isHolidayDate = !!holidayInfo;
                    const holidayName = holidayInfo?.name;
                    
                    cells.push(
                      <button
                        key={day}
                        onClick={() => setSelectedDateView(isSelected ? null : dateStr)}
                        title={isHolidayDate ? `🎉 ${holidayName}` : undefined}
                        className={`h-8 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-all relative ${
                          isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                        } ${
                          isHolidayDate
                            ? 'bg-purple-200 text-purple-800 hover:bg-purple-300 border border-purple-400'
                            : hasSlots
                            ? bookedCount > 0
                              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'text-gray-400 hover:bg-gray-50'
                        } ${isToday ? 'font-bold' : ''}`}
                      >
                        {day}
                        {isHolidayDate && (
                          <span className="absolute -top-1 -right-1 text-[10px]">🎉</span>
                        )}
                        {bookedCount > 0 && !isHolidayDate && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-purple-600 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center">
                            {bookedCount}
                          </span>
                        )}
                      </button>
                    );
                  }
                  
                  return cells;
                })()}
              </div>

              {/* Lista de slots do dia selecionado ou todos os agendados */}
              <div className="border-t border-gray-200 pt-4 sm:pt-6">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {selectedDateView
                      ? `Horários de ${formatDate(selectedDateView)}`
                      : filterView === 'booked'
                      ? 'Todos os Agendamentos'
                      : filterView === 'available'
                      ? 'Horários Disponíveis'
                      : filterView === 'disabled'
                      ? 'Horários Desativados'
                      : 'Todos os Horários'}
                  </h3>
                  {selectedDateView && (
                    <button
                      onClick={() => {
                        if (confirm(`ATENÇÃO: Isso cancelará TODOS os agendamentos do dia ${formatDate(selectedDateView)} e enviará emails de aviso para realocação. Deseja continuar?`)) {
                          cancelDay(selectedDateView);
                        }
                      }}
                      className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs sm:text-sm font-medium"
                    >
                      Cancelar Dia Inteiro
                    </button>
                  )}
                </div>
                
                {(() => {
                  let filteredSlots = selectedDateView
                    ? slots.filter(s => s.date === selectedDateView)
                    : slots;
                  
                  if (filterView === 'booked') {
                    filteredSlots = filteredSlots.filter(s => s.isBooked && !s.isDisabled);
                  } else if (filterView === 'available') {
                    filteredSlots = filteredSlots.filter(s => !s.isBooked && !s.isDisabled);
                  } else if (filterView === 'disabled') {
                    filteredSlots = filteredSlots.filter(s => s.isDisabled);
                  }
                  
                  // Ordenar por data e hora
                  filteredSlots = [...filteredSlots].sort((a, b) => 
                    `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`)
                  );
                  
                  if (filteredSlots.length === 0) {
                    return (
                      <div className="text-center py-8 text-gray-500">
                        <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p>Nenhum horário encontrado</p>
                      </div>
                    );
                  }
                  
                  // Agrupar por data
                  const groupedByDate: Record<string, typeof filteredSlots> = {};
                  filteredSlots.forEach(slot => {
                    if (!groupedByDate[slot.date]) {
                      groupedByDate[slot.date] = [];
                    }
                    groupedByDate[slot.date].push(slot);
                  });
                  
                  return (
                    <div className="space-y-4 sm:space-y-6">
                      {Object.entries(groupedByDate).map(([date, dateSlots]) => (
                        <div key={date} className="bg-gray-50 rounded-xl p-3 sm:p-4">
                          <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 flex flex-wrap items-center gap-1 sm:gap-2 text-sm sm:text-base">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="hidden sm:inline">
                              {new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', { 
                                weekday: 'long', 
                                day: 'numeric', 
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="sm:hidden">
                              {new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', { 
                                day: 'numeric', 
                                month: 'short'
                              })}
                            </span>
                            <span className="text-xs sm:text-sm font-normal text-gray-500">
                              ({dateSlots.filter(s => s.isBooked).length} agendado{dateSlots.filter(s => s.isBooked).length !== 1 ? 's' : ''})
                            </span>
                          </h4>
                          
                          <div className="grid gap-2 sm:gap-3">
                            {dateSlots.map(slot => {
                              const booking = slot.booking || bookings.find(b => b.slotId === slot.id);
                              
                              return (
                                <div
                                  key={slot.id}
                                  className={`p-2 sm:p-4 rounded-lg border-2 ${
                                    slot.isDisabled
                                      ? 'bg-gray-100 border-gray-300 opacity-60'
                                      : slot.isBooked
                                      ? 'bg-white border-purple-200'
                                      : 'bg-white border-green-200'
                                  }`}
                                >
                                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                                    <div className="flex items-start gap-2 sm:gap-4">
                                      <div className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-mono text-sm sm:text-base font-bold ${
                                        slot.isDisabled 
                                          ? 'bg-gray-200 text-gray-500 line-through'
                                          : slot.isBooked 
                                          ? 'bg-purple-100 text-purple-700' 
                                          : 'bg-green-100 text-green-700'
                                      }`}>
                                        {slot.startTime}
                                        <span className="text-xs mx-0.5 sm:mx-1">-</span>
                                        {slot.endTime}
                                      </div>
                                      
                                      {slot.isDisabled ? (
                                        <div className="flex items-center">
                                          <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">
                                            Desativado
                                          </span>
                                        </div>
                                      ) : slot.isBooked && booking ? (
                                        <div className="flex-1 min-w-0">
                                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                                            <span className="font-semibold text-gray-800">{booking.name}</span>
                                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                                              Agendado
                                            </span>
                                          </div>
                                          <div className="text-sm text-gray-600 space-y-0.5">
                                            {booking.phone && (
                                              <p className="flex items-center gap-1">
                                                <span>📱</span> {booking.phone}
                                              </p>
                                            )}
                                            {booking.email && (
                                              <p className="flex items-center gap-1">
                                                <span>✉️</span> {booking.email}
                                              </p>
                                            )}
                                            {booking.description && (
                                              <p className="text-gray-500 italic mt-1">
                                                &ldquo;{booking.description}&rdquo;
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="flex items-center">
                                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                                            Disponível
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    
                                    <div className="flex gap-1 sm:gap-2 self-end sm:self-auto">
                                      {slot.isBooked && booking && !slot.isDisabled && (
                                        <button
                                          onClick={() => cancelBooking(booking.id)}
                                          className="px-2 sm:px-3 py-1.5 sm:py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs sm:text-sm font-medium flex items-center gap-1"
                                        >
                                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                          </svg>
                                          <span className="hidden sm:inline">Desmarcar</span>
                                        </button>
                                      )}
                                      
                                      {/* Botão para desativar ou reativar o slot */}
                                      {slot.isDisabled ? (
                                        <button
                                          onClick={() => reactivateSlot(slot.id)}
                                          className="px-2 sm:px-3 py-1.5 sm:py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors text-xs sm:text-sm font-medium flex items-center gap-1"
                                          title="Reativar este horário"
                                        >
                                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                          <span className="hidden sm:inline">Reativar</span>
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => disableSlot(slot.id)}
                                          className="px-2 sm:px-3 py-1.5 sm:py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors text-xs sm:text-sm font-medium flex items-center gap-1"
                                          title="Desativar este horário"
                                        >
                                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                          </svg>
                                          <span className="hidden sm:inline">Desativar</span>
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : activeTab === 'bookings' ? (
            /* Lista de agendamentos */
            <div>
              {/* Campo de busca */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por código (AG-0001), nome, telefone ou email..."
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500 text-sm sm:text-base">Nenhum agendamento ainda</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {(() => {
                    const query = searchQuery.toLowerCase().trim();
                    const filteredBookings = bookings
                      .filter(booking => {
                        if (!query) return true;
                        const slot = slots.find(s => s.id === booking.slotId);
                        return (
                          booking.id.toLowerCase().includes(query) ||
                          booking.name.toLowerCase().includes(query) ||
                          (booking.phone && booking.phone.toLowerCase().includes(query)) ||
                          (booking.email && booking.email.toLowerCase().includes(query)) ||
                          (slot && slot.date.includes(query))
                        );
                      })
                      .sort((a, b) => {
                        const slotA = slots.find(s => s.id === a.slotId);
                        const slotB = slots.find(s => s.id === b.slotId);
                        if (!slotA || !slotB) return 0;
                        return `${slotB.date}${slotB.startTime}`.localeCompare(`${slotA.date}${slotA.startTime}`);
                      });

                    if (filteredBookings.length === 0) {
                      return (
                        <div className="text-center py-8">
                          <p className="text-gray-500">Nenhum agendamento encontrado para &quot;{searchQuery}&quot;</p>
                        </div>
                      );
                    }

                    return filteredBookings.map(booking => {
                      const slot = slots.find(s => s.id === booking.slotId);
                      return (
                        <div key={booking.id} className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                                <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-mono rounded">
                                  {booking.id}
                                </span>
                                <span className="font-semibold text-gray-800 text-sm sm:text-base">{booking.name}</span>
                                {slot && (
                                  <span className="px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                    {formatDate(slot.date)} às {slot.startTime}
                                  </span>
                                )}
                              </div>
                              {booking.phone && (
                                <p className="text-xs sm:text-sm text-gray-600">📱 {booking.phone}</p>
                              )}
                              {booking.email && (
                                <p className="text-xs sm:text-sm text-gray-600 truncate">✉️ {booking.email}</p>
                              )}
                              {booking.description && (
                                <p className="text-xs sm:text-sm text-gray-500 mt-2 italic">&ldquo;{booking.description}&rdquo;</p>
                              )}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 self-end sm:self-start shrink-0">
                              <button
                                onClick={() => {
                                  setReallocationBooking(booking);
                                  setActiveTab('reallocation');
                                }}
                                className="px-3 py-1.5 sm:py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-xs sm:text-sm"
                              >
                                Realocar
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('Tem certeza que deseja mover este agendamento para o pool de realocação?')) {
                                    moveToPool(booking.id);
                                  }
                                }}
                                className="px-3 py-1.5 sm:py-1 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors text-xs sm:text-sm"
                              >
                                Mover p/ Pool
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
                                    cancelBooking(booking.id);
                                  }
                                }}
                                className="px-3 py-1.5 sm:py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs sm:text-sm"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              )}
            </div>
          ) : activeTab === 'holidays' ? (
            /* Visualização de Feriados */
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-yellow-800">Feriados Automáticos</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      O sistema automaticamente não cria slots nos dias de feriados nacionais, estaduais de Alagoas e municipais de Maceió. 
                      Feriados móveis como Carnaval, Páscoa e Corpus Christi são calculados automaticamente para cada ano.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feriados Fixos */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    📅
                  </span>
                  Feriados Fixos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {FIXED_HOLIDAYS.map((holiday, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border ${
                        holiday.type === 'nacional' 
                          ? 'bg-green-50 border-green-200' 
                          : holiday.type === 'estadual'
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-purple-50 border-purple-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800">{holiday.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          holiday.type === 'nacional' 
                            ? 'bg-green-200 text-green-800' 
                            : holiday.type === 'estadual'
                            ? 'bg-blue-200 text-blue-800'
                            : 'bg-purple-200 text-purple-800'
                        }`}>
                          {holiday.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {holiday.date.split('-')[1]}/{holiday.date.split('-')[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feriados do Ano Atual */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    🗓️
                  </span>
                  Todos os Feriados de {new Date().getFullYear()}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left p-3 rounded-tl-lg">Data</th>
                        <th className="text-left p-3">Feriado</th>
                        <th className="text-left p-3 rounded-tr-lg">Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getHolidaysForYear(new Date().getFullYear()).map((holiday, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-mono text-gray-600">
                            {new Date(holiday.date + 'T12:00:00').toLocaleDateString('pt-BR', {
                              weekday: 'short',
                              day: '2-digit',
                              month: '2-digit'
                            })}
                          </td>
                          <td className="p-3 font-medium text-gray-800">{holiday.name}</td>
                          <td className="p-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              holiday.type === 'nacional' 
                                ? 'bg-green-100 text-green-800' 
                                : holiday.type === 'estadual'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {holiday.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Próximo ano */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    📆
                  </span>
                  Feriados Móveis de {new Date().getFullYear() + 1}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {getHolidaysForYear(new Date().getFullYear() + 1)
                    .filter(h => ['Carnaval', 'Sexta-feira Santa', 'Páscoa', 'Corpus Christi', 'Quarta-feira de Cinzas'].some(name => h.name.includes(name) || h.name.includes('Carnaval')))
                    .map((holiday, index) => (
                      <div key={index} className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                        <span className="font-medium text-gray-800">{holiday.name}</span>
                        <p className="text-sm text-indigo-600 mt-1">
                          {new Date(holiday.date + 'T12:00:00').toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : activeTab === 'reallocation' ? (
            /* Visualização de Realocação */
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-blue-800">Pool de Realocação</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Aqui estão listados os agendamentos que foram cancelados administrativamente (ex: cancelamento do dia) e precisam ser realocados.
                      Ao realocar, o usuário receberá um email com o novo horário.
                    </p>
                  </div>
                </div>
              </div>

              {reallocationBooking ? (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">
                      Realocando: {reallocationBooking.name}
                    </h3>
                    <button
                      onClick={() => setReallocationBooking(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cancelar
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">Selecione um novo horário disponível:</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto">
                    {slots
                      .filter(s => !s.isBooked && !s.isDisabled && s.date >= new Date().toISOString().split('T')[0])
                      .sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`))
                      .slice(0, 50) // Mostrar apenas os primeiros 50 slots livres para não travar
                      .map(slot => (
                        <button
                          key={slot.id}
                          onClick={() => {
                            if (confirm(`Confirmar realocação para ${formatDate(slot.date)} às ${slot.startTime}?`)) {
                              reallocateBooking(reallocationBooking.id, slot.id).then(success => {
                                if (success) setReallocationBooking(null);
                              });
                            }
                          }}
                          className="p-3 border border-green-200 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors"
                        >
                          <p className="font-medium text-green-800">{formatDate(slot.date)}</p>
                          <p className="text-sm text-green-700">{slot.startTime} - {slot.endTime}</p>
                        </button>
                      ))}
                  </div>
                  {slots.filter(s => !s.isBooked && !s.isDisabled && s.date >= new Date().toISOString().split('T')[0]).length === 0 && (
                    <p className="text-center text-gray-500 py-8">Não há horários disponíveis futuros.</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.filter(b => b.status === 'pending_reallocation').length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                      <p className="text-gray-500">Nenhum agendamento pendente de realocação.</p>
                    </div>
                  ) : (
                    bookings
                      .filter(b => b.status === 'pending_reallocation')
                      .map(booking => (
                        <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-mono rounded">
                                {booking.id}
                              </span>
                              <h4 className="font-semibold text-gray-800">{booking.name}</h4>
                            </div>
                            <div className="text-sm text-gray-600 space-y-0.5">
                              {booking.phone && <p>📱 {booking.phone}</p>}
                              {booking.email && <p>✉️ {booking.email}</p>}
                              <p className="text-xs text-gray-400 mt-1">Originalmente agendado em: {new Date(booking.createdAt).toLocaleDateString('pt-BR')}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <button
                              onClick={() => setReallocationBooking(booking)}
                              className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              Realocar
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Tem certeza que deseja cancelar definitivamente este agendamento?')) {
                                  cancelBooking(booking.id);
                                }
                              }}
                              className="flex-1 sm:flex-none px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              )}
            </div>
          ) : activeTab === 'internal' ? (
            /* Agendamento Interno */
            <div className="max-w-2xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Novo Agendamento Interno</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Use este formulário para criar agendamentos em qualquer data e horário, ignorando regras de disponibilidade pública.
                  Estes agendamentos não aparecerão como disponíveis na agenda pública.
                </p>

                <form onSubmit={handleInternalBooking} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                      <input
                        type="date"
                        required
                        value={internalDate}
                        onChange={(e) => setInternalDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Início</label>
                        <input
                          type="time"
                          required
                          value={internalStartTime}
                          onChange={(e) => setInternalStartTime(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fim</label>
                        <input
                          type="time"
                          required
                          value={internalEndTime}
                          onChange={(e) => setInternalEndTime(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                      <input
                        type="text"
                        required
                        value={internalName}
                        onChange={(e) => setInternalName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                      <input
                        type="text"
                        value={internalCpf}
                        onChange={(e) => setInternalCpf(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={internalEmail}
                        onChange={(e) => setInternalEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                      <input
                        type="text"
                        value={internalPhone}
                        onChange={(e) => setInternalPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    value={internalDescription}
                    onChange={(e) => setInternalDescription(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Descrição do agendamento"
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Criar Agendamento Interno
                  </button>
                </div>
              </form>
            </div>
          </div>
          ) : null}
        </div>
      </div>
      </div>
    );
  }
  