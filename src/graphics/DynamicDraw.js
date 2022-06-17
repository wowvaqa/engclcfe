import DynamicDrawInput from "./DynamicDrawInput";
import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Line, Rect } from "react-konva";

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
    console.log("(Dynamic Draw) Dynamic draw data changed! ", dynamicDrawData);
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
          <Outline  
            dynamicDrawData={dynamicDrawData}            
            strokeWidth={strokeWidth}
          />          
          {/* <Inline inlineData={inlineData}/> */}
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
const ConcreteRect = (props) => {
  console.log("PROPS: ", props.coordsForDraw, " width: ", props.strokeWidth);
  return (
    <>
      <Rect
        x={1}
        y={1}
        width={797}
        height={397}
        stroke={"green"}
        strokeWidth={1}
        cornerRadius={0}
      />
      <Line
        points={props.coordsForDraw}
        stroke={"black"}
        strokeWidth={props.strokeWidth}
      />
    </>
  );
};

export default DynamicDraw;
