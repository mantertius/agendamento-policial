import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'agendamento.db');

// Garantir que o diretório existe
import fs from 'fs';
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Habilitar WAL mode para melhor performance
db.pragma('journal_mode = WAL');

// Criar tabelas
db.exec(`
  CREATE TABLE IF NOT EXISTS slots (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    is_booked INTEGER DEFAULT 0,
    is_disabled INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    slot_id TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    description TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (slot_id) REFERENCES slots(id)
  );

  CREATE TABLE IF NOT EXISTS availability_configs (
    id TEXT PRIMARY KEY,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    slot_duration INTEGER NOT NULL,
    days_of_week TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_slots_date ON slots(date);
  CREATE INDEX IF NOT EXISTS idx_bookings_slot_id ON bookings(slot_id);
`);

// Adicionar coluna is_disabled se não existir (migração)
try {
  db.exec(`ALTER TABLE slots ADD COLUMN is_disabled INTEGER DEFAULT 0`);
} catch {
  // Coluna já existe
}

export default db;
