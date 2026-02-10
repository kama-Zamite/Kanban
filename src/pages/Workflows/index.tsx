
import React, { useState } from "react";
import { Workflow as WorkflowIcon, ListChecks, Plus, Users, X, Check, ListPlus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { initialWorkflows } from "../../data/workflows";
import { Workflow } from "../../types/workflow";
import { WorkflowStep } from "../../types/workflowStep";
import { v4 as uuidv4 } from "uuid";

type WorkflowWithSteps = Workflow & { stepsList: WorkflowStep[] };

const emptyWorkflow: Omit<WorkflowWithSteps, "id"> = {
  name: "",
  steps: 1,
  active: true,
  members: 1,
  stepsList: [],
};

const emptyStep: Omit<WorkflowStep, "id"> = {
  name: "",
  description: "",
  completed: false,
};


const Workflows: React.FC = () => {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState<WorkflowWithSteps[]>(
    initialWorkflows.map(wf => ({
      ...wf,
      stepsList: [
        { id: uuidv4(), name: "Etapa 1", description: "", completed: false },
        { id: uuidv4(), name: "Etapa 2", description: "", completed: false },
      ]
    }))
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<WorkflowWithSteps, "id">>(emptyWorkflow);
  const [stepForm, setStepForm] = useState<Omit<WorkflowStep, "id">>(emptyStep);
  const [selectedStepWf, setSelectedStepWf] = useState<string | null>(null);

  const openModal = (workflow?: WorkflowWithSteps) => {
    setModalOpen(true);
    if (workflow) {
      setEditId(workflow.id);
      setForm({ ...workflow });
    } else {
      setEditId(null);
      setForm(emptyWorkflow);
    }
    setStepForm(emptyStep);
    setSelectedStepWf(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setForm(emptyWorkflow);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  // CRUD de etapas
  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStepForm((prev) => ({ ...prev, [name]: value }));
  };

  const addStep = () => {
    if (!stepForm.name) return;
    setForm((prev) => ({
      ...prev,
      stepsList: [...prev.stepsList, { ...stepForm, id: uuidv4() }],
      steps: prev.stepsList.length + 1,
    }));
    setStepForm(emptyStep);
  };

  const removeStep = (id: string) => {
    setForm((prev) => ({
      ...prev,
      stepsList: prev.stepsList.filter(s => s.id !== id),
      steps: prev.stepsList.length - 1,
    }));
  };

  const handleSave = () => {
    if (!form.name) return;
    if (editId) {
      setWorkflows((prev) => prev.map((w) => (w.id === editId ? { ...w, ...form, steps: form.stepsList.length } : w)));
    } else {
      setWorkflows((prev) => [...prev, { ...form, id: uuidv4(), steps: form.stepsList.length }]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-8 gap-8">
      <div className="flex w-full justify-between items-center max-w-5xl mb-6">
        <h1 className="text-2xl md:text-4xl font-bold text-purple-500 flex items-center gap-2">
          <WorkflowIcon size={32} /> Workflows
        </h1>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-purple-400 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition">
          <Plus size={20} /> Novo Workflow
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {workflows.map((wf) => (
          <div key={wf.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <WorkflowIcon size={20} /> {wf.name}
              </span>
              <span className={`text-xs font-bold px-2 py-1 rounded ${wf.active ? 'bg-purple-200 text-purple-700' : 'bg-gray-200 text-gray-700'}`}>{wf.active ? 'Ativo' : 'Inativo'}</span>
            </div>
            <div className="flex items-center gap-6 text-gray-600">
              <span className="flex items-center gap-1"><ListChecks size={16} /> {wf.steps} etapas</span>
              <span className="flex items-center gap-1"><Users size={16} /> {wf.members} membros</span>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-xs font-semibold"
                onClick={() => navigate(`/workflows/${wf.id}`, { state: { workflow: wf } })}
              >
                Detalhes
              </button>
              <button onClick={() => openModal(wf)} className="bg-orange-100 text-orange-700 px-3 py-1 rounded hover:bg-orange-200 text-xs font-semibold">Editar</button>
              <button onClick={() => handleDelete(wf.id)} className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 text-xs font-semibold">Excluir</button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal de criar/editar workflow */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative flex flex-col gap-4">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"><X size={22} /></button>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">{editId ? 'Editar Workflow' : 'Novo Workflow'}</h2>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Nome do workflow" className="border rounded px-3 py-2 mb-2 w-full" />
            <div className="flex gap-2">
              <input name="members" value={form.members} onChange={handleChange} placeholder="Membros" type="number" min={1} className="border rounded px-3 py-2 w-1/2" />
            </div>
            <div className="flex items-center gap-2">
              <input name="active" type="checkbox" checked={form.active} onChange={handleChange} id="active" />
              <label htmlFor="active" className="text-sm">Ativo</label>
            </div>
            {/* CRUD de etapas */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <input name="name" value={stepForm.name} onChange={handleStepChange} placeholder="Nome da etapa" className="border rounded px-2 py-1 w-1/2" />
                <input name="description" value={stepForm.description} onChange={handleStepChange} placeholder="Descrição" className="border rounded px-2 py-1 w-1/2" />
                <button onClick={addStep} className="bg-purple-400 hover:bg-purple-500 text-white rounded p-2"><ListPlus size={18} /></button>
              </div>
              <ul className="space-y-1">
                {form.stepsList.map((step) => (
                  <li key={step.id} className="flex items-center gap-2 text-sm bg-gray-100 rounded px-2 py-1">
                    <span className="font-medium">{step.name}</span>
                    <span className="text-gray-500">{step.description}</span>
                    <button onClick={() => removeStep(step.id)} className="ml-auto text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={handleSave} className="bg-purple-400 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 justify-center mt-2">
              <Check size={18} /> Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workflows;
