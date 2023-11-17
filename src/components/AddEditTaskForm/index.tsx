import classNames from "classnames";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import "./style.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addTask, updateTask } from "../../features/tasks";

interface IProps {
  closeModalWindow: () => void;
  typeModalIsAdd: boolean;
}

type Priority = "high" | "medium" | "low";

const AddEditTaskForm: React.FC<IProps> = ({
  closeModalWindow,
  typeModalIsAdd,
}) => {
  const dispatch = useAppDispatch();
  const { taskToEdit } = useAppSelector((state) => state.tasks);
  const [title, setTitle] = useState(
    typeModalIsAdd ? "" : taskToEdit?.title || ""
  );
  const [priority, setPriority] = useState<Priority>(
    typeModalIsAdd ? "low" : (taskToEdit?.priority as Priority)
  );

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    closeModalWindow();

    if (!typeModalIsAdd && taskToEdit) {
      dispatch(
        updateTask({
          id: taskToEdit.id,
          title,
          priority,
          status: taskToEdit.status,
          progress: taskToEdit.progress,
        })
      );

      return;
    }

    dispatch(
      addTask({
        id: String(new Date().getUTCSeconds()),
        title,
        priority,
        status: "To Do",
        progress: 0,
      })
    );
  };

  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">
              {typeModalIsAdd ? "Add Task" : "Edit task"}
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
              {(["high", "medium", "low"] as Priority[]).map(
                (currentPriority) => (
                  <li
                    key={currentPriority}
                    className={classNames(currentPriority, {
                      [`${priority}-selected`]: priority === currentPriority,
                    })}
                    onClick={() => setPriority(currentPriority)}
                  >
                    {currentPriority}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button
              title={typeModalIsAdd ? "Add" : "Edit"}
              disabled={!title}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditTaskForm;
