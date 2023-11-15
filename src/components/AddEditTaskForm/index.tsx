import classNames from "classnames";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import "./style.scss";
import { ITask } from "../../types/task";
import { useState } from "react";

interface IProps {
  closeModalWindow: () => void;
  handleAddTask: (newTask: ITask) => void;
  type: "add" | "edit";
  taskToEdit: ITask;
  handleEditItem: (taskToEdit: ITask) => void;
}

const AddEditTaskForm: React.FC<IProps> = ({
  closeModalWindow,
  handleAddTask,
  type,
  taskToEdit,
  handleEditItem,
}) => {
  const [title, setTitle] = useState(type === "add" ? "" : taskToEdit?.title);
  const [priority, setPriority] = useState<"high" | "medium" | "low">(
    type === "add" ? "low" : (taskToEdit?.priority as "high" | "medium" | "low")
  );

  console.log("priority", priority);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    closeModalWindow();

    if (type === "add") {
      handleAddTask({
        id: String(new Date().getUTCSeconds()),
        title,
        priority,
        status: "To Do",
        progress: 0,
      });

      return;
    }

    handleEditItem({
      id: taskToEdit.id,
      title,
      priority,
      status: taskToEdit.status,
      progress: taskToEdit.progress,
    });
  };

  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">
              {type === "add" ? "Add Task" : "Edit task"}
            </span>
            <Close className="cp" onClick={closeModalWindow} />
          </div>
          <Input
            label="Task"
            placeholder="Type your task here..."
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            value={title}
          />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {["high", "medium", "low"].map((currentPriority) => (
                <li
                  key={currentPriority}
                  className={classNames(currentPriority, {
                    [`${priority}-selected`]: priority === currentPriority,
                  })}
                  onClick={() =>
                    setPriority(currentPriority as "high" | "medium" | "low")
                  }
                >
                  {currentPriority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button title="Add" disabled={!title} onClick={handleSubmit} />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditTaskForm;
