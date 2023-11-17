export type TaskStatus = "To Do" | "In Progress" | "Done";
export type TaskProgress = 0 | 50 | 100;

export interface ITask {
  id: string;
  title: string;
  priority: string;
  status: TaskStatus;
  progress: TaskProgress;
}
