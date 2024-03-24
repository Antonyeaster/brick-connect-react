import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ModalConfirmation = ({ handleMethod, show, setShow, body }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <strong>
            <p>{body}</p>
          </strong>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button onClick={handleMethod} variant="danger">
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmation;
