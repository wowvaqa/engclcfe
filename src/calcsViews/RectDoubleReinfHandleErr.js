import React, { useEffect } from "react";

import { useGlobalContext } from "../Context";

const RectDoubleReinfHandleErr = () => {
  const {
    setModalInfoShow,
    setModalInfoText,
    doubleReinforcedConcreteData,
    doubleReinforcedDataModel,
    setDoubleReinforcedDataModel,
  } = useGlobalContext();

  useEffect(() => {
    console.log(
      "Reciving data to send for error handling: " +
        doubleReinforcedConcreteData
    );
    handleErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doubleReinforcedConcreteData]);

  const handleErrors = () => {
    var dataReady = true;

    if (doubleReinforcedConcreteData.name === "") {
      setModalInfoText("Invalid value : 'name'");
      setModalInfoShow(true);
      dataReady = false;
    }

    if (
      Number.isNaN(doubleReinforcedConcreteData.b) ||
      doubleReinforcedConcreteData.b <= 0
    ) {
      setModalInfoText("Invalid value : 'b'");
      setModalInfoShow(true);
      dataReady = false;
    }

    if (
      Number.isNaN(doubleReinforcedConcreteData.h) ||
      doubleReinforcedConcreteData.h <= 0
    ) {
      setModalInfoText("Invalid value : 'h'");
      setModalInfoShow(true);
      dataReady = false;
    }

    if (
      Number.isNaN(doubleReinforcedConcreteData.c) ||
      doubleReinforcedConcreteData.c <= 0
    ) {
      setModalInfoText("Invalid value : 'c'");
      setModalInfoShow(true);
      dataReady = false;
    }

    if (
      Number.isNaN(doubleReinforcedConcreteData.no_of_bars) ||
      doubleReinforcedConcreteData.no_of_bars <= 0
    ) {
      setModalInfoText("Invalid value : 'number of bars'");
      setModalInfoShow(true);
      dataReady = false;
    }

    if (
      Number.isNaN(doubleReinforcedConcreteData.fi_s) ||
      doubleReinforcedConcreteData.fi_s <= 0
    ) {
      setModalInfoText("Invalid value : 'fi_s'");
      setModalInfoShow(true);
      dataReady = false;
    }

    if (
      Number.isNaN(doubleReinforcedConcreteData.fi_opp) ||
      doubleReinforcedConcreteData.fi_opp <= 0
    ) {
      setModalInfoText("Invalid value : 'fi_opp'");
      setModalInfoShow(true);
      dataReady = false;
    }

    if (
      Number.isNaN(doubleReinforcedConcreteData.no_of_opp_bars) ||
      doubleReinforcedConcreteData.no_of_opp_bars <= 0
    ) {
      setModalInfoText("Invalid value : 'no_of_opp_bars'");
      setModalInfoShow(true);
      dataReady = false;
    }

    setupDataModel(dataReady);
  };

  /**
   *
   * @param {*} props
   */
  const setupDataModel = (props) => {
    const isButtonPressed = doubleReinforcedDataModel.isButtonPressed;
    const isNoErrors = props;
    const isWaitForAction = doubleReinforcedDataModel.isWaitForAction;

    const dataModel = { isButtonPressed, isNoErrors, isWaitForAction };

    setDoubleReinforcedDataModel(dataModel);
  };

  return <></>;
};

export default RectDoubleReinfHandleErr;
