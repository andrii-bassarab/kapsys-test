import classNames from "classnames";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import CircularProgressBar from "../CircularProgressBar";
import "./style.scss";
import { ITask } from "../../types/task";
import { updatedStatus } from "../../utils/updateNewStatus";
import { useAppDispatch } from "../../app/hooks";
import {
  setIdTaskToDelete,
  setTaskToEdit,
  updateTask,
} from "../../features/tasks";

interface IProps {
  task: ITask;
  handleOpenEditModal: () => void;
  handleOpenModalDelete: () => void;
}

const TaskCard: React.FC<IProps> = ({
  task,
  handleOpenModalDelete,
  handleOpenEditModal,
}) => {
  const dispatch = useAppDispatch();
  const { id, title, priority, status, progress } = task;

  const handleSetDeleteTask = (id: string) => {
    dispatch(setIdTaskToDelete(id));
    handleOpenModalDelete();
  };

  const updateTaskStatus = () => {
    dispatch(updateTask({ ...task, ...updatedStatus(status) }));
  };

  const handleSetEditedTask = () => {
    handleOpenEditModal();
    dispatch(setTaskToEdit(task));
  };

  return (
    <div className="task-card">
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
      <div className="task-status-wrapper">
        <button className="status" onClick={updateTaskStatus}>
          {status}
        </button>
      </div>
      <div className="progress">
        <CircularProgressBar
          strokeWidth={2}
          sqSize={24}
          percentage={progress}
        />
      </div>
      <div className="actions">
        <EditIcon className="mr-20 cp" onClick={handleSetEditedTask} />
        <DeleteIcon className="cp" onClick={() => handleSetDeleteTask(id)} />
      </div>
    </div>
  );
};

export default TaskCard;
