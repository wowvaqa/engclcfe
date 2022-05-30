import React, { useState, useEffect } from "react";
import axios from "axios";

import { useGlobalContext } from "../Context";

const TsecReinfApi = () => {
  const {
    setModalWaitText,
    setModalWaitShow,
    tReinforcedConcreteData,
    setTreinforcedConcreteDataFromApi,
    apiTrigger,
    setApiTrigger,
  } = useGlobalContext();

  /* JSON Api data */
  const [as1, setAs1] = useState(0);
  const [ns1, setNs1] = useState(0);
  const [as2, setAs2] = useState(0);
  const [ns2, setNs2] = useState(0);
  const [remark, setRemark] = useState("");
  const [remark2, setRemark2] = useState("");

  useEffect(() => {
    console.log(
      "(TSecApi) Reciving data to send for API: " + tReinforcedConcreteData
    );
    console.log(tReinforcedConcreteData);
    console.log(apiTrigger);
    if (
      apiTrigger.isButtonPressed &&
      apiTrigger.isNoErrors &&
      !apiTrigger.isWaitForAction
    ) {
      console.log(
        "(TSecApi) Data from RectDouble are ready, sending data to BackEND"
      );
      initSendData(tReinforcedConcreteData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tReinforcedConcreteData, apiTrigger]);

  useEffect(() => {
    console.log(
      "(TSecApi) as1, ns1, as2, ns2, remark, remark2 IS CHANGE, BACKEND RESPONDE: " +
        as1 +
        " " +
        ns1 +
        " " +
        as2 +
        " " +
        ns2 +
        " " +
        remark +
        " " +
        remark2
    );
    const dataFromApi = { as1, ns1, as2, ns2, remark, remark2 };
    setTreinforcedConcreteDataFromApi(dataFromApi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [as1, ns1, as2, ns2, remark, remark2]);

  async function initSendData() {
    setModalWaitShow(true);
    setModalWaitText("Please wait...");
    await axios
      .post(
        "https://django-civil-85.herokuapp.com/api/civil_calcs/t_sect_ben_reinf",
        {
          name: tReinforcedConcreteData.name,
          b: tReinforcedConcreteData.b,
          h: tReinforcedConcreteData.h,
          h_sl: tReinforcedConcreteData.h_sl,
          b_eff: tReinforcedConcreteData.b_eff,
          cl_conc: tReinforcedConcreteData.cl_conc,
          cl_steel: tReinforcedConcreteData.cl_steel,
          c: tReinforcedConcreteData.c,
          fi: tReinforcedConcreteData.fi,
          fi_s: tReinforcedConcreteData.fi_s,
          fi_opp: tReinforcedConcreteData.fi_opp,
          m_sd: tReinforcedConcreteData.m_sd,
        }
      )
      .then(
        (response) => {
          setAs1(response.data.As1);
          setNs1(response.data.ns1);
          setAs2(response.data.As2);
          setNs2(response.data.ns2);
          setRemark(response.data.remark);
          setRemark2(response.data.remark2);
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

export default TsecReinfApi;
