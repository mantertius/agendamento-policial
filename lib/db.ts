import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'agendamento.db');

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (db) {
    return db;
  }

  // Garantir que o diretório existe
  const dataDir = path.dirname(dbPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  db = new Database(dbPath);

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
      cpf TEXT,
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
      days_of_week TEXT NOT NULL,
      lunch_break_enabled INTEGER DEFAULT 0,
      lunch_break_start TEXT,
      lunch_break_duration INTEGER
    );

    CREATE TABLE IF NOT EXISTS counters (
      name TEXT PRIMARY KEY,
      value INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_slots_date ON slots(date);
    CREATE INDEX IF NOT EXISTS idx_bookings_slot_id ON bookings(slot_id);
  `);

  // Inicializar contador de agendamentos se não existir
  const counterExists = db.prepare(`SELECT value FROM counters WHERE name = 'booking'`).get();
  if (!counterExists) {
    db.prepare(`INSERT INTO counters (name, value) VALUES ('booking', 0)`).run();
  }

  // Adicionar coluna is_disabled se não existir (migração)
  try {
    db.exec(`ALTER TABLE slots ADD COLUMN is_disabled INTEGER DEFAULT 0`);
  } catch {
    // Coluna já existe
  }

  // Adicionar colunas de almoço se não existirem (migração)
  try {
    db.exec(`ALTER TABLE availability_configs ADD COLUMN lunch_break_enabled INTEGER DEFAULT 0`);
  } catch {
    // Coluna já existe
  }
  try {
    db.exec(`ALTER TABLE availability_configs ADD COLUMN lunch_break_start TEXT`);
  } catch {
    // Coluna já existe
  }
  try {
    db.exec(`ALTER TABLE availability_configs ADD COLUMN lunch_break_duration INTEGER`);
  } catch {
    // Coluna já existe
  }

  // Adicionar coluna cpf se não existir (migração)
  try {
    db.exec(`ALTER TABLE bookings ADD COLUMN cpf TEXT`);
  } catch {
    // Coluna já existe
  }

  return db;
}

export default getDb;
