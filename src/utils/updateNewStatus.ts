import { TaskProgress, TaskStatus } from "../types/task";

interface UpdatedStatus {
  status: TaskStatus;
  progress: TaskProgress;
}

export const updatedStatus = (status: TaskStatus): UpdatedStatus => {
  switch (status) {
    case "To Do":
      return { status: "In Progress", progress: 50 };
    case "In Progress":
      return { status: "Done", progress: 100 };
    case "Done":
      return { status: "To Do", progress: 0 };

    default:
      return { status: "To Do", progress: 0 };
  }
};
