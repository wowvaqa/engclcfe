import React, { useState, useEffect } from "react";
import axios from "axios";

import { useGlobalContext } from "../Context";

const RectFindReinfApi = () => {
  const { singleDimensioningData, setSingleDimensioningDataDataFromApi } =
    useGlobalContext();

  /* JSON Api data */
  const [as1, setAs1] = useState(0);
  const [ns1, setNs1] = useState(0);
  const [as2, setAs2] = useState(0);
  const [ns2, setNs2] = useState(0);
  const [remark, setRemark] = useState("");

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

  useEffect(() => {
    console.log(
      "(RectFindAPI) Reciving data to send for API: " + singleDimensioningData
    );
    initSendData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleDimensioningData]);

  async function initSendData() {
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

          const dataFromApi = { as1, ns1, as2, ns2, remark };
          setSingleDimensioningDataDataFromApi(dataFromApi);
          console.log("(RectFindAPI) Double calc data from API: ");
          console.log(dataFromApi);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return <></>;
};

export default RectFindReinfApi;
