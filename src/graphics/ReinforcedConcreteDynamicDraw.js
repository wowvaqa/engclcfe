import React, { useEffect, useState } from "react";
import { Rect, Stage, Layer } from "react-konva";

const ReinforcedConcreteDynamicDraw = (props) => {
  /* Width (b) & height (h) of concrete */
  const [bValue, setBValue] = useState(props.bValue);
  const [hValue, setHValue] = useState(props.hValue);

  useEffect(() => {
    setBValue(props.bValue);
    setHValue(props.hValue);
  }, [props.bValue, props.hValue]);

  return (
    <Stage width={600} height={600}>
      <Layer>
        <OuterRect bValue={bValue} hValue={hValue} />
        <InnerRect bValue={bValue} hValue={hValue} />
      </Layer>
    </Stage>
  );
};

const OuterRect = (props) => {
  return (
    <Rect
      x={10}
      y={10}
      width={props.bValue}
      height={props.hValue}
      stroke={"black"}
      strokeWidth={4}
    />
  );
};

const InnerRect = (props) => {
  return (
    <Rect
      x={20}
      y={20}
      width={props.bValue - 20}
      height={props.hValue - 20}
      stroke={"black"}
      strokeWidth={4}
    />
  );
};

export default ReinforcedConcreteDynamicDraw;
