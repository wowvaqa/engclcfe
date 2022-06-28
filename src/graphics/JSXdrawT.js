import React from "react";
import { Container } from "react-bootstrap";
import JSXBoard from "../JSXBoard";

const JSXdrawT = () => {
  let gfx = (board) => {
    var xOffset = 5.0;

    var sliderVal_B = board.create(
      "slider",
      [
        [10, 18],
        [15, 18],
        [2, 5, 9],
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

    var sliderVal_Beff = board.create(
      "slider",
      [
        [10, 19],
        [15, 19],
        [5, 10, 15],
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

    var sliderVal_H = board.create(
      "slider",
      [
        [1, 19],
        [5, 19],
        [3, 15, 17],
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

    var sliderVal_Hsl = board.create(
      "slider",
      [
        [1, 18],
        [5, 18],
        [1, 2, 10],
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
        boardAttributes={{ axis: true, boundingbox: [-1, 20, 22, -1] }}
        style={{
          border: "1px solid black",
        }}
      />
    </Container>
  );
};

export default JSXdrawT;
