import DynamicDrawInput from "./DynamicDrawInput";
import React, { useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";

import { useGlobalContext } from "../Context";

import Outline from "./Outline";
import Inline from "./Inline";

/**
 * Dynamiczny skalowalny rysunek figury. 
 * @param {*} props
 * @returns
 */
const DynamicDraw = () => {
  /* Tablica zawierająca wspórzędne rysunku z widoku wprowadzania danych*/
   const [outlineData, setOutlineData] = useState([]);
  /* Grubość linii rysunku */
  const [strokeWidth, setStrokeWidth] = useState(2);
  
  const { dynamicDrawData, drawProperties } = useGlobalContext();

  useEffect(() => {
    console.log("(Dynamic Draw) Dynamic draw data changed! ", dynamicDrawData, outlineData);
    setOutlineData(dynamicDrawData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dynamicDrawData]);

  useEffect(() => {
    console.log("(Dynamic Draw) draw properties has change ", drawProperties);
    setStrokeWidth(drawProperties.strokeWidth);    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawProperties]);

  return (
    <>
      <Stage width={800} height={400}>      
        <Layer>
          <Inline  
            dynamicDrawData={dynamicDrawData}            
            strokeWidth={strokeWidth}
          />
          <Outline  
            dynamicDrawData={dynamicDrawData}            
            strokeWidth={strokeWidth}
          />
        </Layer>
      </Stage>
      <DynamicDrawInput />
    </>
  );
};

/**
 * Overall cross-section of reinforced concrete
 * @param {hValue, bValue, xyOffset, thickness} props
 */

export default DynamicDraw;
