module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/OneDrive/Desktop/Programming/agendamento-policial/app/context/AppContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "useApp",
    ()=>useApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Programming/agendamento-policial/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Programming/agendamento-policial/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const defaultState = {
    slots: [],
    bookings: [],
    availabilityConfigs: []
};
function AppProvider({ children }) {
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultState);
    const [isReady, setIsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Buscar dados da API
    const refreshData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const response = await fetch('/api/data');
            if (response.ok) {
                const data = await response.json();
                setState({
                    slots: data.slots || [],
                    bookings: data.bookings || [],
                    availabilityConfigs: data.availabilityConfigs || []
                });
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }, []);
    // Carregar dados iniciais
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        refreshData().then(()=>setIsReady(true));
    }, [
        refreshData
    ]);
    const addSlot = (slot)=>{
        setState((prev)=>({
                ...prev,
                slots: [
                    ...prev.slots,
                    slot
                ]
            }));
    };
    const removeSlot = async (slotId)=>{
        try {
            const response = await fetch(`/api/slots/${slotId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setState((prev)=>({
                        ...prev,
                        slots: prev.slots.filter((s)=>s.id !== slotId),
                        bookings: prev.bookings.filter((b)=>b.slotId !== slotId)
                    }));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro ao remover slot:', error);
            return false;
        }
    };
    const disableSlot = async (slotId)=>{
        try {
            const response = await fetch(`/api/slots/${slotId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isDisabled: true
                })
            });
            if (response.ok) {
                setState((prev)=>({
                        ...prev,
                        slots: prev.slots.map((s)=>s.id === slotId ? {
                                ...s,
                                isDisabled: true,
                                isBooked: false,
                                booking: undefined
                            } : s),
                        bookings: prev.bookings.filter((b)=>b.slotId !== slotId)
                    }));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro ao desativar slot:', error);
            return false;
        }
    };
    const reactivateSlot = async (slotId)=>{
        try {
            const response = await fetch(`/api/slots/${slotId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isDisabled: false
                })
            });
            if (response.ok) {
                setState((prev)=>({
                        ...prev,
                        slots: prev.slots.map((s)=>s.id === slotId ? {
                                ...s,
                                isDisabled: false
                            } : s)
                    }));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro ao reativar slot:', error);
            return false;
        }
    };
    const addBooking = async (booking)=>{
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(booking)
            });
            if (response.ok) {
                const result = await response.json();
                const savedBooking = result.booking;
                setState((prev)=>({
                        ...prev,
                        bookings: [
                            ...prev.bookings,
                            savedBooking
                        ],
                        slots: prev.slots.map((slot)=>slot.id === savedBooking.slotId ? {
                                ...slot,
                                isBooked: true,
                                booking: savedBooking
                            } : slot)
                    }));
                return savedBooking;
            }
            return null;
        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
            return null;
        }
    };
    const cancelBooking = async (bookingId)=>{
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setState((prev)=>{
                    const booking = prev.bookings.find((b)=>b.id === bookingId);
                    if (!booking) return prev;
                    return {
                        ...prev,
                        bookings: prev.bookings.filter((b)=>b.id !== bookingId),
                        slots: prev.slots.map((slot)=>slot.id === booking.slotId ? {
                                ...slot,
                                isBooked: false,
                                booking: undefined
                            } : slot)
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
    const addAvailabilityConfig = async (config)=>{
        try {
            const response = await fetch('/api/configs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(config)
            });
            if (response.ok) {
                setState((prev)=>({
                        ...prev,
                        availabilityConfigs: [
                            ...prev.availabilityConfigs,
                            config
                        ]
                    }));
            }
        } catch (error) {
            console.error('Erro ao criar configuração:', error);
        }
    };
    const removeAvailabilityConfig = async (configId)=>{
        try {
            const response = await fetch(`/api/configs/${configId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setState((prev)=>({
                        ...prev,
                        availabilityConfigs: prev.availabilityConfigs.filter((c)=>c.id !== configId)
                    }));
            }
        } catch (error) {
            console.error('Erro ao remover configuração:', error);
        }
    };
    const generateSlotsFromConfig = async (config)=>{
        const newSlots = [];
        // Parsear datas corretamente para evitar problemas de fuso horário
        const [startYear, startMonth, startDay] = config.startDate.split('-').map(Number);
        const [endYear, endMonth, endDay] = config.endDate.split('-').map(Number);
        const startDate = new Date(startYear, startMonth - 1, startDay);
        const endDate = new Date(endYear, endMonth - 1, endDay);
        for(let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)){
            const dayOfWeek = d.getDay();
            if (!config.daysOfWeek.includes(dayOfWeek)) continue;
            // Verificar se o mês atual está nos meses de férias
            const currentMonth = d.getMonth() + 1; // getMonth() retorna 0-11, precisamos de 1-12
            if (config.vacationMonths && config.vacationMonths.includes(currentMonth)) {
                continue; // Pular este dia se estiver em um mês de férias
            }
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
            while(currentMinutes + config.slotDuration <= endMinutes){
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
                    if (slotStart >= lunchStartMinutes && slotStart < lunchEndMinutes || slotEnd > lunchStartMinutes && slotEnd <= lunchEndMinutes || slotStart <= lunchStartMinutes && slotEnd >= lunchEndMinutes) {
                        currentMinutes += config.slotDuration;
                        continue;
                    }
                }
                const slotStartTime = `${String(slotStartHour).padStart(2, '0')}:${String(slotStartMin).padStart(2, '0')}`;
                const slotEndTime = `${String(slotEndHour).padStart(2, '0')}:${String(slotEndMinRemainder).padStart(2, '0')}`;
                const slotId = `${dateStr}-${slotStartTime}`;
                // Verificar se o slot já existe
                const existingSlot = state.slots.find((s)=>s.id === slotId);
                if (!existingSlot) {
                    newSlots.push({
                        id: slotId,
                        date: dateStr,
                        startTime: slotStartTime,
                        endTime: slotEndTime,
                        isBooked: false
                    });
                }
                currentMinutes += config.slotDuration;
            }
        }
        if (newSlots.length > 0) {
            try {
                const response = await fetch('/api/slots', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newSlots)
                });
                if (response.ok) {
                    setState((prev)=>({
                            ...prev,
                            slots: [
                                ...prev.slots,
                                ...newSlots
                            ]
                        }));
                }
            } catch (error) {
                console.error('Erro ao criar slots:', error);
            }
        }
    };
    const clearAllSlots = async ()=>{
        try {
            const response = await fetch('/api/slots', {
                method: 'DELETE'
            });
            if (response.ok) {
                setState((prev)=>({
                        ...prev,
                        slots: [],
                        bookings: []
                    }));
            }
        } catch (error) {
            console.error('Erro ao limpar slots:', error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
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
            refreshData
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/context/AppContext.tsx",
        lineNumber: 331,
        columnNumber: 5
    }, this);
}
function useApp() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (context === undefined) {
        throw new Error('useApp deve ser usado dentro de AppProvider');
    }
    return context;
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

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
"[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Programming/agendamento-policial/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Programming/agendamento-policial/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Programming/agendamento-policial/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Programming/agendamento-policial/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Programming/agendamento-policial/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function Header() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const isAdmin = pathname.startsWith('/admin');
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto px-4 py-3 sm:py-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-3 sm:gap-4 hover:opacity-90 transition-opacity",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-11 h-11 sm:w-14 sm:h-14 flex-shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/logo.png",
                                        alt: "Polícia Civil AL",
                                        width: 56,
                                        height: 56,
                                        className: "w-full h-full object-contain drop-shadow-lg",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                                        lineNumber: 19,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                                    lineNumber: 18,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-l border-blue-600 pl-3 sm:pl-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-sm sm:text-lg font-bold leading-tight",
                                            children: "Polícia Civil"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                                            lineNumber: 29,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs sm:text-sm text-blue-200 font-medium",
                                            children: "Alagoas"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                                            lineNumber: 30,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden sm:flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: `px-4 py-2 rounded-lg transition-colors ${!isAdmin ? 'bg-white/20 text-white' : 'text-blue-200 hover:bg-white/10'}`,
                                    children: "Agendar"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/admin",
                                    className: `px-4 py-2 rounded-lg transition-colors ${isAdmin ? 'bg-white/20 text-white' : 'text-blue-200 hover:bg-white/10'}`,
                                    children: "Administração"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setMobileMenuOpen(!mobileMenuOpen),
                            className: "sm:hidden p-2 hover:bg-white/10 rounded-lg transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: mobileMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M6 18L18 6M6 6l12 12"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                                    lineNumber: 65,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M4 6h16M4 12h16M4 18h16"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                                    lineNumber: 67,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "sm:hidden mt-3 pt-3 border-t border-white/20 flex flex-col gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            onClick: ()=>setMobileMenuOpen(false),
                            className: `px-4 py-3 rounded-lg transition-colors text-center ${!isAdmin ? 'bg-white/20 text-white' : 'text-blue-200 hover:bg-white/10'}`,
                            children: "Agendar"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Programming$2f$agendamento$2d$policial$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/admin",
                            onClick: ()=>setMobileMenuOpen(false),
                            className: `px-4 py-3 rounded-lg transition-colors text-center ${isAdmin ? 'bg-white/20 text-white' : 'text-blue-200 hover:bg-white/10'}`,
                            children: "Administração"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
                    lineNumber: 75,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/Programming/agendamento-policial/app/components/Header.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__907cacd2._.js.map