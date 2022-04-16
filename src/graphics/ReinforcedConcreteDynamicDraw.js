import React, { useEffect, useState } from "react";
import { Rect, Stage, Layer, Line, Circle } from "react-konva";

/**
 *
 * @param {bValue, hValue, noOfBarsValue} props
 * @returns Draw of reinforced concrete
 */
const ReinforcedConcreteDynamicDraw = (props) => {
  /* Width (b) & height (h) of concrete */
  const [bValue, setBValue] = useState(props.bValue);
  const [hValue, setHValue] = useState(props.hValue);
  /* Amount of bars */
  const [noOfBarsValueArray, setNoOfBarsValueArray] = useState([]);

  /* x,y ofsset for start drawing outline & inline shapes of concrete */
  const concreteOffset = 100;
  /* Thicness of reinforced concrete */
  const concreteThicness = 15;

  useEffect(() => {
    var arr = [];
    for (var i = 0; i < props.noOfBarsValue; i++) {
      arr.push(i);
    }
    setNoOfBarsValueArray(arr);
  }, [props.noOfBarsValue]);

  useEffect(() => {
    setBValue(props.bValue);
    setHValue(props.hValue);
  }, [props.bValue, props.hValue]);

  return (
    <Stage width={820} height={620}>
      <Layer>
        <ConcreteRect
          bValue={bValue}
          hValue={hValue}
          concreteOffset={concreteOffset}
          thickness={concreteThicness}
        />
        <ReinforcingBars
          noOfBarsValueArray={noOfBarsValueArray}
          bValue={bValue}
          hValue={hValue}
          concreteOffset={concreteOffset}
          concreteThicness={concreteThicness}
        />
      </Layer>
    </Stage>
  );
};

/**
 * Bars
 * @param {} props
 * @returns
 */
const ReinforcingBars = (props) => {
  /* x coordinate in which the first rib will be drawn */
  const startX = props.concreteOffset + props.concreteThicness + 10;
  /* x coordinate in which the last rib will be drawn */
  const endX =
    props.concreteOffset + props.bValue - (props.concreteThicness + 10);
  /* y coordinate for drawing ribs */
  const y = props.concreteOffset + props.hValue - (props.concreteThicness + 10);

  const initialInterspace = (endX - startX) / props.noOfBarsValueArray.length;
  const interspaceMod = initialInterspace / props.noOfBarsValueArray.length;
  const finalInterspace =
    initialInterspace +
    interspaceMod +
    interspaceMod / (props.noOfBarsValueArray.length - 1);

  const barsArray = [];

  props.noOfBarsValueArray.map((e) => {
    if (e === 0 && props.noOfBarsValueArray.length === 1) {
      const x = startX + (endX - startX) / 2;
      barsArray.push({ e, x });
    } else if (e === 0) {
      const x = startX;
      barsArray.push({ e, x });
    } else {
      const x = startX + finalInterspace * e;
      barsArray.push({ e, x });
    }
    return 0;
  });

  return (
    <>
      {barsArray.map((e) => {
        return <Circle key={e.e} x={e.x} y={y} radius={4} fill="black" />;
      })}
    </>
  );
};

/**
 * Overall cross-section of reinforced concrete
 * @param {hValue, bValue, xyOffset, thickness} props
 */
const ConcreteRect = (props) => {
  return (
    <>
      <OuterRect
        bValue={props.bValue}
        hValue={props.hValue}
        concreteOffset={props.concreteOffset}
        thickness={props.thickness}
      />
      <InnerRect
        bValue={props.bValue}
        hValue={props.hValue}
        concreteOffset={props.concreteOffset}
        thickness={props.thickness}
      />
    </>
  );
};

/**
 * @param {hValue, bValue, concreteOffset} props
 * @returns Rectangle Konva type object of inline draw for reinforced concrete
 */
const InnerRect = (props) => {
  return (
    <Rect
      x={props.concreteOffset + props.thickness}
      y={props.concreteOffset + props.thickness}
      width={props.bValue - props.thickness * 2}
      height={props.hValue - props.thickness * 2}
      stroke={"black"}
      strokeWidth={4}
      cornerRadius={10}
    />
  );
};

/**
 * @param {hValue, bValue} props
 * @returns Plygon Konva type object of outline draw for reinforced concrete
 */
const OuterRect = (props) => {
  const breakLength = props.thickness;
  const x = props.concreteOffset;
  const y = props.concreteOffset;

  // Lfet upper verticle (v1)
  const v1pAx = x;
  const v1pAy = y + breakLength;
  const v1pBx = x + breakLength;
  const v1pBy = y;

  // Right upper verticle (v2)
  const v2pAx = x + props.bValue - breakLength;
  const v2pAy = y;
  const v2pBx = x + props.bValue;
  const v2pBy = y + breakLength;

  // Rigt bottom verticle (v3)
  const v3pAx = x + props.bValue;
  const v3pAy = y + props.hValue - breakLength;
  const v3pBx = x + props.bValue - breakLength;
  const v3pBy = y + props.hValue;

  // Left bottom verticle (v4)
  const v4pAx = x + breakLength;
  const v4pAy = y + props.hValue;
  const v4pBx = x;
  const v4pBy = y + props.hValue - breakLength;

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
