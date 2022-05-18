import React, { useState, useEffect } from "react";
import axios from "axios";

import { useGlobalContext } from "../Context";

const RectDoubleReinfApi = () => {
  const {
    setModalWaitText,
    setModalWaitShow,
    doubleReinforcedConcreteData,
    setDoubleReinforcedConcreteDataFromApi,
    doubleReinforcedDataModel,
    setDoubleReinforcedDataModel,
  } = useGlobalContext();

  /* JSON Api data */
  const [m_rd, setM_rd] = useState(0);
  const [ksi_eff, setKsi_eff] = useState(0);
  const [x_eff, setX_eff] = useState(0);

  useEffect(() => {
    console.log("(DoubleReinAPI) Reciving data to send for API: ");
    console.log(doubleReinforcedConcreteData);
    console.log(doubleReinforcedDataModel);
    if (
      doubleReinforcedDataModel.isButtonPressed &&
      doubleReinforcedDataModel.isNoErrors &&
      !doubleReinforcedDataModel.isWaitForAction
    ) {
      console.log(
        "(DoubleReinAPI) Data from RectDouble are ready, sending data to BackEND"
      );
      initSendData(doubleReinforcedConcreteData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doubleReinforcedConcreteData, doubleReinforcedDataModel]);

  useEffect(() => {
    console.log(
      "(DoubleReinAPI) m_rd, ksi_eff, x_eff IS CHANGE, BACKEND RESPONDE: " +
        m_rd +
        " " +
        ksi_eff +
        " " +
        x_eff
    );
    const dataFromApi = { m_rd, ksi_eff, x_eff };
    setDoubleReinforcedConcreteDataFromApi(dataFromApi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [m_rd, ksi_eff, x_eff]);

  const resetModelData = () => {
    setDoubleReinforcedDataModel({
      isButtonPressed: false,
      isNoErrors: false,
      isWaitForAction: false,
    });
    console.log("(DoubleReinAPI) doubleReinforcedDataModel: ");
    console.log(doubleReinforcedDataModel);
  };

  async function initSendData() {
    setModalWaitShow(true);
    setModalWaitText("Please wait...");
    await axios
      .post(
        "https://django-civil-85.herokuapp.com/api/civil_calcs/rect_double_reinf",
        {
          name: doubleReinforcedConcreteData.name,
          b: doubleReinforcedConcreteData.b,
          h: doubleReinforcedConcreteData.h,
          cl_conc: doubleReinforcedConcreteData.cl_conc,
          cl_steel: doubleReinforcedConcreteData.cl_steel,
          c: doubleReinforcedConcreteData.c,
          fi: doubleReinforcedConcreteData.fi,
          no_of_bars: doubleReinforcedConcreteData.no_of_bars,
          fi_s: doubleReinforcedConcreteData.fi_s,
          fi_opp: doubleReinforcedConcreteData.fi_opp,
          no_of_opp_bars: doubleReinforcedConcreteData.no_of_opp_bars,
        }
      )
      .then(
        (response) => {
          setM_rd(response.data.m_rd);
          setKsi_eff(response.data.ksi_eff);
          setX_eff(response.data.x_eff);
          setModalWaitShow(false);
        },
        (error) => {
          console.log(error);
        }
      );
    resetModelData();
  }

  return <></>;
};

export default RectDoubleReinfApi;
