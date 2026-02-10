
import React, { useState } from "react";
import { Plus, FolderKanban, Users, CalendarCheck2, BarChart2, X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { initialProjects } from "../../data/projects";
import { Project } from "../../types/project";
import { v4 as uuidv4 } from "uuid";

const emptyProject: Omit<Project, "id"> = {
  name: "",
  status: "Em andamento",
  tasks: 0,
  progress: 0,
  members: 1,
  start: "",
  end: "",
};


const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Project, "id">>(emptyProject);
  const navigate = useNavigate();

  const openModal = (project?: Project) => {
    setModalOpen(true);
    if (project) {
      setEditId(project.id);
      setForm({ ...project });
    } else {
      setEditId(null);
      setForm(emptyProject);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setForm(emptyProject);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.name) return;
    if (editId) {
      setProjects((prev) => prev.map((p) => (p.id === editId ? { ...p, ...form } : p)));
    } else {
      setProjects((prev) => [...prev, { ...form, id: uuidv4() }]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-8 gap-8">
      <div className="flex w-full justify-between items-center max-w-5xl mb-6">
        <h1 className="text-2xl md:text-4xl font-bold text-orange-500 flex items-center gap-2">
          <FolderKanban size={32} /> Projetos
        </h1>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition">
          <Plus size={20} /> Novo Projeto
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FolderKanban size={20} /> {project.name}
              </span>
              <span className={`text-xs font-bold px-2 py-1 rounded ${project.status === 'Concluído' ? 'bg-green-200 text-green-700' : 'bg-blue-200 text-blue-700'}`}>{project.status}</span>
            </div>
            <div className="flex items-center gap-6 text-gray-600">
              <span className="flex items-center gap-1"><BarChart2 size={16} /> {project.progress}%</span>
              <span className="flex items-center gap-1"><Users size={16} /> {project.members} membros</span>
              <span className="flex items-center gap-1"><CalendarCheck2 size={16} /> {project.start} - {project.end}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`h-2 rounded-full ${project.status === 'Concluído' ? 'bg-green-400' : 'bg-blue-400'}`} style={{ width: `${project.progress}%` }}></div>
            </div>
            <div className="text-sm text-gray-500">Tarefas: {project.tasks}</div>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-xs font-semibold"
                onClick={() => navigate('/boards')}
              >
                Detalhes
              </button>
              <button onClick={() => openModal(project)} className="bg-orange-100 text-orange-700 px-3 py-1 rounded hover:bg-orange-200 text-xs font-semibold">Editar</button>
              <button onClick={() => handleDelete(project.id)} className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 text-xs font-semibold">Excluir</button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal de criar/editar projeto */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative flex flex-col gap-4">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"><X size={22} /></button>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">{editId ? 'Editar Projeto' : 'Novo Projeto'}</h2>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Nome do projeto" className="border rounded px-3 py-2 mb-2 w-full" />
            <div className="flex gap-2">
              <input name="start" value={form.start} onChange={handleChange} placeholder="Data início" type="date" className="border rounded px-3 py-2 w-1/2" />
              <input name="end" value={form.end} onChange={handleChange} placeholder="Data fim" type="date" className="border rounded px-3 py-2 w-1/2" />
            </div>
            <div className="flex gap-2">
              <input name="tasks" value={form.tasks} onChange={handleChange} placeholder="Tarefas" type="number" min={0} className="border rounded px-3 py-2 w-1/2" />
              <input name="members" value={form.members} onChange={handleChange} placeholder="Membros" type="number" min={1} className="border rounded px-3 py-2 w-1/2" />
            </div>
            <div className="flex gap-2">
              <input name="progress" value={form.progress} onChange={handleChange} placeholder="Progresso (%)" type="number" min={0} max={100} className="border rounded px-3 py-2 w-1/2" />
              <select name="status" value={form.status} onChange={handleChange} className="border rounded px-3 py-2 w-1/2">
                <option value="Em andamento">Em andamento</option>
                <option value="Concluído">Concluído</option>
              </select>
            </div>
            <button onClick={handleSave} className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 justify-center mt-2">
              <Check size={18} /> Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
