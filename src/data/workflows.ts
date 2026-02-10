import { Workflow } from "../types/workflow";
import { v4 as uuidv4 } from "uuid";

export const initialWorkflows: Workflow[] = [
  {
    id: uuidv4(),
    name: "Onboarding de Colaboradores",
    steps: 5,
    active: true,
    members: 3,
  },
  {
    id: uuidv4(),
    name: "Aprovação de Projeto",
    steps: 4,
    active: false,
    members: 2,
  },
];
