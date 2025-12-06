export interface TimeSlot {
  id: string;
  date: string; // formato YYYY-MM-DD
  startTime: string; // formato HH:MM
  endTime: string; // formato HH:MM
  isBooked: boolean;
  isDisabled?: boolean;
  booking?: Booking;
}

export interface Booking {
  id: string;
  slotId: string;
  name: string;
  cpf?: string;
  phone?: string;
  email?: string;
  description?: string;
  createdAt: string;
}

export interface AvailabilityConfig {
  id: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  slotDuration: number; // em minutos
  daysOfWeek: number[]; // 0 = domingo, 1 = segunda, etc.
  lunchBreakEnabled?: boolean; // se tem horário de almoço
  lunchBreakStart?: string; // formato HH:MM
  lunchBreakDuration?: number; // duração em minutos (30, 45, 60, etc.)
  vacationMonths?: number[]; // meses de férias (1-12) onde não haverá atendimento
}

export interface AppState {
  slots: TimeSlot[];
  bookings: Booking[];
  availabilityConfigs: AvailabilityConfig[];
}
