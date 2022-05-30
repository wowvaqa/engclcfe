import React, { useState, useEffect } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { useGlobalContext } from "../Context";
//import image from "../assets/API_1_pio.png";

import SingleReinfConcreteResultView from "./SingleReinfConcreteResultView";
import ReinforcedConcreteDynamicDraw from "../graphics/ReinforcedConcreteDynamicDraw";
import SingleReinfConcreteErrHandler from "./SingleReinfConcreteErrHandler";
import SingleReinfConcreteApi from "./SingleReinfConcreteApi";

const SingleReinfConcreteCalcView = () => {
  const [name, setName] = useState("My first cross sect");
  const [b, setB] = useState(0.5);
  const [h, setH] = useState(1);
  const [cl_conc, setCl_conc] = useState("C30_37");
  const [cl_steel, setCl_steel] = useState("BSt500S");
  const [c, setC] = useState(30);
  const [fi, setFi] = useState(32);
  const [no_of_bars, setNo_of_bars] = useState(8);
  const [fi_s, setFi_s] = useState(12);
  /* JSON Api data */
  const [m_rd, setM_rd] = useState(0);
  const [ksi_eff, setKsi_eff] = useState(0);
  const [x_eff, setX_eff] = useState(0);

  const {
    setSingleDimensioningData,
    apiTrigger,
    setApiTrigger,
    singleDimensioningDataFromApi,
  } = useGlobalContext();

  useEffect(() => {
    console.log("(SingleCalcView) Reciving data from API: ");
    console.log(singleDimensioningDataFromApi);

    setM_rd(singleDimensioningDataFromApi.m_rd);
    setKsi_eff(singleDimensioningDataFromApi.ksi_eff);
    setX_eff(singleDimensioningDataFromApi.x_eff);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleDimensioningDataFromApi]);

  const sendDataToApi = (event) => {
    const dataToSend = {
      name,
      b,
      h,
      cl_conc,
      cl_steel,
      c,
      fi,
      no_of_bars,
      fi_s,
    };
    console.log("(DoubleCalcView) Sending data to API: " + dataToSend);

    setupDataModel(true);
    setSingleDimensioningData(dataToSend);
    event.preventDefault();
  };

  /**
   *
   * @param {*} props
   */
  const setupDataModel = (props) => {
    const isButtonPressed = props;
    const isNoErrors = apiTrigger.isNoErrors;
    const isWaitForAction = apiTrigger.isWaitForAction;

    const dataModel = { isButtonPressed, isNoErrors, isWaitForAction };

    setApiTrigger(dataModel);
  };

  return (
    <>
      <SingleReinfConcreteApi />
      <SingleReinfConcreteErrHandler />
      <Container>
        <h3>Single reinforced concrete calculator</h3>
      </Container>
      <Container fluid="md">
        <Row>
          <Col>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              >
                <Form.Label>Cross section label:</Form.Label>
                <Form.Control type="text" placeholder="My first cross sect" />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="b"
                onChange={(e) => {
                  setB(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>Width 'b' [m]:</Form.Label>
                <Form.Control type="number" placeholder="0.5" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="h"
                onChange={(e) => {
                  setH(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>Height 'h' [m]:</Form.Label>
                <Form.Control type="number" placeholder="1.0" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="cl_conc"
                onChange={(e) => {
                  setCl_conc(e.target.value);
                }}
              >
                <Form.Label>Concrete class :</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="1">C30_37</option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="cl_steel"
                onChange={(e) => {
                  setCl_steel(e.target.value);
                }}
              >
                <Form.Label>Steel class :</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="1">Bst500s</option>
                  <option value="1">B500SP</option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="c"
                onChange={(e) => {
                  setC(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>Concrete cover 'c' [mm]: </Form.Label>
                <Form.Control type="number" placeholder="30" />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="fi"
                onChange={(e) => {
                  setFi(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>Main reinforcement diameter Ø [mm]: </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  placeholder="32"
                >
                  <option value="32">32</option>
                  <option value="25">25</option>
                  <option value="20">20</option>
                  <option value="18">18</option>
                  <option value="16">16</option>
                  <option value="12">12</option>
                  <option value="10">10</option>
                  <option value="8">8</option>
                  <option value="6">6</option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="no_of_bars"
                onChange={(e) => {
                  setNo_of_bars(
                    parseFloat(e.target.value.replace(",", "."))
                  );
                }}
              >
                <Form.Label>Number of main rebars : </Form.Label>
                <Form.Control type="number" placeholder="8" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="fi_s"
                onChange={(e) => {
                  setFi_s(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>
                  Diameter of stirrups Ø<sub>s</sub> [mm]:
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  placeholder="32"
                >
                  <option value="32">32</option>
                  <option value="25">25</option>
                  <option value="20">20</option>
                  <option value="18">18</option>
                  <option value="16">16</option>
                  <option value="12">12</option>
                  <option value="10">10</option>
                  <option value="8">8</option>
                  <option value="6">6</option>
                </Form.Select>
              </Form.Group>
            </Form>
            <Button
              variant="primary"
              type="button"
              className="btn btn-primary"
              aria-controls="example-collapse-text"
              aria-expanded={true}
              onClick={(event) => {
                sendDataToApi(event);
              }}
            >
              Calculate
            </Button>
          </Col>
          <Col>
            <ReinforcedConcreteDynamicDraw
              bValue={300}
              hValue={600}
              b={b}
              h={h}
              c={c}
              noOfBarsValue={no_of_bars}
            />
            {/* 
              <img
                src={image}
                width={732}
                height={800}
                alt="cocktail db logo"
                className="weightElement"
              />
              */}
          </Col>
        </Row>
        <br></br>
        <SingleReinfConcreteResultView
          isCollapseOpen={true}
          m_rd={m_rd}
          ksi_eff={ksi_eff}
          x_eff={x_eff}
        />
      </Container>
    </>
  );
};

export default SingleReinfConcreteCalcView;
