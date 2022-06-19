import React from "react";
import { Container } from "react-bootstrap";
// import RectTest from "../graphics/ReinforcedConcreteDynamicDraw";
import TDraw from "../graphics/TDraw";

const CanvasTesting = () => {

 

 console.log("rendering...");

  return (
    <Container>
      <TDraw />
      {/* <RectTest /> */}
    </Container>
  );
};

export default CanvasTesting;
