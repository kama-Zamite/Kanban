import React from "react";
import { BarChart2, PieChart, TrendingUp, ListChecks } from "lucide-react";

const Analytics: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center p-8 gap-8">
      <h1 className="text-2xl md:text-4xl font-bold text-blue-500 flex items-center gap-2 mb-6">
        <BarChart2 size={32} /> Analytics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center gap-2">
          <TrendingUp size={32} className="text-green-500" />
          <span className="text-lg font-semibold">Produtividade</span>
          <span className="text-2xl font-bold text-green-600">+18%</span>
          <span className="text-gray-500 text-sm">em relação ao mês anterior</span>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center gap-2">
          <PieChart size={32} className="text-orange-500" />
          <span className="text-lg font-semibold">Tarefas por Status</span>
          <span className="text-2xl font-bold text-orange-600">32</span>
          <span className="text-gray-500 text-sm">Distribuição geral</span>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center gap-2">
          <ListChecks size={32} className="text-blue-500" />
          <span className="text-lg font-semibold">Tarefas Concluídas</span>
          <span className="text-2xl font-bold text-blue-600">21</span>
          <span className="text-gray-500 text-sm">no último mês</span>
        </div>
      </div>
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md p-8 mt-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2"><BarChart2 size={20} /> Gráfico de Progresso</h2>
        <div className="flex items-end gap-4 h-40">
          <div className="flex flex-col items-center flex-1">
            <div className="bg-blue-400 w-10 rounded-t-lg" style={{ height: '70%' }}></div>
            <span className="mt-2 text-sm text-gray-600">Janeiro</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="bg-blue-400 w-10 rounded-t-lg" style={{ height: '80%' }}></div>
            <span className="mt-2 text-sm text-gray-600">Fevereiro</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="bg-blue-400 w-10 rounded-t-lg" style={{ height: '60%' }}></div>
            <span className="mt-2 text-sm text-gray-600">Março</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="bg-blue-400 w-10 rounded-t-lg" style={{ height: '90%' }}></div>
            <span className="mt-2 text-sm text-gray-600">Abril</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
