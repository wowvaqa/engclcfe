import React, { useState, useEffect } from "react";
import axios from "axios";

import { useGlobalContext } from "../Context";

const RectFindReinfApi = () => {
  const {
    setModalWaitText,
    setModalWaitShow,
    singleDimensioningData,
    setSingleDimensioningDataDataFromApi,
    apiTrigger,
    setApiTrigger,
  } = useGlobalContext();

  /* JSON Api data */
  const [as1, setAs1] = useState(0);
  const [ns1, setNs1] = useState(0);
  const [as2, setAs2] = useState(0);
  const [ns2, setNs2] = useState(0);
  const [remark, setRemark] = useState("");

  useEffect(() => {
    console.log("(RectFindAPI) Reciving data to send for API: ");
    console.log(singleDimensioningData);
    console.log(apiTrigger);
    if (
      apiTrigger.isButtonPressed &&
      apiTrigger.isNoErrors &&
      !apiTrigger.isWaitForAction
    ) {
      console.log(
        "(RectFindAPI) Data from RectDouble are ready, sending data to BackEND"
      );
      initSendData(singleDimensioningData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleDimensioningData, apiTrigger]);

  useEffect(() => {
    console.log(
      "(RectFindAPI) as1, ns1, as2, ns2, remark IS CHANGE, BACKEND RESPONDE: " +
        as1 +
        " " +
        ns1 +
        " " +
        as2 +
        " " +
        ns2 +
        " " +
        remark
    );
    const dataFromApi = { as1, ns1, as2, ns2, remark };
    setSingleDimensioningDataDataFromApi(dataFromApi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [as1, ns1, as2, ns2, remark]);

  async function initSendData() {
    setModalWaitShow(true);
    setModalWaitText("Please wait...");
    await axios
      .post(
        "https://django-civil-85.herokuapp.com/api/civil_calcs/rect_find_reinf",
        {
          name: singleDimensioningData.name,
          b: singleDimensioningData.b,
          h: singleDimensioningData.h,
          cl_conc: singleDimensioningData.cl_conc,
          cl_steel: singleDimensioningData.cl_steel,
          c: singleDimensioningData.c,
          fi: singleDimensioningData.fi,
          fi_s: singleDimensioningData.fi_s,
          fi_opp: singleDimensioningData.fi_opp,
          m_sd: singleDimensioningData.m_sd,
        }
      )
      .then(
        (response) => {
          setAs1(response.data.As1);
          setNs1(response.data.ns1);
          setAs2(response.data.As2);
          setNs2(response.data.ns2);
          setRemark(response.data.remark);
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
    console.log("(RectFindAPI) singleDimensioningData: ");
    console.log(apiTrigger);
  };

  return <></>;
};

export default RectFindReinfApi;
