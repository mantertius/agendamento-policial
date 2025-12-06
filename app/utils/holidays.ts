// Lista de feriados nacionais e estaduais de Alagoas
// Os feriados móveis (Páscoa, Carnaval, Corpus Christi) são calculados dinamicamente

export interface Holiday {
  date: string; // formato MM-DD para feriados fixos
  name: string;
  type: 'nacional' | 'estadual' | 'municipal';
  isMovable?: boolean; // se é feriado móvel (calculado pela Páscoa)
}

// Feriados fixos (MM-DD)
export const FIXED_HOLIDAYS: Holiday[] = [
  // Feriados Nacionais
  { date: '01-01', name: 'Confraternização Universal', type: 'nacional' },
  { date: '04-21', name: 'Tiradentes', type: 'nacional' },
  { date: '05-01', name: 'Dia do Trabalhador', type: 'nacional' },
  { date: '09-07', name: 'Independência do Brasil', type: 'nacional' },
  { date: '10-12', name: 'Nossa Senhora Aparecida', type: 'nacional' },
  { date: '11-02', name: 'Finados', type: 'nacional' },
  { date: '11-15', name: 'Proclamação da República', type: 'nacional' },
  { date: '11-20', name: 'Dia da Consciência Negra', type: 'nacional' },
  { date: '12-25', name: 'Natal', type: 'nacional' },

  // Feriados Estaduais de Alagoas
  { date: '06-24', name: 'São João', type: 'estadual' },
  { date: '06-29', name: 'São Pedro', type: 'estadual' },
  { date: '09-16', name: 'Emancipação Política de Alagoas', type: 'estadual' },
  { date: '11-20', name: 'Morte de Zumbi dos Palmares', type: 'estadual' },

  // Feriado Municipal de Maceió
  { date: '12-08', name: 'Nossa Senhora da Conceição (Padroeira de Maceió)', type: 'municipal' },
];

/**
 * Calcula a data da Páscoa para um determinado ano usando o algoritmo de Meeus/Jones/Butcher
 */
export function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
}

/**
 * Retorna os feriados móveis para um determinado ano
 */
export function getMovableHolidays(year: number): { date: string; name: string; type: 'nacional' | 'estadual' }[] {
  const easter = calculateEaster(year);
  const movableHolidays: { date: string; name: string; type: 'nacional' | 'estadual' }[] = [];

  // Função auxiliar para formatar data como YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Função auxiliar para adicionar/subtrair dias
  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Carnaval (47 dias antes da Páscoa - segunda e terça)
  const carnavalTerca = addDays(easter, -47);
  const carnavalSegunda = addDays(easter, -48);
  movableHolidays.push({
    date: formatDate(carnavalSegunda),
    name: 'Carnaval (Segunda)',
    type: 'nacional',
  });
  movableHolidays.push({
    date: formatDate(carnavalTerca),
    name: 'Carnaval (Terça)',
    type: 'nacional',
  });

  // Quarta-feira de Cinzas (ponto facultativo, mas vamos incluir como meio expediente é comum)
  const quartaCinzas = addDays(easter, -46);
  movableHolidays.push({
    date: formatDate(quartaCinzas),
    name: 'Quarta-feira de Cinzas',
    type: 'nacional',
  });

  // Sexta-feira Santa (2 dias antes da Páscoa)
  const sextaSanta = addDays(easter, -2);
  movableHolidays.push({
    date: formatDate(sextaSanta),
    name: 'Sexta-feira Santa',
    type: 'nacional',
  });

  // Páscoa (domingo)
  movableHolidays.push({
    date: formatDate(easter),
    name: 'Páscoa',
    type: 'nacional',
  });

  // Corpus Christi (60 dias após a Páscoa)
  const corpusChristi = addDays(easter, 60);
  movableHolidays.push({
    date: formatDate(corpusChristi),
    name: 'Corpus Christi',
    type: 'nacional',
  });

  return movableHolidays;
}

/**
 * Retorna todos os feriados de um ano específico (fixos + móveis)
 */
export function getHolidaysForYear(year: number): { date: string; name: string; type: string }[] {
  const holidays: { date: string; name: string; type: string }[] = [];

  // Adicionar feriados fixos
  for (const holiday of FIXED_HOLIDAYS) {
    holidays.push({
      date: `${year}-${holiday.date}`,
      name: holiday.name,
      type: holiday.type,
    });
  }

  // Adicionar feriados móveis
  const movableHolidays = getMovableHolidays(year);
  holidays.push(...movableHolidays);

  return holidays.sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Verifica se uma data específica é feriado
 */
export function isHoliday(dateStr: string): { isHoliday: boolean; holidayName?: string; holidayType?: string } {
  const [year] = dateStr.split('-').map(Number);
  const holidays = getHolidaysForYear(year);

  const holiday = holidays.find(h => h.date === dateStr);
  
  if (holiday) {
    return {
      isHoliday: true,
      holidayName: holiday.name,
      holidayType: holiday.type,
    };
  }

  return { isHoliday: false };
}

/**
 * Retorna todos os feriados em um intervalo de datas
 */
export function getHolidaysInRange(startDate: string, endDate: string): { date: string; name: string; type: string }[] {
  const [startYear] = startDate.split('-').map(Number);
  const [endYear] = endDate.split('-').map(Number);
  
  const allHolidays: { date: string; name: string; type: string }[] = [];

  for (let year = startYear; year <= endYear; year++) {
    const yearHolidays = getHolidaysForYear(year);
    allHolidays.push(...yearHolidays.filter(h => h.date >= startDate && h.date <= endDate));
  }

  return allHolidays.sort((a, b) => a.date.localeCompare(b.date));
}
