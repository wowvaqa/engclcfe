import React from "react";
import { Modal, Button } from "react-bootstrap";

const AppModalWait = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Calculations in progress
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="error" onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppModalWait;
