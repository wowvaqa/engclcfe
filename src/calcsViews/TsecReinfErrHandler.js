import React, { useEffect } from "react";

import { useGlobalContext } from "../Context";

const TsecReinfErrHandler = () => {
  const {
    setModalInfoShow,
    setModalInfoText,
    setModalInputText,
    setModalInputShow,
    tReinforcedConcreteData,
    apiTrigger,
    setApiTrigger,
  } = useGlobalContext();

  useEffect(() => {
    console.log("[TSecCalc] Reciving data to send for error handling: ");
    console.log(tReinforcedConcreteData);
    handleErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tReinforcedConcreteData]);

  const handleErrors = () => {
    var dataReady = true;
    var waitForDataConfirm = false;
    var confirmationText = "";

    if (tReinforcedConcreteData.name === "") {
      setModalInfoText("Invalid value : 'name'"); 
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(tReinforcedConcreteData.b) ||
      tReinforcedConcreteData.b <= 0
    ) {
      setModalInfoText("Invalid value : 'b'"); 
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(tReinforcedConcreteData.h) ||
      tReinforcedConcreteData.h <= 0
    ) {
      setModalInfoText("Invalid value : 'h'"); 
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(tReinforcedConcreteData.h_sl) ||
      tReinforcedConcreteData.h_sl <= 0
    ) {
      setModalInfoText("Invalid value : 'h_sl'"); 
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(tReinforcedConcreteData.b_eff) ||
      tReinforcedConcreteData.b_eff <= 0
    ) {
      setModalInfoText("Invalid value : 'b_eff'"); 
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(tReinforcedConcreteData.c) ||
      tReinforcedConcreteData.c <= 0
    ) {
      setModalInfoText("Invalid value : 'c'"); 
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(tReinforcedConcreteData.fi) ||
      tReinforcedConcreteData.fi <= 0
    ) {
      setModalInfoText("Invalid value : 'fi'"); 
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(tReinforcedConcreteData.h_sl) ||
      tReinforcedConcreteData.h_sl <= 0
    ) {
      setModalInfoText("Invalid value : 'h_sl'"); 
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(tReinforcedConcreteData.fi_s) ||
      tReinforcedConcreteData.fi_s <= 0
    ) {
      setModalInfoText("Invalid value : 'fi_s'"); 
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(tReinforcedConcreteData.fi_opp) ||
      tReinforcedConcreteData.fi_opp <= 0
    ) {
      setModalInfoText("Invalid value : 'fi_opp'"); 
      setModalInfoShow(true);
      dataReady = false;
    } else if (
      Number.isNaN(tReinforcedConcreteData.m_sd) ||
      tReinforcedConcreteData.m_sd <= 0
    ) {
      setModalInfoText("Invalid value : 'm_sd'"); 
      setModalInfoShow(true);
      dataReady = false;
    }

    if (tReinforcedConcreteData.b > 2) {
      confirmationText =
        confirmationText +
        "Value 'b', are you sure you entered the given values in meters? \n";
      waitForDataConfirm = true;
    }
    if (tReinforcedConcreteData.h > 4) {
      confirmationText =
        confirmationText +
        "Value 'h', are you sure you entered the given values in meters? \n";
      waitForDataConfirm = true;
    }
    if (tReinforcedConcreteData.c < 20) {
      confirmationText =
        confirmationText +
        "The concrete cover is rarely smaller than 20 mm, are you sure of this decision? \n";
      waitForDataConfirm = true;
    } else if (tReinforcedConcreteData.c > 70) {
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

export default TsecReinfErrHandler;
