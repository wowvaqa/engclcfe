import React, { useEffect, useState } from "react";
import { Rect, Stage, Layer, Line } from "react-konva";

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
        <InnerRect bValue={bValue} hValue={hValue} />
        <OuterRect bValue={bValue} hValue={hValue} />
      </Layer>
    </Stage>
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
      cornerRadius={10}
    />
  );
};

const OuterRect = (props) => {
  const offset = 10;
  const x = 10;
  const y = 10;

  // Lfet upper verticle (v1)
  const v1pAx = x;
  const v1pAy = y + offset;
  const v1pBx = x + offset;
  const v1pBy = y;

  // Right upper verticle (v2)
  const v2pAx = x + props.bValue - offset;
  const v2pAy = y;
  const v2pBx = x + props.bValue;
  const v2pBy = y + offset;

  // Rigt bottom verticle (v3)
  const v3pAx = x + props.bValue;
  const v3pAy = y + props.hValue - offset;
  const v3pBx = x + props.bValue - offset;
  const v3pBy = y + props.hValue;

  // Left bottom verticle (v4)
  const v4pAx = x + offset;
  const v4pAy = y + props.hValue;
  const v4pBx = x;
  const v4pBy = y + props.hValue - offset;

  return (
    <Line
      points={[
        v1pAx,
        v1pAy,
        v1pBx,
        v1pBy,
        v2pAx,
        v2pAy,
        v2pBx,
        v2pBy,
        v3pAx,
        v3pAy,
        v3pBx,
        v3pBy,
        v4pAx,
        v4pAy,
        v4pBx,
        v4pBy,
      ]}
      stroke={"black"}
      strokeWidth={5}
      closed={true}
    />
  );
};

export default ReinforcedConcreteDynamicDraw;
