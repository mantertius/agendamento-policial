'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { TimeSlot, Booking, AvailabilityConfig, AppState } from '../types';

interface AppContextType extends AppState {
  addSlot: (slot: TimeSlot) => void;
  removeSlot: (slotId: string) => Promise<boolean>;
  disableSlot: (slotId: string) => Promise<boolean>;
  reactivateSlot: (slotId: string) => Promise<boolean>;
  addBooking: (booking: Booking) => Promise<Booking | null>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
  addAvailabilityConfig: (config: AvailabilityConfig) => Promise<void>;
  removeAvailabilityConfig: (configId: string) => Promise<void>;
  generateSlotsFromConfig: (config: AvailabilityConfig) => Promise<void>;
  clearAllSlots: () => Promise<void>;
  isReady: boolean;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultState: AppState = { slots: [], bookings: [], availabilityConfigs: [] };

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [isReady, setIsReady] = useState(false);

  // Buscar dados da API
  const refreshData = useCallback(async () => {
    try {
      const response = await fetch('/api/data');
      if (response.ok) {
        const data = await response.json();
        setState({
          slots: data.slots || [],
          bookings: data.bookings || [],
          availabilityConfigs: data.availabilityConfigs || [],
        });
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }, []);

  // Carregar dados iniciais
  useEffect(() => {
    refreshData().then(() => setIsReady(true));
  }, [refreshData]);

  const addSlot = (slot: TimeSlot) => {
    setState(prev => ({ ...prev, slots: [...prev.slots, slot] }));
  };

  const removeSlot = async (slotId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/slots/${slotId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setState(prev => ({
          ...prev,
          slots: prev.slots.filter(s => s.id !== slotId),
          bookings: prev.bookings.filter(b => b.slotId !== slotId),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao remover slot:', error);
      return false;
    }
  };

  const disableSlot = async (slotId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/slots/${slotId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDisabled: true }),
      });

      if (response.ok) {
        setState(prev => ({
          ...prev,
          slots: prev.slots.map(s => s.id === slotId ? { ...s, isDisabled: true, isBooked: false, booking: undefined } : s),
          bookings: prev.bookings.filter(b => b.slotId !== slotId),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao desativar slot:', error);
      return false;
    }
  };

  const reactivateSlot = async (slotId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/slots/${slotId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDisabled: false }),
      });

      if (response.ok) {
        setState(prev => ({
          ...prev,
          slots: prev.slots.map(s => s.id === slotId ? { ...s, isDisabled: false } : s),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao reativar slot:', error);
      return false;
    }
  };

  const addBooking = async (booking: Booking): Promise<Booking | null> => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });

      if (response.ok) {
        const result = await response.json();
        const savedBooking = result.booking;
        
        setState(prev => ({
          ...prev,
          bookings: [...prev.bookings, savedBooking],
          slots: prev.slots.map(slot =>
            slot.id === savedBooking.slotId
              ? { ...slot, isBooked: true, booking: savedBooking }
              : slot
          ),
        }));
        return savedBooking;
      }
      return null;
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      return null;
    }
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setState(prev => {
          const booking = prev.bookings.find(b => b.id === bookingId);
          if (!booking) return prev;
          return {
            ...prev,
            bookings: prev.bookings.filter(b => b.id !== bookingId),
            slots: prev.slots.map(slot =>
              slot.id === booking.slotId
                ? { ...slot, isBooked: false, booking: undefined }
                : slot
            ),
          };
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      return false;
    }
  };

  const addAvailabilityConfig = async (config: AvailabilityConfig) => {
    try {
      const response = await fetch('/api/configs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        setState(prev => ({
          ...prev,
          availabilityConfigs: [...prev.availabilityConfigs, config],
        }));
      }
    } catch (error) {
      console.error('Erro ao criar configuração:', error);
    }
  };

  const removeAvailabilityConfig = async (configId: string) => {
    try {
      const response = await fetch(`/api/configs/${configId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setState(prev => ({
          ...prev,
          availabilityConfigs: prev.availabilityConfigs.filter(c => c.id !== configId),
        }));
      }
    } catch (error) {
      console.error('Erro ao remover configuração:', error);
    }
  };

  const generateSlotsFromConfig = async (config: AvailabilityConfig) => {
    const newSlots: TimeSlot[] = [];

    // Parsear datas corretamente para evitar problemas de fuso horário
    const [startYear, startMonth, startDay] = config.startDate.split('-').map(Number);
    const [endYear, endMonth, endDay] = config.endDate.split('-').map(Number);
    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();

      if (!config.daysOfWeek.includes(dayOfWeek)) continue;

      // Formatar data manualmente para evitar problemas de fuso horário
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      const [startHour, startMin] = config.startTime.split(':').map(Number);
      const [endHour, endMin] = config.endTime.split(':').map(Number);

      let currentMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;

      // Calcular horário de almoço se habilitado
      let lunchStartMinutes = -1;
      let lunchEndMinutes = -1;
      if (config.lunchBreakEnabled && config.lunchBreakStart && config.lunchBreakDuration) {
        const [lunchStartHour, lunchStartMin] = config.lunchBreakStart.split(':').map(Number);
        lunchStartMinutes = lunchStartHour * 60 + lunchStartMin;
        lunchEndMinutes = lunchStartMinutes + config.lunchBreakDuration;
      }

      while (currentMinutes + config.slotDuration <= endMinutes) {
        const slotStartHour = Math.floor(currentMinutes / 60);
        const slotStartMin = currentMinutes % 60;
        const slotEndMin = currentMinutes + config.slotDuration;
        const slotEndHour = Math.floor(slotEndMin / 60);
        const slotEndMinRemainder = slotEndMin % 60;

        // Verificar se o slot cai no horário de almoço
        if (lunchStartMinutes !== -1) {
          // Se o slot começa durante o almoço ou termina durante o almoço, pular
          const slotStart = currentMinutes;
          const slotEnd = currentMinutes + config.slotDuration;

          if ((slotStart >= lunchStartMinutes && slotStart < lunchEndMinutes) ||
              (slotEnd > lunchStartMinutes && slotEnd <= lunchEndMinutes) ||
              (slotStart <= lunchStartMinutes && slotEnd >= lunchEndMinutes)) {
            currentMinutes += config.slotDuration;
            continue;
          }
        }

        const slotStartTime = `${String(slotStartHour).padStart(2, '0')}:${String(slotStartMin).padStart(2, '0')}`;
        const slotEndTime = `${String(slotEndHour).padStart(2, '0')}:${String(slotEndMinRemainder).padStart(2, '0')}`;

        const slotId = `${dateStr}-${slotStartTime}`;

        // Verificar se o slot já existe
        const existingSlot = state.slots.find(s => s.id === slotId);
        if (!existingSlot) {
          newSlots.push({
            id: slotId,
            date: dateStr,
            startTime: slotStartTime,
            endTime: slotEndTime,
            isBooked: false,
          });
        }

        currentMinutes += config.slotDuration;
      }
    }

    if (newSlots.length > 0) {
      try {
        const response = await fetch('/api/slots', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSlots),
        });

        if (response.ok) {
          setState(prev => ({ ...prev, slots: [...prev.slots, ...newSlots] }));
        }
      } catch (error) {
        console.error('Erro ao criar slots:', error);
      }
    }
  };

  const clearAllSlots = async () => {
    try {
      const response = await fetch('/api/slots', {
        method: 'DELETE',
      });

      if (response.ok) {
        setState(prev => ({ ...prev, slots: [], bookings: [] }));
      }
    } catch (error) {
      console.error('Erro ao limpar slots:', error);
    }
  };

  return (
    <AppContext.Provider value={{
      ...state,
      addSlot,
      removeSlot,
      disableSlot,
      reactivateSlot,
      addBooking,
      cancelBooking,
      addAvailabilityConfig,
      removeAvailabilityConfig,
      generateSlotsFromConfig,
      clearAllSlots,
      isReady,
      refreshData,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return context;
}
