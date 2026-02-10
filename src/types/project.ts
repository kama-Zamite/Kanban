
export type Project = {
  id: string;
  name: string;
  status: "Em andamento" | "Concluído";
  tasks: number;
  progress: number;
  members: number;
  start: string;
  end: string;
  workflowIds: string[]; // IDs of associated workflows
};
