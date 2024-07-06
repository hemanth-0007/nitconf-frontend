import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const DeleteConfirmationModal = ({ id, onDelete , show, handleClose}) => {
 

  const handleDelete = async () => {
    await onDelete(id);
    handleClose();
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

 
  return (
    <>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to delete?
          </Typography>
          <Button className="bg-black text-white p-3 rounded-md " onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteConfirmationModal;
