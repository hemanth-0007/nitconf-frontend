import "./index.css";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import pdfIcon from "../../assets/pdfIcon.jpg";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

const DashboardCard = (props) => {
  // useHistory hook
  const history = useHistory();
  // data from props
  const { id, cardDetails, onDeleteSession } = props;
  const { title } = cardDetails;

  const [show, setShow] = useState(false);

  const handleDelete = async (cur_id) => {
    
    try {
      console.log("Delete triggered");
      await onDeleteSession(cur_id);
      handleClose();
    } catch (error) {
      console.log(`Error in deleting the paper : ${error.message}`);
    }

  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickNavigate = () => history.push(`/dashboard/${id}`);

 
  return (
    <>
      <li className="card m-3">
        <img
          src={pdfIcon}
          alt={title}
          onClick={onClickNavigate}
          className="card-image"
        />
        <div className="flex flex-row justify-evenly items-center">
          <h2 onClick={onClickNavigate} className="card-title">
            {title}
          </h2>
          <MdDelete className="size-5 mb-2
                                hover:text-red-600
                                hover:bg-slate-300 rounded-md" onClick={handleShow} />
        </div>
      </li>
     <DeleteConfirmationModal id = {id} onDelete={handleDelete} show = {show} handleClose={handleClose} />
    </>
  );
};

export default DashboardCard;
