import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const inputData = () =>{
    nameValue = "";
    bValue = 0.5;
    hValue = 1;
    concreteClassValue = "C30_37";
    steelTypeValue = "BSt500S";
    cValue = 30;
    fiValue = 32;
    noOfBarsValue = 8;
    fiSValue = 12
}

const ReinforcedConcreteCalcApi = () => {
    //const [inputDataState, inputDataState] = useState(inputData)

    async function sendData() {
        //setModalWaitShow(true);
        //setModalWaitText("Please wait...");
        await axios
          .post(
            "https://django-civil-85.herokuapp.com/api/civil_calcs/rect_sing_reinf",
            {
              name: inputData.nameValue,
              b: inputData.bValue,
              h: inputData.hValue,
              cl_conc: inputData.concreteClassValue,
              cl_steel: inputData.steelTypeValue,
              c: inputData.cValue,
              fi: inputData.fiValue,
              no_of_bars: inputData.noOfBarsValue,
              fi_s: inputData.fiSValue,
            }
          )
          .then(
            (response) => {
              setM_rd(response.data.m_rd);
              setKsi_eff(response.data.ksi_eff);
              setX_eff(response.data.x_eff);
              setModalWaitShow(false);
              setIsCollapseOpen(true);
              isErr.current = false;
            },
            (error) => {
              console.log(error);
            }
          );
      }
};

export default ReinforcedConcreteCalcApi;