import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-konva";

const Toutline = (props) => {

  /* Tablica zawierająca wspórzędne rysunku z widoku wprowadzania danych*/
  const [outlineData, setOutlineData] = useState([]);
  /* Tablica zawierająca współrzędne punktów rysunku otrzymana po przekonwertowaniu outlineData */
  const [coordsForDraw, setCoordsForDraw] = useState([]);
  /* Grubość linii rysunku */
  const [strokeWidth, setStrokeWidth] = useState(2);

  /* Wcięcie krawędzi figury */
  const edgeIndent = useRef(10);

  var coords = [];
  var coordsFinal = [];

  useEffect(() => {
    console.log("[Toutline.js] props has changed ", props);    
    convertData();
    setOutlineData(props.dynamicDrawData);
    setStrokeWidth(props.strokeWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  /**
   * Convert data from callback function (DynamicDrawInput view) into figure coords array
   */
   const convertData = () => {
    if (outlineData.length > 0) {
      setCoordsForDraw([]);
      coords = [];
      coordsFinal = [];
      // eslint-disable-next-line array-callback-return
      outlineData.map((prop) => {
        coords.push(prop.x);
        coords.push(prop.y);
      });

      for (var i = 0; i < coords.length - 1; i++) {
        /* nX, nY => następna współrzędna X i Y; pX, pY => poprzednia współrzędna X i Y */
        var x, y, nX, nY, pX, pY;

        if (i % 2 === 0) {
          x = coords[i];
          y = coords[i + 1];
          console.log("(" + i + ")", "X: ", x, " Y: ", y);

          /* Ustalenie współrzędnych następnego wierzchołka figury */
          if (i + 2 < coords.length - 1) {
            nX = coords[i + 2];
            nY = coords[i + 3];
          } else {
            nX = coords[0];
            nY = coords[1];
          }
          console.log("(" + i + ")", "nX: ", nX, " nY: ", nY);

          /* Ustalenie współrzędnych poprzedniego wierzchołka figury */
          if (i > 1) {
            pX = coords[i - 2];
            pY = coords[i - 1];
          } else {
            pX = coords[coords.length - 2];
            pY = coords[coords.length - 1];
          }
          console.log("(" + i + ")", "pX: ", pX, " pY: ", pY);

          /* Ustawienie współrzędnych wcięcia dla wierzchołka (x,y) figury na podstawie wierzchołka poprzedzającego (pX, pY) i  następnego (nX, nY) */

          if (pX < x) {
            coordsFinal.push(x - edgeIndent.current);
            coordsFinal.push(y);
          } else if (pX > x) {
            coordsFinal.push(x + edgeIndent.current);
            coordsFinal.push(y);
          } else if (pX === x) {
            coordsFinal.push(x);
            if (pY < y) coordsFinal.push(y - edgeIndent.current);
            else if (pY > y) coordsFinal.push(y + edgeIndent.current);
            else if (pY === y) {
              coordsFinal.push(y);
            }
          }

          if (nX > x) {
            coordsFinal.push(x + edgeIndent.current);
            coordsFinal.push(y);
          } else if (nX < x) {
            coordsFinal.push(x - edgeIndent.current);
            coordsFinal.push(y);
          } else if (nX === x) {
            coordsFinal.push(x);
            if (nY > y) coordsFinal.push(y + edgeIndent.current);
            else if (nY < y) coordsFinal.push(y - edgeIndent.current);
            else if (nY === y) coordsFinal.push(y);
          }
        }
      }

      /* Dopełnienie (zamknięcie) figury */
      coordsFinal.push(coordsFinal[0]);
      coordsFinal.push(coordsFinal[1]);

      setCoordsForDraw(coordsFinal);
      console.log("[Toutline.js] coordForDraw: ", coordsForDraw);
    }
  };

  return (
    <>
      <Line
        points={coordsForDraw}
        stroke={"black"}
        strokeWidth={strokeWidth}
      />
    </>
  );
};

export default Toutline;
