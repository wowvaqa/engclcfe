import React, { useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";

import { useGlobalContext } from "../Context";

import Outline from "./Outline";
import Inline from "./Inline";

/**
 * Dynamiczny skalowalny rysunek figury T. 
 * @param {*} props
 * @returns
 */
const TDraw = (props) => {
  /* Tablica zawierająca wspórzędne rysunku z widoku wprowadzania danych*/
   const [outlineData, setOutlineData] = useState([]);
  /* Grubość linii rysunku */
  const [strokeWidth, setStrokeWidth] = useState(2);
  
  const { dynamicDrawData, drawProperties } = useGlobalContext();

  useEffect(() => {
    console.log("(Dynamic Draw) Dynamic draw data changed! ", dynamicDrawData, outlineData);
    setOutlineData(dynamicDrawData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dynamicDrawData]);

  useEffect(() => {
    console.log("(Dynamic Draw) draw properties has change ", drawProperties);
    setStrokeWidth(drawProperties.strokeWidth);    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawProperties]);

  useEffect(() => {
    console.log("[TDraw] Props change", props)
  }, [props]);

  /* Odunięcie lini wewnętrzenej od lini zewnętrznej */
  const mod = 5;

  /* Punk startu rysowania, relatywny koordynat 0,0 */
  var sp = {x: 10, y: 10};

  /* Wymiar B i Beff z rysunku */
  const dimBeff = 500;
  const dimB = 50;
  const tLength = (dimBeff - dimB) / 2; // Długość górengo ramienia litery T

  /* Wymiary H i Hsl z rysunku */
  const dimH = 400;
  const dimHsl = 150;

  /** Punkty obrysu zewnętrznego */
  var olP00 = { key: 1, x: sp.x + 0, y: sp.y + 0 }
  var olP01 = { key: 2, x: sp.x + dimBeff, y: sp.y + 0 }
  var olP02 = { key: 3, x: sp.x + dimBeff, y: sp.y + dimHsl }
  var olP03 = { key: 4, x: sp.x + dimBeff - tLength, y: sp.y + dimHsl }
  var olP04 = { key: 5, x: sp.x + dimBeff - tLength, y: sp.y + (dimH - dimHsl) }
  var olP05 = { key: 6, x: sp.x + tLength, y: sp.y + (dimH - dimHsl) }
  var olP06 = { key: 7, x: sp.x + tLength, y: sp.y + (dimHsl) }
  var olP07 = { key: 8, x: sp.x + 0, y: sp.y + (dimHsl) }

  const outlineCoords = [olP00, olP01, olP02, olP03, olP04, olP05, olP06, olP07]

  /** Punkty obrysu wewnętrznego */
  var ilP00 = { key: 1, x: (sp.x + 0) + mod, y: (sp.y + 0) + mod }
  var ilP01 = { key: 2, x: (sp.x + dimBeff) - mod, y: (sp.y + 0) + mod }
  var ilP02 = { key: 3, x: (sp.x + dimBeff) - mod, y: (sp.y + dimHsl) - mod }
  var ilP03 = { key: 4, x: (sp.x + dimBeff - tLength) - mod, y: (sp.y + dimHsl) - mod }
  var ilP04 = { key: 5, x: (sp.x + dimBeff - tLength) - mod, y: (sp.y + (dimH - dimHsl)) - mod }
  var ilP05 = { key: 6, x: (sp.x + tLength) + mod, y: (sp.y + (dimH - dimHsl)) - mod }
  var ilP06 = { key: 7, x: (sp.x + tLength) + mod, y: (sp.y + dimHsl) - mod }
  var ilP07 = { key: 8, x: (sp.x + 0) + mod, y: (sp.y + dimHsl) - mod }

  const inlineCoords = [ilP00, ilP01, ilP02, ilP03, ilP04, ilP05, ilP06, ilP07];

  return (
    <>
      <Stage width={800} height={400}>      
        <Layer>
          <Inline  
            dynamicDrawData={inlineCoords}
            strokeWidth={strokeWidth}
          />
          <Outline  
            dynamicDrawData={outlineCoords}            
            strokeWidth={strokeWidth}
          />
        </Layer>
      </Stage>
    </>
  );
};

/**
 * Overall cross-section of reinforced concrete
 * @param {hValue, bValue, xyOffset, thickness} props
 */

export default TDraw;
