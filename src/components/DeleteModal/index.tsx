import Button from "../Button";
import Modal from "../Modal";
import "./style.scss";

interface IProps {
  handleDeleteItem: (id: string) => void;
  handleCancelDelete: () => void;
}

const DeleteModal: React.FC<IProps> = ({
  handleDeleteItem,
  handleCancelDelete,
}) => {
  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button title="Delete" onClick={() => handleDeleteItem("")} />
          <Button title="Cancel" outline onClick={handleCancelDelete} />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
