import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteTask } from "../../features/tasks";
import Button from "../Button";
import Modal from "../Modal";
import "./style.scss";

interface IProps {
  handleChangeShowDeleteModal: (value: boolean) => void;
}

const DeleteModal: React.FC<IProps> = ({ handleChangeShowDeleteModal }) => {
  const dispatch = useAppDispatch();
  const { idTaskToDelete } = useAppSelector((state) => state.tasks);

  const handleDeleteTask = () => {
    handleChangeShowDeleteModal(false);
    dispatch(deleteTask(idTaskToDelete));
  };

  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button title="Delete" onClick={handleDeleteTask} />
          <Button
            title="Cancel"
            outline
            onClick={() => handleChangeShowDeleteModal(false)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
