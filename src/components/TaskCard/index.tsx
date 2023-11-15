import classNames from "classnames";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import CircularProgressBar from "../CircularProgressBar";
import "./style.scss";
import { ITask } from "../../types/task";

interface IProps {
  handleOpenModalDelete: (id: string) => void;
  task: ITask;
  handleOpenEditModal: (taskToEdit: ITask) => void;
  handleUpdateStatus: (taskToEditStatus: ITask) => void;
}

const TaskCard: React.FC<IProps> = ({
  task,
  handleOpenModalDelete,
  handleOpenEditModal,
  handleUpdateStatus,
}) => {
  const { id, title, priority, status, progress } = task;

  const updateTask = () => {
    const newStatus =
      status === "To Do"
        ? "In Progress"
        : status === "In Progress"
        ? "Done"
        : "To Do";

    const newProgress =
      status === "To Do" ? 50 : status === "In Progress" ? 100 : 0;

    handleUpdateStatus({ ...task, status: newStatus, progress: newProgress });
  };

  return (
    <div className="task-card">
      <div className="title-wrapper">
        <div className="flex w-100">
          <span className="task-title">Task</span>
          <span className="task">{title}</span>
        </div>
        <div className="flex">
          <span className="priority-title">Priority</span>
          <span className={classNames(`${priority}-priority`, "priority")}>
            {priority}
          </span>
        </div>
      </div>
      <div className="task-status-wrapper">
        <div className="title-wrapper">
          <button className="status" onClick={updateTask}>
            {status}
          </button>
          <div className="progress">
            <CircularProgressBar
              strokeWidth={2}
              sqSize={24}
              percentage={progress}
            />
          </div>
        </div>
      </div>
      <div className="title-wrapper right-align">
        <div className="actions">
          <EditIcon
            className="mr-20 cp"
            onClick={() =>
              handleOpenEditModal({ id, title, priority, status, progress })
            }
          />
          <DeleteIcon
            className="cp"
            onClick={() => handleOpenModalDelete(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
