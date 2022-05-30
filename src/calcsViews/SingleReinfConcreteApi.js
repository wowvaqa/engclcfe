import React, { useState, useEffect } from "react";
import axios from "axios";

import { useGlobalContext } from "../Context";

const SingleReinfConcreteApi = () => {
  const {
    setModalWaitText,
    setModalWaitShow,
    singleDimensioningData,
    setSingleDimensioningDataFromApi,
    apiTrigger,
    setApiTrigger,
  } = useGlobalContext();

  /* JSON Api data */
  const [m_rd, setM_rd] = useState(0);
  const [ksi_eff, setKsi_eff] = useState(0);
  const [x_eff, setX_eff] = useState(0);

  useEffect(() => {
    console.log(
      "(SingleCalcApi) Reciving data to send for API: " + singleDimensioningData
    );
    console.log(singleDimensioningData);
    console.log(apiTrigger);
    if (
      apiTrigger.isButtonPressed &&
      apiTrigger.isNoErrors &&
      !apiTrigger.isWaitForAction
    ) {
      console.log("(SingleCalcApi) Data are ready, sending data to BackEND");
      initSendData(singleDimensioningData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleDimensioningData, apiTrigger]);

  useEffect(() => {
    console.log(
      "(TSecApi) as1, ns1, as2, ns2, remark, remark2 IS CHANGE, BACKEND RESPONDE: " +
        m_rd +
        " " +
        ksi_eff +
        " " +
        x_eff
    );

    const dataFromApi = { m_rd, ksi_eff, x_eff };
    setSingleDimensioningDataFromApi(dataFromApi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [m_rd, ksi_eff, x_eff]);

  async function initSendData() {
    setModalWaitShow(true);
    setModalWaitText("Please wait...");
    await axios
      .post(
        "https://django-civil-85.herokuapp.com/api/civil_calcs/rect_sing_reinf",
        {
          name: singleDimensioningData.name,
          b: singleDimensioningData.b,
          h: singleDimensioningData.h,
          cl_conc: singleDimensioningData.cl_conc,
          cl_steel: singleDimensioningData.cl_steel,
          c: singleDimensioningData.c,
          fi: singleDimensioningData.fi,
          no_of_bars: singleDimensioningData.no_of_bars,
          fi_s: singleDimensioningData.fi_s,
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
    resetApiTrigger();
  }

  const resetApiTrigger = () => {
    setApiTrigger({
      isButtonPressed: false,
      isNoErrors: false,
      isWaitForAction: false,
    });
    console.log("(TSecApi) apiTrigger: ");
    console.log(apiTrigger);
  };

  return <></>;
};

export default SingleReinfConcreteApi;
