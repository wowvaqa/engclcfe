//import { Rect, Stage, Layer, Line, Circle, TextPath } from "react-konva";

import DynamicDrawInput from "./DynamicDrawInput";
import React, { useState, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";

import { useGlobalContext } from "../Context";

/**
 *
 * @param {*} props
 * @returns
 */
const DynamicDraw = (props) => {
  const [outlineData, setOutlineData] = useState([]);
  const [coordsForDraw, setCoordsForDraw] = useState([]);

  const { dynamicDrawData } = useGlobalContext();

  var coords = [];

  useEffect(() => {
    console.log("(Dynamic Draw) Dynamic draw data changed! ", dynamicDrawData);
    setOutlineData(dynamicDrawData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dynamicDrawData]);

  useEffect(() => {
    convertData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outlineData]);

  /**
   * Convert data from callback function (DynamicDrawInput view) into figure coords array
   */
  const convertData = () => {
    if (outlineData.length > 0) {
      setCoordsForDraw([]);
      // eslint-disable-next-line array-callback-return
      outlineData.map((prop) => {
        coords.push(prop.x);
        coords.push(prop.y);
      });

      setCoordsForDraw(coords);
      console.log("coorArray for dynamic drawing: ", coordsForDraw);
    }
  };

  return (
    <>
      <Stage width={400} height={400}>
        <Layer>
          <ConcreteRect coordsForDraw={coordsForDraw} />
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
  console.log("PROPS: ", props.coordsForDraw);
  return (
    <>
      <Line points={props.coordsForDraw} stroke={"black"} strokeWidth={2} />
    </>
  );
};

export default DynamicDraw;
