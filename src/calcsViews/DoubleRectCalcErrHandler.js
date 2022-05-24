import React, { useEffect } from "react";

import { useGlobalContext } from "../Context";

const DoubleRectCalcErrHandler = () => {
  const {
    setModalInfoShow,
    setModalInfoText,
    setModalInputText,
    setModalInputShow,
    doubleReinforcedConcreteData,
    apiTrigger,
    setApiTrigger,
  } = useGlobalContext();

  useEffect(() => {
    console.log("Reciving data to send for error handling: ");
    console.log(doubleReinforcedConcreteData);
    handleErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doubleReinforcedConcreteData]);

  const handleErrors = () => {
    var dataReady = true;
    var waitForDataConfirm = false;
    var confirmationText = "";

    if (doubleReinforcedConcreteData.name === "") {
      setModalInfoText("Invalid value : 'name'");
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(doubleReinforcedConcreteData.b) ||
      doubleReinforcedConcreteData.b <= 0
    ) {
      setModalInfoText("Invalid value : 'b'");
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(doubleReinforcedConcreteData.h) ||
      doubleReinforcedConcreteData.h <= 0
    ) {
      setModalInfoText("Invalid value : 'h'");
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(doubleReinforcedConcreteData.c) ||
      doubleReinforcedConcreteData.c <= 0
    ) {
      setModalInfoText("Invalid value : 'c'");
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(doubleReinforcedConcreteData.no_of_bars) ||
      doubleReinforcedConcreteData.no_of_bars <= 0
    ) {
      setModalInfoText("Invalid value : 'number of bars'");
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(doubleReinforcedConcreteData.fi_s) ||
      doubleReinforcedConcreteData.fi_s <= 0
    ) {
      setModalInfoText("Invalid value : 'fi_s'");
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(doubleReinforcedConcreteData.fi_opp) ||
      doubleReinforcedConcreteData.fi_opp <= 0
    ) {
      setModalInfoText("Invalid value : 'fi_opp'");
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(doubleReinforcedConcreteData.no_of_opp_bars) ||
      doubleReinforcedConcreteData.no_of_opp_bars <= 0
    ) {
      setModalInfoText("Invalid value : 'no_of_opp_bars'");
      setModalInfoShow(true);
      dataReady = false;
    }

    if (doubleReinforcedConcreteData.b > 2) {
      confirmationText =
        confirmationText +
        "Value 'b', are you sure you entered the given values in meters? \n";
      waitForDataConfirm = true;
    }
    if (doubleReinforcedConcreteData.h > 4) {
      confirmationText =
        confirmationText +
        "Value 'h', are you sure you entered the given values in meters? \n";
      waitForDataConfirm = true;
    }
    if (doubleReinforcedConcreteData.c < 20) {
      confirmationText =
        confirmationText +
        "The concrete cover is rarely smaller than 20 mm, are you sure of this decision? \n";
      waitForDataConfirm = true;
    } else if (doubleReinforcedConcreteData.c > 70) {
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

export default DoubleRectCalcErrHandler;
