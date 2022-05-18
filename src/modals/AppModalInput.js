import { Modal, Button } from "react-bootstrap";

import { useGlobalContext } from "../Context";

const AppModalInput = (props) => {
  const { inputModalOkButtonClick, apiTrigger, setApiTrigger } =
    useGlobalContext();

  const hideModal = (event) => {
    props.onHide();
    setApiTrigger({
      isButtonPressed: apiTrigger.isButtonPressed,
      isNoErrors: apiTrigger.isNoErrors,
      isWaitForAction: false,
    });
    console.log("(AppModalInput)");
    console.log(apiTrigger);
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
            hideModal(event);
            inputModalOkButtonClick();
          }}
        >
          OK
        </Button>
        <Button
          onClick={(event) => {
            hideModal(event);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppModalInput;
