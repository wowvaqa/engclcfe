/**
 * Class for handle errors and from Reinforced Concrete Calc
 */

import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../Context";

const ReinforcedConcreteHandleError = () => {
  const {
    setModalInputText,
    setModalInfoShow,
    setModalInfoText,
    reinforcedConcreteData,
    setModalInputShow,
    modalInputOkState,
    inputModalOkButtonClick,
  } = useGlobalContext();

  const isErr = useRef(false);
  const isModalInputButtonOkClicked = useRef(false);
  const inputModalOkButtonClickRef = useRef();
  inputModalOkButtonClickRef.current = inputModalOkButtonClick;

  useEffect(() => {
    handeError(reinforcedConcreteData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reinforcedConcreteData]);

  useEffect(() => {
    if (modalInputOkState) {
      isModalInputButtonOkClicked.current = false;
      //initSendData();
      inputModalOkButtonClickRef.current();
      console.log("OK_PRESSED: is TRUE");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalInputOkState, inputModalOkButtonClickRef]);

  const handeError = (errorData) => {
    const bValue = errorData.bValue;
    const hValue = errorData.hValue;
    const cValue = errorData.cValue;

    console.log("B: " + bValue + " H:" + hValue + " C: " + cValue);

    if (Number.isNaN(bValue) || bValue <= 0) {
      setModalInfoText("Invalid value : 'b'");
      setModalInfoShow(true);
      isErr.current = true;
      console.log("B is NAN or b value <= 0 isErr: " + isErr.current);
    }

    if (Number.isNaN(hValue) || hValue <= 0) {
      setModalInfoText("Invalid value : 'h'");
      setModalInfoShow(true);
      isErr.current = true;
      console.log("h is NAN or h value <= 0 isErr: " + isErr.current);
    }

    if (bValue > 2) {
      isModalInputButtonOkClicked.current = true;
      setModalInputText(
        "Value 'b', are you sure you entered the given values in meters?"
      );
      setModalInputShow(true);
    }

    if (hValue > 4) {
      isModalInputButtonOkClicked.current = true;
      setModalInputText(
        "Value 'h', are you sure you entered the given values in meters?"
      );
      setModalInputShow(true);
    }

    if (Number.isNaN(cValue) || cValue <= 0) {
      setModalInfoText("Invalid value : 'c'");
      setModalInfoShow(true);
      isErr.current = true;
      console.log("c is NAN or c value <= 0 isErr: " + isErr.current);
    }

    if (cValue < 20) {
      isModalInputButtonOkClicked.current = true;
      setModalInputText(
        "The concrete cover is rarely smaller than 20 mm, are you sure of this decision?"
      );
      setModalInputShow(true);
    }

    if (cValue > 70) {
      isModalInputButtonOkClicked.current = true;
      setModalInputText(
        "the concrete cover is rarely grater than 70 mm, are you sure of this decision?"
      );
      setModalInputShow(true);
    }
  };

  return <></>;
};
export default ReinforcedConcreteHandleError;
