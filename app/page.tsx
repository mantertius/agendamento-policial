'use client';

import Calendar from './components/Calendar';
import packageJson from '../package.json';

export default function Home() {
  const endereco = process.env.NEXT_PUBLIC_ENDERECO || 'Av. Norma Pimentel Costa s/nº, Benedito Bentes, Maceió - Alagoas';
  const telefone = process.env.NEXT_PUBLIC_TELEFONE_CONTATO || '(82) 3315-7917';
  const email = process.env.NEXT_PUBLIC_EMAIL_CONTATO || '8dp@pc.al.gov.br';
  const version = packageJson.version;

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

        {/* Disclaimer - Distritos Válidos */}
        <div className="bg-blue-600 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-3xl sm:text-4xl">📍</span>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-lg sm:text-xl font-bold mb-2">
                Este agendamento é válido apenas para:
              </h2>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center sm:justify-start mb-3">
                <span className="bg-white/20 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base">
                  🏛️ 8º Distrito Policial da Capital
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base">
                  🏛️ 21º Distrito Policial da Capital
                </span>
              </div>
              <div className="text-blue-100 text-xs sm:text-sm space-y-1">
                <p><strong>📍 Endereço:</strong> {endereco}</p>
                <p>
                  <strong>📞</strong> {telefone} &nbsp;|&nbsp; 
                  <strong>📧</strong> {email}
                </p>
              </div>
            </div>
          </div>
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

        {/* Footer com Informações de Contato */}
        <footer className="mt-8 sm:mt-12 bg-gray-800 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações de Contato */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📞</span> Contato
              </h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <p className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">📍</span>
                  <span>{endereco}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-400">📞</span>
                  <a href={`tel:${telefone.replace(/\D/g, '')}`} className="hover:text-white transition-colors">
                    {telefone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-yellow-400">📧</span>
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                    {email}
                  </a>
                </p>
              </div>
            </div>

            {/* Distritos Atendidos */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🏛️</span> Distritos Atendidos
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  8º Distrito Policial da Capital
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  21º Distrito Policial da Capital
                </li>
              </ul>
            </div>
          </div>

          {/* Créditos */}
          <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400 text-xs">
            <p>© {new Date().getFullYear()} Polícia Civil de Alagoas. Todos os direitos reservados.</p>
            <p className="mt-1">Em caso de dúvidas ou necessidade de cancelamento, entre em contato conosco.</p>
            <p className="mt-2 text-gray-500">v{version}</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
