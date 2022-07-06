import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import JSXBoard from "../JSXBoard";

import { useGlobalContext } from "../Context";

import { roundNumber } from "../utils/Utils";

let pointVisibile = true;

const JSXdrawT = () => {
  const [b, setB] = useState(0.5);
  const [b_eff, setB_eff] = useState(1);
  const [h, setH] = useState(1.2);
  const [h_sl, setH_sl] = useState(0.2);

  /** JSXGraph objects */
  const [sliderB, setSliderB] = useState();
  const [sliderB_eff, setSliderB_eff] = useState();
  const [sliderH, setSliderH] = useState();
  const [sliderH_sl, setSliderH_sl] = useState();
  const [jsxBoard, setJsxBoard] = useState();

  const { tDrawData, setTDrawDataFromSliders } = useGlobalContext();

  useEffect(() => {
    console.log("[JSXdrawT] Tdraw data: ", tDrawData);
    setB(tDrawData.b);
    setB_eff(tDrawData.b_eff);
    setH(tDrawData.h);
    setH_sl(tDrawData.h_sl);

    if (sliderB !== undefined) sliderB.setValue(b);
    if (sliderB_eff !== undefined) sliderB_eff.setValue(b_eff);
    if (sliderH !== undefined) sliderH.setValue(h);
    if (sliderH_sl !== undefined) sliderH_sl.setValue(h_sl);
    if (jsxBoard !== undefined) {
      jsxBoard.zoomAllPoints();
      jsxBoard.fullUpdate();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tDrawData]);

  const gfx = (board) => {
    var xOffset = 0;
    setJsxBoard(board);

    /** SLIDER VALUE B */
    var sliderVal_B = board.create(
      "slider",
      [
        [1, 1.8],
        [1.5, 1.8],
        [0.1, b, 4],
      ],
      {
        baseline: { strokeColor: "blue" },
        highline: { strokeColor: "red" },
        fillColor: "yellow",
        label: { fontSize: 14, strokeColor: "orange" },
        name: "b", // Not shown, if suffixLabel is set
        suffixLabel: "b = ",
        postLabel: " m",
        visible: false,
      }
    );
    setSliderB(sliderVal_B);
    sliderVal_B.on("drag", function () {
      setTDrawDataFromSliders({
        b: roundNumber(sliderVal_B.Value(), 4),
        h: -1,
        b_eff: -1,
        h_sl: -1,
      });
    });

    /** SLIDER VALUE B_eff */
    var sliderVal_Beff = board.create(
      "slider",
      [
        [1.0, 1.9],
        [1.5, 1.9],
        [0.1, b_eff, 4],
      ],
      {
        baseline: { strokeColor: "blue" },
        highline: { strokeColor: "red" },
        fillColor: "yellow",
        label: { fontSize: 14, strokeColor: "orange" },
        name: "h", // Not shown, if suffixLabel is set
        suffixLabel: "bEff = ",
        postLabel: " m",
        visible: false,
      }
    );
    setSliderB_eff(sliderVal_Beff);
    sliderVal_Beff.on("drag", function () {
      setTDrawDataFromSliders({
        b: -1,
        h: -1,
        b_eff: roundNumber(sliderVal_Beff.Value(), 4),
        h_sl: -1,
      });
    });

    /** SLIDER VALUE H */
    var sliderVal_H = board.create(
      "slider",
      [
        [0.1, 1.9],
        [0.5, 1.9],
        [0.1, h, 4],
      ],
      {
        baseline: { strokeColor: "blue" },
        highline: { strokeColor: "red" },
        fillColor: "yellow",
        label: { fontSize: 14, strokeColor: "orange" },
        name: "h", // Not shown, if suffixLabel is set test
        suffixLabel: "h = ",
        postLabel: " m",
        visible: false,
      }
    );
    setSliderH(sliderVal_H);
    sliderVal_H.on("drag", function () {
      setTDrawDataFromSliders({
        b: -1,
        h: roundNumber(sliderVal_H.Value(), 4),
        b_eff: -1,
        h_sl: -1,
      });
    });

    /** SLIDER VALUE H_sl */
    var sliderVal_Hsl = board.create(
      "slider",
      [
        [0.1, 1.8],
        [0.5, 1.8],
        [0.1, h_sl, 4],
      ],
      {
        baseline: { strokeColor: "blue" },
        highline: { strokeColor: "red" },
        fillColor: "yellow",
        label: { fontSize: 14, strokeColor: "orange" },
        name: "hsl", // Not shown, if suffixLabel is set
        suffixLabel: "hsl = ",
        postLabel: " m",
        visible: false,
      }
    );
    setSliderH_sl(sliderVal_Hsl);
    sliderVal_Hsl.on("drag", function () {
      setTDrawDataFromSliders({
        b: -1,
        h: -1,
        b_eff: -1,
        h_sl: roundNumber(sliderVal_Hsl.Value(), 4),
      });
    });

    /** Długość ramienia T */
    var tVal = function () {
      return (sliderVal_Beff.Value() - sliderVal_B.Value()) / 2;
    };

    var pA = board.create(
      "point",
      [
        xOffset,
        function () {
          return sliderVal_H.Value();
        },
      ],
      {
        visible: pointVisibile,
        withLabel: false,
        size: 1,
        fillColor: "black",
        strokeColor: "black",
        strokeWidth: 0,
      }
    );

    var pB = board.create(
      "point",
      [
        function () {
          return pA.X() + sliderVal_Beff.Value();
        },
        function () {
          return sliderVal_H.Value();
        },
      ],
      {
        visible: pointVisibile,
        withLabel: false,
        size: 1,
        fillColor: "black",
        strokeColor: "black",
        strokeWidth: 0,
      }
    );

    var pC = board.create(
      "point",
      [
        function () {
          return pA.X() + sliderVal_Beff.Value();
        },
        function () {
          return sliderVal_H.Value() - sliderVal_Hsl.Value();
        },
      ],
      {
        visible: pointVisibile,
        withLabel: false,
        size: 1,
        fillColor: "black",
        strokeColor: "black",
        strokeWidth: 0,
      }
    );

    var pD = board.create(
      "point",
      [
        function () {
          return pA.X() + sliderVal_Beff.Value() - tVal();
        },
        function () {
          return sliderVal_H.Value() - sliderVal_Hsl.Value();
        },
      ],
      {
        visible: pointVisibile,
        withLabel: false,
        size: 1,
        fillColor: "black",
        strokeColor: "black",
        strokeWidth: 0,
      }
    );

    var pE = board.create(
      "point",
      [
        function () {
          return pA.X() + sliderVal_Beff.Value() - tVal();
        },
        0,
      ],
      {
        visible: pointVisibile,
        withLabel: false,
        size: 1,
        fillColor: "black",
        strokeColor: "black",
        strokeWidth: 0,
      }
    );

    var pF = board.create(
      "point",
      [
        function () {
          return pA.X() + sliderVal_Beff.Value() - tVal() - sliderVal_B.Value();
        },
        0,
      ],
      {
        visible: pointVisibile,
        withLabel: false,
        size: 1,
        fillColor: "black",
        strokeColor: "black",
        strokeWidth: 0,
      }
    );

    var pG = board.create(
      "point",
      [
        function () {
          return pA.X() + sliderVal_Beff.Value() - tVal() - sliderVal_B.Value();
        },
        function () {
          return sliderVal_H.Value() - sliderVal_Hsl.Value();
        },
      ],
      {
        visible: pointVisibile,
        withLabel: false,
        size: 1,
        fillColor: "black",
        strokeColor: "black",
        strokeWidth: 0,
      }
    );

    var pH = board.create(
      "point",
      [
        xOffset,
        function () {
          return sliderVal_H.Value() - sliderVal_Hsl.Value();
        },
      ],
      {
        visible: pointVisibile,
        withLabel: false,
        size: 1,
        fillColor: "black",
        strokeColor: "black",
        strokeWidth: 0,
      }
    );

    /* board.create("segment", [pA, pB], {strokeWidth: strokeWidth}, {color: 'black'}); */

    board.create("polygon", [pA, pB, pC, pD, pE, pF, pG, pH], {
      borders: { strokeWidth: 5, strokeColor: "black" },
    });
  };

  return (
    <Container>
      <JSXBoard
        logic={gfx}
        boardAttributes={{
          axis: false,
          boundingbox: [-0.1, 2, 2, -0.25],
          showCopyright: false,
        }}
        style={{
          border: "1px solid black",
        }}
      />
    </Container>
  );
};

export default JSXdrawT;
