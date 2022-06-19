import DynamicDrawInput from "./DynamicDrawInput";
import React, { useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";

import { useGlobalContext } from "../Context";

import Outline from "./Outline";
import Inline from "./Inline";

/**
 * Dynamiczny skalowalny rysunek figury. 
 * @param {*} props
 * @returns
 */
const DynamicDraw = () => {
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

  var olEdge00 = { key: 1, x: sp.x + 0, y: sp.y + 0 }
  var olEdge01 = { key: 2, x: sp.x + dimBeff, y: sp.y + 0 }
  var olEdge02 = { key: 3, x: sp.x + dimBeff, y: sp.y + dimHsl }
  var olEdge03 = { key: 4, x: sp.x + dimBeff - tLength, y: sp.y + dimHsl }
  var olEdge04 = { key: 5, x: sp.x + dimBeff - tLength, y: sp.y + (dimH - dimHsl) }
  var olEdge05 = { key: 6, x: sp.x + tLength, y: sp.y + (dimH - dimHsl) }
  var olEdge06 = { key: 7, x: sp.x + tLength, y: sp.y + (dimHsl) }
  var olEdge07 = { key: 8, x: sp.x + 0, y: sp.y + (dimHsl) }

  const outlineCoords = [olEdge00, olEdge01, olEdge02, olEdge03, olEdge04, olEdge05, olEdge06, olEdge07]

  // const outlineCoords = [
  //   { key: 1, x: sp.x + 0, y: sp.y + 0 },
  //   { key: 2, x: sp.x + 300, y: sp.y + 0 },
  //   { key: 3, x: sp.x + 300, y: sp.y + 75 },
  //   { key: 4, x: sp.x + 200, y: sp.y + 75 },
  //   { key: 5, x: sp.x + 200, y: sp.y + 250 },
  //   { key: 6, x: sp.x + 100, y: sp.y + 250 },
  //   { key: 7, x: sp.x + 100, y: sp.y + 75 },
  //   { key: 8, x: sp.x + 0, y: sp.y + 75 }];

  var ilEdge00 = { key: 1, x: (sp.x + 0) + mod, y: (sp.y + 0) + mod }
  var ilEdge01 = { key: 2, x: (sp.x + dimBeff) - mod, y: (sp.y + 0) + mod }
  var ilEdge02 = { key: 3, x: (sp.x + dimBeff) - mod, y: (sp.y + dimHsl) - mod }
  var ilEdge03 = { key: 4, x: (sp.x + dimBeff - tLength) - mod, y: (sp.y + dimHsl) - mod }
  var ilEdge04 = { key: 5, x: (sp.x + dimBeff - tLength) - mod, y: (sp.y + (dimH - dimHsl)) - mod }
  var ilEdge05 = { key: 6, x: (sp.x + tLength) + mod, y: (sp.y + (dimH - dimHsl)) - mod }
  var ilEdge06 = { key: 7, x: (sp.x + tLength) + mod, y: (sp.y + dimHsl) - mod }
  var ilEdge07 = { key: 8, x: (sp.x + 0) + mod, y: (sp.y + dimHsl) - mod }

  const inlineCoords = [ilEdge00, ilEdge01, ilEdge02, ilEdge03, ilEdge04, ilEdge05, ilEdge06, ilEdge07];

  // const inlineCoords = [
  //   { key: 1, x: sp.x + 100 + mod, y: sp.y + 100 + mod },
  //   { key: 2, x: sp.x + 400 - mod, y: sp.y + 100 + mod },
  //   { key: 3, x: sp.x + 400 - mod, y: sp.y + 175 - mod },
  //   { key: 4, x: sp.x + 300 - mod, y: sp.y + 175 - mod },
  //   { key: 5, x: sp.x + 300 - mod, y: sp.y + 350 - mod },
  //   { key: 6, x: sp.x + 200 + mod, y: sp.y + 350 - mod },
  //   { key: 7, x: sp.x + 200 + mod, y: sp.y + 175 - mod },
  //   { key: 8, x: sp.x + 100 + mod, y: sp.y + 175 - mod }];

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
      <DynamicDrawInput />
    </>
  );
};

/**
 * Overall cross-section of reinforced concrete
 * @param {hValue, bValue, xyOffset, thickness} props
 */

export default DynamicDraw;
