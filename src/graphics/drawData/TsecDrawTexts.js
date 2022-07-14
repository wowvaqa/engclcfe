import { roundNumber } from "../../utils/Utils";

const TsecDrawTexts = () => {};

export function drawDimensionTexts(
  board,
  sliderB_eff,
  sliderH,
  sliderH_sl,
  sliderB,
  pA,
  pB,
  pC,
  pE,
  pF
) {
  draw_Beff_Text(board, sliderB_eff, pA, pB);
  draw_H_Text(board, sliderH, pA, pF);
  draw_Hsl_Text(board, sliderH_sl, pB, pC);
  draw_B_Text(board, sliderB, pE, pF);
}

/**
 * Draw B_eff value near by dimension line
 * @param {*} board
 * @param {*} sliderB
 * @param {*} pA
 * @param {*} pB
 */
function draw_B_Text(board, sliderB, pE, pF) {
  board.create(
    "text",
    [
      function () {
        return (pF.X() + pE.X()) / 2 - 0.08;
      },
      function () {
        return pF.Y() - 0.15;
      },
      function () {
        return "b  " + roundNumber(sliderB.Value(), 2);
      },
    ],
    { fontSize: 20 }
  );
}

/**
 * Draw B_eff value near by dimension line
 * @param {*} board
 * @param {*} sliderB_eff
 * @param {*} pA
 * @param {*} pB
 */
function draw_Beff_Text(board, sliderB_eff, pA, pB) {
  board.create(
    "text",
    [
      function () {
        return (pB.X() - pA.X()) / 2 - 0.08;
      },
      function () {
        return pA.Y() + 0.15;
      },
      function () {
        return "b_e_f_f  " + roundNumber(sliderB_eff.Value(), 2);
      },
    ],
    { fontSize: 20 }
  );
}

/**
 * Draw H value near by dimension line
 * @param {*} board
 * @param {*} sliderH
 * @param {*} pA
 * @param {*} pF
 */
function draw_H_Text(board, sliderH, pA, pF) {
  board.create(
    "text",
    [
      function () {
        return pA.X() - 0.15;
      },
      function () {
        return (pA.Y() - pF.Y()) / 2 - 0.08;
      },
      function () {
        return "h  " + roundNumber(sliderH.Value(), 2);
      },
    ],
    { fontSize: 20, rotate: 90, display: "internal" }
  );
}

/**
 * Draw H_sl value near by dimension line
 * @param {*} board
 * @param {*} sliderH
 * @param {*} pA
 * @param {*} pF
 */
function draw_Hsl_Text(board, sliderH_sl, pB, pC) {
  board.create(
    "text",
    [
      function () {
        return pB.X() + 0.15;
      },
      function () {
        return (pC.Y() + pB.Y()) / 2 - 0.08;
      },
      function () {
        return "hsl  " + roundNumber(sliderH_sl.Value(), 2);
      },
    ],
    { fontSize: 20, rotate: 90, display: "internal" }
  );
}

export default TsecDrawTexts;
