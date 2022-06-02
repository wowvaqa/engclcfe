import React from "react";
import { Container } from "react-bootstrap";
// import RectTest from "../graphics/ReinforcedConcreteDynamicDraw";
import DynamicDraw from "../graphics/DynamicDraw";

const CanvasTesting = () => {
  return (
    <Container>
      <DynamicDraw />
      {/* <RectTest /> */}
    </Container>
  );
};

export default CanvasTesting;
