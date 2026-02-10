import { Project } from "../types/project";
import { v4 as uuidv4 } from "uuid";

export const initialProjects: Project[] = [
  {
    id: uuidv4(),
    name: "Painel Administrativo",
    status: "Em andamento",
    tasks: 12,
    progress: 65,
    members: 4,
    start: "2026-01-10",
    end: "2026-03-01",
    workflowIds: [],
  },
  {
    id: uuidv4(),
    name: "Landing Page Marketing",
    status: "Concluído",
    tasks: 8,
    progress: 100,
    members: 2,
    start: "2025-12-01",
    end: "2025-12-20",
    workflowIds: [],
  },
];
