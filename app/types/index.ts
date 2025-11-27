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
}

export interface AppState {
  slots: TimeSlot[];
  bookings: Booking[];
  availabilityConfigs: AvailabilityConfig[];
}
