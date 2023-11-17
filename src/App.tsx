import { useEffect, useState } from "react";
import "./App.scss";
import { ReactComponent as Add } from "./assets/icons/add.svg";
import AddEditTaskForm from "./components/AddEditTaskForm";
import Button from "./components/Button";
import DeleteModal from "./components/DeleteModal";
import TaskCard from "./components/TaskCard";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { initTasks } from "./features/tasks";

const App = () => {
  const dispatch = useAppDispatch();
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [typeModalIsAdd, setTypeModalIsAdd] = useState(true);

  const { tasks: taskList } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(initTasks());
  }, []);

  const handleOpenAddTaskModal = () => {
    setShowAddEditModal(true);
    setTypeModalIsAdd(true);
  };

  const handleChangeShowDeleteModal = (value: boolean) =>
    setShowDeleteModal(value);

  const handleOpenEditModal = () => {
    setShowAddEditModal(true);
    setTypeModalIsAdd(false);
  };

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button
            title="Add Task"
            icon={<Add />}
            onClick={handleOpenAddTaskModal}
          />
        </div>
        <div className="task-container">
          {taskList.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleOpenModalDelete={() => handleChangeShowDeleteModal(true)}
              handleOpenEditModal={handleOpenEditModal}
            />
          ))}
        </div>
      </div>
      {showAddEditModal && (
        <AddEditTaskForm
          closeModalWindow={() => setShowAddEditModal(false)}
          typeModalIsAdd={typeModalIsAdd}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          handleChangeShowDeleteModal={handleChangeShowDeleteModal}
        />
      )}
    </div>
  );
};

export default App;
