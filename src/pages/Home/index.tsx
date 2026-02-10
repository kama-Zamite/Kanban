import React from "react";
import { useNavigate } from "react-router-dom";
import { Board } from "../../data/board";
import { BarChart2, ClipboardList, CheckCircle2, Loader2 } from "lucide-react";

const Home: React.FC = () => {
  const navigate = useNavigate();
  // Dados dinâmicos dos cards
  const pendentes = Board.backlog.items.length + Board.pending.items.length + Board.todo.items.length;
  const emProgresso = Board.doing.items.length;
  const concluidas = Board.done.items.length;
  const summary = [
    { label: "Tarefas Pendentes", value: pendentes, color: "bg-orange-200", icon: <ClipboardList className="text-orange-500" size={36} /> },
    { label: "Em Progresso", value: emProgresso, color: "bg-blue-200", icon: <Loader2 className="text-blue-500" size={36} /> },
    { label: "Concluídas", value: concluidas, color: "bg-green-200", icon: <CheckCircle2 className="text-green-500" size={36} /> },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 gap-8">
      <h1 className="text-3xl md:text-5xl font-bold text-orange-500 mb-2">Bem-vindo ao Task Manager!</h1>
      <p className="text-lg md:text-xl text-gray-700 mb-2 text-center max-w-2xl">
        Organize suas tarefas, acompanhe o progresso dos seus projetos e aumente sua produtividade de forma simples e visual.
      </p>

      {/* Atalhos */}
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        <button
          className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition flex items-center gap-2"
          onClick={() => navigate("/boards")}
        >
          <ClipboardList size={20} /> Quadros
        </button>
        <button
          className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition flex items-center gap-2"
          onClick={() => alert('Funcionalidade em breve!')}
        >
          <BarChart2 size={20} /> Projetos
        </button>
        <button
          className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition flex items-center gap-2"
          onClick={() => alert('Funcionalidade em breve!')}
        >
          <CheckCircle2 size={20} /> Analytics
        </button>
      </div>

      {/* Cards de resumo */}
      <div className="flex flex-wrap gap-6 justify-center">
        {summary.map((item) => (
          <div key={item.label} className={`flex flex-col items-center p-6 w-56 rounded-xl shadow-md ${item.color}`}>
            <span className="mb-2">{item.icon}</span>
            <span className="text-2xl font-bold mb-1">{item.value}</span>
            <span className="text-gray-700 font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Gráfico dinâmico */}
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2"><BarChart2 size={20} /> Progresso das Tarefas</h2>
        <div className="flex items-end gap-4 h-40">
          {/* Barras do gráfico */}
          <div className="flex flex-col items-center flex-1">
            <div className="bg-orange-400 w-10 rounded-t-lg" style={{ height: `${pendentes * 10 + 10}%` }}></div>
            <span className="mt-2 text-sm text-gray-600">Pendentes</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="bg-blue-400 w-10 rounded-t-lg" style={{ height: `${emProgresso * 10 + 10}%` }}></div>
            <span className="mt-2 text-sm text-gray-600">Em Progresso</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="bg-green-400 w-10 rounded-t-lg" style={{ height: `${concluidas * 10 + 10}%` }}></div>
            <span className="mt-2 text-sm text-gray-600">Concluídas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
