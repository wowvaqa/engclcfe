const TsecDrawDimensionLines = () => {};

/**
 * Draw dimension lines on board
 * @param {Board for drawing} board
 */
export function drawDimensionLines(board, pA, pB, pC, pE, pF) {
  draw_Beff_DimensionLine(board, pA, pB);
  draw_H_DimensionLine(board, pA, pF);
  draw_B_DimensionLine(board, pE, pF);
  draw_Hsl_DimensionLine(board, pB, pC);
}

/**
 * Draw H_sl dimension line
 * @param {*} board Board for draw
 * @param {*} pA Point A of T
 * @param {*} pE Point F of T
 */
function draw_Hsl_DimensionLine(board, pB, pC) {
  var p1 = board.create(
    "point",
    [
      function () {
        return pB.X() + 0.1;
      },

      function () {
        return pB.Y();
      },
    ],
    {
      visible: true,
      withLabel: false,
      size: 0,
    }
  );

  var p2 = board.create(
    "point",
    [
      function () {
        return pB.X() + 0.1;
      },

      function () {
        return pC.Y();
      },
    ],
    {
      visible: true,
      withLabel: false,
      size: 0,
    }
  );
  board.create("segment", [p1, p2], {
    name: "seg",
    strokeColor: "#000000",
    strokeWidth: 2,
    highlightStrokeWidth: 5,
    lastArrow: { type: 2, size: 8, highlightSize: 6 },
    touchLastPoint: true,
    firstArrow: { type: 2, size: 8, highlightSize: 6 },
  });

  board.create("segment", [pB, p1], {
    strokeColor: "#000000",
    strokeWidth: 1,
    highlightStrokeWidth: 5,
    dash: 2,
  });

  board.create("segment", [pC, p2], {
    strokeColor: "#000000",
    strokeWidth: 1,
    highlightStrokeWidth: 5,
    dash: 2,
  });
}

/**
 * Draw B dimension line
 * @param {*} board Board for draw
 * @param {*} pA Point A of T
 * @param {*} pE Point F of T
 */
function draw_B_DimensionLine(board, pE, pF) {
  var p1 = board.create(
    "point",
    [
      function () {
        return pE.X();
      },

      function () {
        return pE.Y() - 0.1;
      },
    ],
    {
      visible: true,
      withLabel: false,
      size: 0,
    }
  );
  var p2 = board.create(
    "point",
    [
      function () {
        return pF.X();
      },

      function () {
        return pF.Y() - 0.1;
      },
    ],
    {
      visible: true,
      withLabel: false,
      size: 0,
    }
  );
  board.create("segment", [p1, p2], {
    name: "seg",
    strokeColor: "#000000",
    strokeWidth: 2,
    highlightStrokeWidth: 5,
    lastArrow: { type: 2, size: 8, highlightSize: 6 },
    touchLastPoint: true,
    firstArrow: { type: 2, size: 8, highlightSize: 6 },
  });

  board.create("segment", [pE, p1], {
    strokeColor: "#000000",
    strokeWidth: 1,
    highlightStrokeWidth: 5,
    dash: 2,
  });

  board.create("segment", [pF, p2], {
    strokeColor: "#000000",
    strokeWidth: 1,
    highlightStrokeWidth: 5,
    dash: 2,
  });
}

/**
 * Draw H dimension line
 * @param {*} board Board for draw
 * @param {*} pA Point A of T
 * @param {*} pF Point F of T
 */
function draw_H_DimensionLine(board, pA, pF) {
  var p1 = board.create(
    "point",
    [
      function () {
        return pA.X() - 0.1;
      },

      function () {
        return pA.Y();
      },
    ],
    {
      visible: true,
      withLabel: false,
      size: 0,
    }
  );
  var p2 = board.create(
    "point",
    [
      function () {
        return pA.X() - 0.1;
      },

      function () {
        return pF.Y();
      },
    ],
    {
      visible: true,
      withLabel: false,
      size: 0,
    }
  );
  board.create("segment", [p1, p2], {
    name: "seg",
    strokeColor: "#000000",
    strokeWidth: 2,
    highlightStrokeWidth: 5,
    lastArrow: { type: 2, size: 8, highlightSize: 6 },
    touchLastPoint: true,
    firstArrow: { type: 2, size: 8, highlightSize: 6 },
  });

  board.create("segment", [pA, p1], {
    strokeColor: "#000000",
    strokeWidth: 1,
    highlightStrokeWidth: 5,
    dash: 2,
  });

  board.create("segment", [pF, p2], {
    strokeColor: "#000000",
    strokeWidth: 1,
    highlightStrokeWidth: 5,
    dash: 2,
  });
}

/**
 * Draw B_eff dimension line
 * @param {*} board Board for draw
 * @param {*} pA Point A of T
 * @param {*} pB Point B of T
 */
function draw_Beff_DimensionLine(board, pA, pB) {
  var p1 = board.create(
    "point",
    [
      function () {
        return pA.X();
      },

      function () {
        return pA.Y() + 0.1;
      },
    ],
    {
      visible: true,
      withLabel: false,
      size: 0,
    }
  );
  var p2 = board.create(
    "point",
    [
      function () {
        return pB.X();
      },

      function () {
        return pB.Y() + 0.1;
      },
    ],
    {
      visible: true,
      withLabel: false,
      size: 0,
    }
  );
  board.create("segment", [p1, p2], {
    name: "seg",
    strokeColor: "#000000",
    strokeWidth: 2,
    highlightStrokeWidth: 5,
    lastArrow: { type: 2, size: 8, highlightSize: 6 },
    touchLastPoint: true,
    firstArrow: { type: 2, size: 8, highlightSize: 6 },
  });

  board.create("segment", [pA, p1], {
    strokeColor: "#000000",
    strokeWidth: 1,
    highlightStrokeWidth: 5,
    dash: 2,
  });

  board.create("segment", [pB, p2], {
    strokeColor: "#000000",
    strokeWidth: 1,
    highlightStrokeWidth: 5,
    dash: 2,
  });
}

export default TsecDrawDimensionLines;
