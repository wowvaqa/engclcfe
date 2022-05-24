import React, { useEffect } from "react";

import { useGlobalContext } from "../Context";

const RectFindReinfErrHandler = () => {
  const {
    setModalInfoShow,
    setModalInfoText,
    setModalInputText,
    setModalInputShow,
    singleDimensioningData,
    apiTrigger,
    setApiTrigger,
  } = useGlobalContext();

  useEffect(() => {
    console.log(
      "[SingleRectFindErrHand] Reciving data to send for error handling: "
    );
    console.log(singleDimensioningData);
    handleErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleDimensioningData]);

  const handleErrors = () => {
    var dataReady = true;
    var waitForDataConfirm = false;
    var confirmationText = "";

    if (singleDimensioningData.name === "") {
      setModalInfoText("Invalid value : 'name'");
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(singleDimensioningData.b) ||
      singleDimensioningData.b <= 0
    ) {
      setModalInfoText("Invalid value : 'b'");
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(singleDimensioningData.h) ||
      singleDimensioningData.h <= 0
    ) {
      setModalInfoText("Invalid value : 'h'");
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(singleDimensioningData.c) ||
      singleDimensioningData.c <= 0
    ) {
      setModalInfoText("Invalid value : 'c'");
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(singleDimensioningData.fi_s) ||
      singleDimensioningData.fi_s <= 0
    ) {
      setModalInfoText("Invalid value : 'fi_s'");
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(singleDimensioningData.fi_opp) ||
      singleDimensioningData.fi_opp <= 0
    ) {
      setModalInfoText("Invalid value : 'fi_opp'");
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(singleDimensioningData.fi) ||
      singleDimensioningData.fi <= 0
    ) {
      setModalInfoText("Invalid value : 'fi'");
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(singleDimensioningData.m_sd) ||
      singleDimensioningData.m_sd <= 0
    ) {
      setModalInfoText("Invalid value : 'm_sd'");
      setModalInfoShow(true);
      dataReady = false;
    }

    if (singleDimensioningData.b > 2) {
      confirmationText =
        confirmationText +
        "Value 'b', are you sure you entered the given values in meters? \n";
      waitForDataConfirm = true;
    }
    if (singleDimensioningData.h > 4) {
      confirmationText =
        confirmationText +
        "Value 'h', are you sure you entered the given values in meters? \n";
      waitForDataConfirm = true;
    }
    if (singleDimensioningData.c < 20) {
      confirmationText =
        confirmationText +
        "The concrete cover is rarely smaller than 20 mm, are you sure of this decision? \n";
      waitForDataConfirm = true;
    } else if (singleDimensioningData.c > 70) {
      confirmationText =
        confirmationText +
        "the concrete cover is rarely grater than 70 mm, are you sure of this decision? \n";
      waitForDataConfirm = true;
    }

    if (waitForDataConfirm) {
      setModalInputText(confirmationText);
      setModalInputShow(true);
    }

    setupDataModel(dataReady, waitForDataConfirm);
  };

  /**
   *
   * @param {*} props
   */
  const setupDataModel = (dataReady, waitForDataConfirm) => {
    const isButtonPressed = apiTrigger.isButtonPressed;
    const isNoErrors = dataReady;
    const isWaitForAction = waitForDataConfirm;

    const dataModel = { isButtonPressed, isNoErrors, isWaitForAction };

    setApiTrigger(dataModel);
  };

  return <></>;
};

export default RectFindReinfErrHandler;
