import React, { useState } from "react";
import {
  Workflow as WorkflowIcon,
  ListChecks,
  Plus,
  Users,
  X,
  Check,
  ListPlus,
  Trash2,
} from "lucide-react";
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
    initialWorkflows.map((wf) => ({
      ...wf,
      stepsList: [
        { id: uuidv4(), name: "Etapa 1", description: "", completed: false },
        { id: uuidv4(), name: "Etapa 2", description: "", completed: false },
      ],
    }))
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<WorkflowWithSteps, "id">>(emptyWorkflow);
  const [stepForm, setStepForm] = useState<Omit<WorkflowStep, "id">>(emptyStep);

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
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setForm(emptyWorkflow);
  };

  // ✅ corrigido: evento tipado corretamente
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, stepId: string) => {
    const checked = e.target.checked;
    setWorkflows((prev) =>
      prev.map((wf) => {
        if (!editId || wf.id !== editId) return wf;
        return {
          ...wf,
          stepsList: wf.stepsList.map((step) =>
            step.id === stepId ? { ...step, completed: checked } : step
          ),
        };
      })
    );
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleStepChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      stepsList: prev.stepsList.filter((s) => s.id !== id),
      steps: prev.stepsList.length - 1,
    }));
  };

  const handleSave = () => {
    if (!form.name) return;

    if (editId) {
      setWorkflows((prev) =>
        prev.map((w) =>
          w.id === editId
            ? { ...w, ...form, steps: form.stepsList.length }
            : w
        )
      );
    } else {
      setWorkflows((prev) => [
        ...prev,
        { ...form, id: uuidv4(), steps: form.stepsList.length },
      ]);
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-8 gap-8">
      {/* conteúdo permanece igual */}
    </div>
  );
};

export default Workflows;
