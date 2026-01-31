import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Calendar, Filter, BarChart3, ChevronDown } from 'lucide-react';
import { INSTAGRAM_DATA } from './data/instagramData';
import { InstagramChart } from './components/InstagramChart';

const App: React.FC = () => {
  // Get available years from data keys
  const availableYears = Object.keys(INSTAGRAM_DATA).map(Number).sort((a, b) => b - a);
  const [selectedYear, setSelectedYear] = useState<number>(availableYears[0]);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const currentData = INSTAGRAM_DATA[selectedYear] || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-unopar-blue text-white p-2.5 rounded-lg shadow-md">
              <BarChart3 size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Relatório de Visualizações</h1>
              <p className="text-sm text-unopar-orange font-semibold tracking-wide">UNOPAR RUBIATABA</p>
            </div>
          </div>

          {/* Year Filter Desktop */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-200 ${
                  selectedYear === year
                    ? 'bg-white text-unopar-blue shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Mobile Year Filter */}
          <div className="relative md:hidden">
            <button 
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
              className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm active:bg-slate-50"
            >
              <Calendar size={16} className="text-slate-500" />
              {selectedYear}
              <ChevronDown size={16} className="text-slate-400" />
            </button>
            
            {isYearDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-slate-100 py-1 animate-in fade-in zoom-in-95 duration-200">
                {availableYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      setIsYearDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      selectedYear === year ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Summary Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Visão Geral de Desempenho</h2>
            <p className="text-slate-500 mt-1">
              Acompanhamento mensal comparativo de todas as contas institucionais.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <Filter size={14} />
            Exibindo dados de <span className="font-bold text-slate-800">{selectedYear}</span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentData.map((account, index) => {
            // Assign different gradients/themes based on index for visual variety
            const themes = [
              'from-blue-600 to-indigo-600',
              'from-orange-500 to-red-500', 
              'from-emerald-500 to-teal-500',
              'from-violet-600 to-purple-600',
              'from-pink-500 to-rose-500'
            ];
            
            return (
              <InstagramChart 
                key={account.id}
                name={account.name}
                handle={account.handle}
                data={account.data}
                colorTheme={themes[index % themes.length]}
              />
            );
          })}
        </div>

        {/* Empty State / Footer Note */}
        {currentData.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-400">Nenhum dado encontrado para o ano de {selectedYear}.</p>
            <p className="text-sm text-slate-400 mt-2">Verifique o arquivo <code>data/instagramData.ts</code>.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
