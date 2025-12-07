module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/better-sqlite3 [external] (better-sqlite3, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("better-sqlite3", () => require("better-sqlite3"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/OneDrive/Desktop/Programming/agendamento-policial/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
;
;
;
const dbPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'agendamento.db');
let db = null;
function getDb() {
    if (db) {
        return db;
    }
    // Garantir que o diretório existe
    const dataDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(dbPath);
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(dataDir)) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(dataDir, {
            recursive: true
        });
    }
    db = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__["default"](dbPath);
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
      status TEXT DEFAULT 'confirmed',
      FOREIGN KEY (slot_id) REFERENCES slots(id)
    );
    
    -- Migração: Adicionar coluna status se não existir (para bancos existentes)
    PRAGMA user_version;
  `);
    try {
        const tableInfo = db.prepare("PRAGMA table_info(bookings)").all();
        const hasStatusColumn = tableInfo.some((col)=>col.name === 'status');
        if (!hasStatusColumn) {
            db.prepare("ALTER TABLE bookings ADD COLUMN status TEXT DEFAULT 'confirmed'").run();
        }
    } catch (error) {
        console.error('Erro ao verificar/migrar tabela bookings:', error);
    }
    db.exec(`
    CREATE TABLE IF NOT EXISTS availability_configs (
      id TEXT PRIMARY KEY,
      start_date TEXT NOT NULL,

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
    } catch  {
    // Coluna já existe
    }
    // Adicionar colunas de almoço se não existirem (migração)
    try {
        db.exec(`ALTER TABLE availability_configs ADD COLUMN lunch_break_enabled INTEGER DEFAULT 0`);
    } catch  {
    // Coluna já existe
    }
    try {
        db.exec(`ALTER TABLE availability_configs ADD COLUMN lunch_break_start TEXT`);
    } catch  {
    // Coluna já existe
    }
    try {
        db.exec(`ALTER TABLE availability_configs ADD COLUMN lunch_break_duration INTEGER`);
    } catch  {
    // Coluna já existe
    }
    // Adicionar coluna cpf se não existir (migração)
    try {
        db.exec(`ALTER TABLE bookings ADD COLUMN cpf TEXT`);
    } catch  {
    // Coluna já existe
    }
    // Migração: Adicionar coluna is_internal se não existir
    try {
        const slotTableInfo = db.prepare("PRAGMA table_info(slots)").all();
        const hasIsInternalColumn = slotTableInfo.some((col)=>col.name === 'is_internal');
        if (!hasIsInternalColumn) {
            db.prepare("ALTER TABLE slots ADD COLUMN is_internal INTEGER DEFAULT 0").run();
        }
    } catch (error) {
        console.error('Erro ao verificar/migrar tabela slots (is_internal):', error);
    }
    return db;
}
const __TURBOPACK__default__export__ = getDb;
}),
"[project]/OneDrive/Desktop/Programming/agendamento-policial/app/api/data/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Programming/agendamento-policial/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Programming/agendamento-policial/lib/db.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const slots = db.prepare('SELECT * FROM slots ORDER BY date, start_time').all();
        const bookings = db.prepare('SELECT * FROM bookings').all();
        const configs = db.prepare('SELECT * FROM availability_configs').all();
        // Otimização: Criar um Map de bookings para acesso O(1)
        const bookingsMap = new Map();
        bookings.forEach((b)=>{
            bookingsMap.set(b.slot_id, b);
        });
        // Converter formato do banco para formato da aplicação
        const formattedSlots = slots.map((slot)=>{
            const booking = bookingsMap.get(slot.id);
            return {
                id: slot.id,
                date: slot.date,
                startTime: slot.start_time,
                endTime: slot.end_time,
                isBooked: slot.is_booked === 1,
                isDisabled: slot.is_disabled === 1,
                isInternal: slot.is_internal === 1,
                booking: booking ? {
                    id: booking.id,
                    slotId: booking.slot_id,
                    name: booking.name,
                    phone: booking.phone || undefined,
                    email: booking.email || undefined,
                    description: booking.description || undefined,
                    createdAt: booking.created_at,
                    status: booking.status
                } : undefined
            };
        });
        const formattedBookings = bookings.map((b)=>({
                id: b.id,
                slotId: b.slot_id,
                name: b.name,
                phone: b.phone || undefined,
                email: b.email || undefined,
                description: b.description || undefined,
                createdAt: b.created_at
            }));
        const formattedConfigs = configs.map((c)=>({
                id: c.id,
                startDate: c.start_date,
                endDate: c.end_date,
                startTime: c.start_time,
                endTime: c.end_time,
                slotDuration: c.slot_duration,
                daysOfWeek: JSON.parse(c.days_of_week)
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            slots: formattedSlots,
            bookings: formattedBookings,
            availabilityConfigs: formattedConfigs
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Erro ao buscar dados'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a149ecbc._.js.map