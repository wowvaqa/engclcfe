import { Modal, Button } from "react-bootstrap";
import { useGlobalContext } from "../Context";

const AppModalInput = (props) => {
  const { setModalInputOk, setModalInputCancel } = useGlobalContext();

  const okEvent = (event) => {
    props.onHide();
    setModalInputOk(true);
    event.preventDefault();
  };

  const cancelEvent = (event) => {
    props.onHide();
    setModalInputCancel(true);
    event.preventDefault();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Check input values
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={(event) => {
            props.initSendData();
            okEvent(event);
          }}
        >
          OK
        </Button>
        <Button
          onClick={(event) => {
            cancelEvent(event);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppModalInput;
