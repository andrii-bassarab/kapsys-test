import { useEffect, useState } from "react";
import "./App.scss";
import { ReactComponent as Add } from "./assets/icons/add.svg";
import AddEditTaskForm from "./components/AddEditTaskForm";
import Button from "./components/Button";
import DeleteModal from "./components/DeleteModal";
import TaskCard from "./components/TaskCard";
import { ITask } from "./types/task";
import { getTasks } from "./services/api";

const App = () => {
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [idItemToDelete, setIdItemToDelete] = useState("");
  const [taskToEdit, setTaskToEdit] = useState<ITask>({} as ITask);
  const [typeModalAddEdit, setTypeModalAddEdit] = useState<"add" | "edit">(
    "add"
  );

  useEffect(() => {
    const getDataTasks = async () => {
      const data = await getTasks();
      setTaskList(data);
    };
    getDataTasks();
  }, []);

  const handleOpenAddModal = () => {
    setShowAddEditModal((prev) => !prev);
    setTypeModalAddEdit("add");
  };

  const handleAddTask = (newTask: ITask) => {
    setTaskList((prev) => [newTask, ...prev]);
  };

  const handleDeleteItem = () => {
    setTaskList((prev) => prev.filter((task) => task.id !== idItemToDelete));
    setShowDeleteModal(false);
  };

  const handleOpenModalDelete = (id: string) => {
    setShowDeleteModal(true);
    setIdItemToDelete(id);
  };
  const handleCancelDelete = () => setShowDeleteModal(false);

  const handleOpenEditModal = (taskToEdit: ITask) => {
    setShowAddEditModal(true);
    setTypeModalAddEdit("edit");
    setTaskToEdit(taskToEdit);
  };

  const handleEditItem = (taskToEdit: ITask) => {
    setTaskList((prev) =>
      prev.map((task) => {
        if (taskToEdit?.id === task.id) {
          return taskToEdit;
        }

        return task;
      })
    );
  };

  const handleUpdateStatus = (taskToEditStatus: ITask) => {
    setTaskList((prev) =>
      prev.map((task) => {
        if (taskToEditStatus?.id === task.id) {
          return taskToEditStatus;
        }

        return task;
      })
    );
  };

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button
            title="Add Task"
            icon={<Add />}
            onClick={handleOpenAddModal}
          />
        </div>
        <div className="task-container">
          {taskList.map((task) => (
            <TaskCard
              key={task.id}
              handleOpenModalDelete={handleOpenModalDelete}
              task={task}
              handleOpenEditModal={handleOpenEditModal}
              handleUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      </div>
      {showAddEditModal && (
        <AddEditTaskForm
          closeModalWindow={() => setShowAddEditModal(false)}
          handleAddTask={handleAddTask}
          type={typeModalAddEdit}
          taskToEdit={taskToEdit}
          handleEditItem={handleEditItem}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          handleDeleteItem={handleDeleteItem}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default App;
