import React, { useState } from "react";
import { ListChecks, Users, Edit2, Check, X, Square, CheckSquare } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { WorkflowStep } from "../../types/workflowStep";

const WorkflowDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { workflow } = location.state || {};
  const [steps, setSteps] = useState<WorkflowStep[]>(workflow?.stepsList || []);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editStep, setEditStep] = useState<WorkflowStep | null>(null);

  if (!workflow) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-8">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Workflow não encontrado</h2>
        <button onClick={() => navigate(-1)} className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition">Voltar</button>
      </div>
    );
  }

  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setEditStep(steps[idx]);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editStep) return;
    setEditStep({ ...editStep, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    if (editIdx === null || !editStep) return;
    setSteps((prev) => prev.map((s, i) => (i === editIdx ? { ...editStep } : s)));
    setEditIdx(null);
    setEditStep(null);
  };

  const handleEditCancel = () => {
    setEditIdx(null);
    setEditStep(null);
  };

  const toggleComplete = (idx: number) => {
    setSteps((prev) => prev.map((s, i) => (i === idx ? { ...s, completed: !s.completed } : s)));
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-8 gap-8">
      <h1 className="text-2xl md:text-4xl font-bold text-purple-500 flex items-center gap-2 mb-6">
        {workflow.name}
      </h1>
      <div className="flex gap-6 text-gray-600 mb-6">
        <span className="flex items-center gap-1"><ListChecks size={18} /> {steps.length} etapas</span>
        <span className="flex items-center gap-1"><Users size={18} /> {workflow.members} membros</span>
        <span className={`text-xs font-bold px-2 py-1 rounded ${workflow.active ? 'bg-purple-200 text-purple-700' : 'bg-gray-200 text-gray-700'}`}>{workflow.active ? 'Ativo' : 'Inativo'}</span>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Etapas do Workflow</h2>
        <ol className="list-decimal pl-6 space-y-2">
          {steps.map((step, idx) => (
            <li key={step.id} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <button onClick={() => toggleComplete(idx)} className="mr-2">
                {step.completed ? <CheckSquare className="text-green-500" size={20} /> : <Square className="text-gray-400" size={20} />}
              </button>
              {editIdx === idx ? (
                <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1">
                  <input
                    name="name"
                    value={editStep?.name || ""}
                    onChange={handleEditChange}
                    className="border rounded px-2 py-1 w-32"
                  />
                  <input
                    name="description"
                    value={editStep?.description || ""}
                    onChange={handleEditChange}
                    className="border rounded px-2 py-1 w-48"
                  />
                  <button onClick={handleEditSave} className="text-green-600 hover:text-green-800"><Check size={18} /></button>
                  <button onClick={handleEditCancel} className="text-red-500 hover:text-red-700"><X size={18} /></button>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1">
                  <span className={`font-medium ${step.completed ? 'line-through text-gray-400' : ''}`}>{step.name}</span>
                  {step.description && <span className={`text-gray-500 text-sm ${step.completed ? 'line-through' : ''}`}>{step.description}</span>}
                  <button onClick={() => handleEdit(idx)} className="text-blue-500 hover:text-blue-700 ml-auto"><Edit2 size={16} /></button>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default WorkflowDetail;
