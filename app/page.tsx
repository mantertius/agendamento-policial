'use client';

import Calendar from './components/Calendar';

export default function Home() {
  return (
    <main className="py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
            Agende seu Atendimento
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Selecione uma data disponível no calendário abaixo e escolha o horário 
            que melhor se adequa à sua necessidade.
          </p>
        </div>

        {/* Calendar Component */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-6 md:p-8">
          <Calendar />
        </div>

        {/* Info Section */}
        <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">1. Escolha a Data</h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Navegue pelo calendário e selecione uma data com horários disponíveis.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">2. Selecione o Horário</h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Escolha um dos horários disponíveis para o atendimento.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">3. Confirme seus Dados</h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Preencha seu nome e informações de contato para finalizar.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 sm:mt-10 text-center text-xs sm:text-sm text-gray-500 px-2">
          <p>Em caso de dúvidas ou necessidade de cancelamento, entre em contato conosco.</p>
        </div>
      </div>
    </main>
  );
}
