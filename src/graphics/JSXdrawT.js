import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import JSXBoard from "../JSXBoard";

import { useGlobalContext } from "../Context";

const JSXdrawT = () => {
  const [b, setB] = useState(0.6);
  const [b_eff, setB_eff] = useState(1);
  const [h, setH] = useState(1.2);
  const [h_sl, setH_sl] = useState(0.2);

  /** JSXGraph objects */
  const [sliderB, setSliderB] = useState();
  const [sliderB_eff, setSliderB_eff] = useState();
  const [sliderH, setSliderH] = useState();
  const [sliderH_sl, setSliderH_sl] = useState();
  const [jsxBoard, setJsxBoard] = useState();

  const { tDrawData, setTDrawDataFromSliders, tDrawDataFromSliders } =
    useGlobalContext();

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
    if (jsxBoard !== undefined) jsxBoard.fullUpdate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tDrawData]);

  const gfx = (board) => {
    var xOffset = 0.5;
    setJsxBoard(board);

    /** SLIDER VALUE B */
    var sliderVal_B = board.create(
      "slider",
      [
        [1, 1.8],
        [1.5, 1.8],
        [0.1, b, 2],
      ],
      {
        baseline: { strokeColor: "blue" },
        highline: { strokeColor: "red" },
        fillColor: "yellow",
        label: { fontSize: 14, strokeColor: "orange" },
        name: "b", // Not shown, if suffixLabel is set
        suffixLabel: "b = ",
        postLabel: " m",
      }
    );
    setSliderB(sliderVal_B);
    sliderVal_B.on("drag", function () {
      setB(sliderVal_B.Value());
      setTDrawDataFromSliders({
        b: sliderVal_B.Value(),
        h: tDrawDataFromSliders.h,
        b_eff: tDrawDataFromSliders.b_eff,
        h_sl: tDrawDataFromSliders.h_sl,
      });
    });

    /** SLIDER VALUE B_eff */
    var sliderVal_Beff = board.create(
      "slider",
      [
        [1.0, 1.9],
        [1.5, 1.9],
        [0.1, b_eff, 5],
      ],
      {
        baseline: { strokeColor: "blue" },
        highline: { strokeColor: "red" },
        fillColor: "yellow",
        label: { fontSize: 14, strokeColor: "orange" },
        name: "h", // Not shown, if suffixLabel is set
        suffixLabel: "bEff = ",
        postLabel: " m",
      }
    );
    setSliderB_eff(sliderVal_Beff);
    sliderVal_Beff.on("drag", function () {
      setB_eff(sliderVal_Beff.Value());
      setTDrawDataFromSliders({
        b: tDrawDataFromSliders.b,
        h: tDrawDataFromSliders.h,
        b_eff: sliderVal_Beff.Value(),
        h_sl: tDrawDataFromSliders.h_sl,
      });
    });

    /** SLIDER VALUE H */
    var sliderVal_H = board.create(
      "slider",
      [
        [0.1, 1.9],
        [0.5, 1.9],
        [0.5, h, 5],
      ],
      {
        baseline: { strokeColor: "blue" },
        highline: { strokeColor: "red" },
        fillColor: "yellow",
        label: { fontSize: 14, strokeColor: "orange" },
        name: "h", // Not shown, if suffixLabel is set test
        suffixLabel: "h = ",
        postLabel: " m",
      }
    );
    setSliderH(sliderVal_H);
    sliderVal_H.on("drag", function () {
      setH(sliderVal_H.Value());
      setTDrawDataFromSliders({
        b: tDrawDataFromSliders.b,
        h: sliderVal_H.Value(),
        b_eff: tDrawDataFromSliders.b_eff,
        h_sl: tDrawDataFromSliders.h_sl,
      });
    });

    /** SLIDER VALUE H_sl */
    var sliderVal_Hsl = board.create(
      "slider",
      [
        [0.1, 1.8],
        [0.5, 1.8],
        [0.1, h_sl, 2],
      ],
      {
        baseline: { strokeColor: "blue" },
        highline: { strokeColor: "red" },
        fillColor: "yellow",
        label: { fontSize: 14, strokeColor: "orange" },
        name: "hsl", // Not shown, if suffixLabel is set
        suffixLabel: "hsl = ",
        postLabel: " m",
      }
    );
    setSliderH_sl(sliderVal_Hsl);
    sliderVal_Hsl.on("drag", function () {
      setH_sl(sliderVal_Hsl.Value());
      setTDrawDataFromSliders({
        b: tDrawDataFromSliders.b,
        h: tDrawDataFromSliders.h,
        b_eff: tDrawDataFromSliders.b_eff,
        h_sl: sliderVal_Hsl.Value(),
      });
    });

    /** Długość ramienia T */
    var tVal = function () {
      return (sliderVal_Beff.Value() - sliderVal_B.Value()) / 2;
    };

    var pA = board.create("point", [
      xOffset,
      function () {
        return sliderVal_H.Value();
      },
    ]);

    var pB = board.create("point", [
      function () {
        return pA.X() + sliderVal_Beff.Value();
      },
      function () {
        return sliderVal_H.Value();
      },
    ]);

    var pC = board.create("point", [
      function () {
        return pA.X() + sliderVal_Beff.Value();
      },
      function () {
        return sliderVal_H.Value() - sliderVal_Hsl.Value();
      },
    ]);

    var pD = board.create("point", [
      function () {
        return pA.X() + sliderVal_Beff.Value() - tVal();
      },
      function () {
        return sliderVal_H.Value() - sliderVal_Hsl.Value();
      },
    ]);

    var pE = board.create("point", [
      function () {
        return pA.X() + sliderVal_Beff.Value() - tVal();
      },
      0,
    ]);

    var pF = board.create("point", [
      function () {
        return pA.X() + sliderVal_Beff.Value() - tVal() - sliderVal_B.Value();
      },
      0,
    ]);

    var pG = board.create("point", [
      function () {
        return pA.X() + sliderVal_Beff.Value() - tVal() - sliderVal_B.Value();
      },
      function () {
        return sliderVal_H.Value() - sliderVal_Hsl.Value();
      },
    ]);

    var pH = board.create("point", [
      xOffset,
      function () {
        return sliderVal_H.Value() - sliderVal_Hsl.Value();
      },
    ]);

    board.create("segment", [pA, pB]);
    board.create("segment", [pB, pC]);
    board.create("segment", [pC, pD]);
    board.create("segment", [pD, pE]);
    board.create("segment", [pE, pF]);
    board.create("segment", [pF, pG]);
    board.create("segment", [pG, pH]);
    board.create("segment", [pH, pA]);
  };

  console.log("rendering...");

  return (
    <Container>
      <JSXBoard
        logic={gfx}
        boardAttributes={{ axis: true, boundingbox: [-0.1, 2, 2, -0.25] }}
        style={{
          border: "1px solid black",
        }}
      />
    </Container>
  );
};

export default JSXdrawT;
