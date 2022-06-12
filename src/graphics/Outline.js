import React, { useState, useEffect } from "react";
import { Stage, Layer, Line, Rect } from "react-konva";

// import { useGlobalContext } from "../Context";

const Outline = (props) => {

  const [coords, setCoords] = useState([100, 100, 200, 200]);

  //const { dynamicDrawData} = useGlobalContext();

  return (
    <>
      <Line
        points={coords}
        stroke={"black"}
        strokeWidth={2}
      />
    </>
  );
};

export default Outline;
