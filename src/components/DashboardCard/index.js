import "./index.css";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import pdfIcon from "../../assets/pdfIcon.jpg";

const DashboardCard = (props) => {
  // useHistory hook
  const history = useHistory();
  // data from props
  const { id, cardDetails, onDeleteSession } = props;
  const { title } = cardDetails;

  const [show, setShow] = useState(false);

  const handleDelete = () => {
    console.log("Delete triggered");
    onDeleteSession(id);
    handleClose();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickNavigate = () => history.push(`/dashboard/${id}`);

  const renderDeleteConfirmationModal = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete?</Modal.Body>
          <Modal.Footer>
            <Button
              className="bg-slate-700"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600"
              variant="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  return (
    <>
      <li className="card m-3">
        <img
          src={pdfIcon}
          alt={title}
          onClick={onClickNavigate}
          className="card-image"
        />
        <div className="flex flex-col justify-center items-center">
          <h2 onClick={onClickNavigate} className="card-title">
            {title}
          </h2>
          <MdDelete className="size-5" onClick={handleShow} />
        </div>
      </li>
      {renderDeleteConfirmationModal()}
    </>
  );
};

export default DashboardCard;
