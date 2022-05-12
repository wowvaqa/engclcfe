import React, { useState, useEffect } from "react";
import axios from "axios";

import { useGlobalContext } from "../Context";

const RectDoubleReinfApi = () => {
  const {
    doubleReinforcedConcreteData,
    setDoubleReinforcedConcreteDataFromApi,
  } = useGlobalContext();

  /* JSON Api data */
  const [m_rd, setM_rd] = useState(0);
  const [ksi_eff, setKsi_eff] = useState(0);
  const [x_eff, setX_eff] = useState(0);

  useEffect(() => {
    console.log(
      "Reciving data to send for API: " + doubleReinforcedConcreteData
    );
    initSendData(doubleReinforcedConcreteData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doubleReinforcedConcreteData]);

  async function initSendData() {
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

          const dataFromApi = { m_rd, ksi_eff, x_eff };
          setDoubleReinforcedConcreteDataFromApi(dataFromApi);
          console.log(
            "Double calc data from API: " +
              dataFromApi.m_rd +
              " " +
              dataFromApi.ksi_eff +
              " " +
              dataFromApi.x_eff
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return <></>;
};

export default RectDoubleReinfApi;
