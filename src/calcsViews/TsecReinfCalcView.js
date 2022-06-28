import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import image from "../assets/API_3_pio.png";

// import TDraw from "../graphics/TDraw";
import JSXdrawT from "../graphics/JSXdrawT"

import TsecReinfResultView from "../calcsViews/TsecReinfResultView";
import TsecReinfApi from "./TsecReinfApi";
import TsecReinfErrHandler from "./TsecReinfErrHandler";

import { useGlobalContext } from "../Context";

const TsecReinfCalcView = () => {
  const [name, setName] = useState("My first cross sect");
  const [b, setB] = useState(0.5);
  const [h, setH] = useState(1.2);
  const [h_sl, setH_sl] = useState(0.2);
  const [b_eff, setB_eff] = useState(1);
  const [cl_conc, setCl_conc] = useState("C30_37");
  const [cl_steel, setCl_steel] = useState("BSt500S");
  const [c, setC] = useState(30);
  const [fi, setFi] = useState(32);
  const [fi_s, setFi_s] = useState(12);
  const [fi_opp, setFi_opp] = useState(16);
  const [m_sd, setM_sd] = useState(3000);
  /* JSON Api data */
  const [as1, setAs1] = useState(0);
  const [ns1, setNs1] = useState(0);
  const [as2, setAs2] = useState(0);
  const [ns2, setNs2] = useState(0);
  const [remark, setRemark] = useState("");
  const [remark2, setRemark2] = useState("");

  // const [, updateState] = React.useState();
  // const forceUpdate = React.useCallback(() => updateState({}), []);

  const {
    setTreinforcedConcreteData,
    apiTrigger,
    setApiTrigger,
    tReinforcedConcreteDataFromApi,
  } = useGlobalContext();

  useEffect(() => {
    console.log("(TSecView) Reciving data from API: ");
    console.log(tReinforcedConcreteDataFromApi);

    setAs1(tReinforcedConcreteDataFromApi.as1);
    setNs1(tReinforcedConcreteDataFromApi.ns1);
    setAs2(tReinforcedConcreteDataFromApi.ns1);
    setNs2(tReinforcedConcreteDataFromApi.ns1);
    setRemark(tReinforcedConcreteDataFromApi.remark);
    setRemark2(tReinforcedConcreteDataFromApi.remark2);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tReinforcedConcreteDataFromApi]);

  const sendDataToApi = (event) => {
    event.preventDefault();
    const dataToSend = {
      name,
      b,
      h,
      h_sl,
      b_eff,
      cl_conc,
      cl_steel,
      c,
      fi,
      fi_s,
      fi_opp,
      m_sd,
    };
    console.log("(TSecView) Sending data to API: " + dataToSend);

    setupDataModel(true);
    setTreinforcedConcreteData(dataToSend);
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
      <TsecReinfErrHandler />
      <TsecReinfApi />
      <Container>
        <h3>T-section reinforcement calculator</h3>
      </Container>
      <Container fluid="md">
        <Row>
          <Col>
            <Form>
              {/* ------------------------ name >--- */}
              <Form.Group
                className="mb-3"
                controlId="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              >
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="My first T cross sect."
                />
              </Form.Group>
              {/* ------------------------ b >--- */}
              <Form.Group
                className="mb-3"
                controlId="b"
                onChange={(e) => {
                  setB(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>b:</Form.Label>
                <Form.Control type="number" placeholder="0.5" />
              </Form.Group>
              {/* ------------------------ h >--- */}
              <Form.Group
                className="mb-3"
                controlId="h"
                onChange={(e) => {
                  setH(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>h:</Form.Label>
                <Form.Control type="number" placeholder="1.2" />
              </Form.Group>
              {/* ------------------------ h_sl >--- */}
              <Form.Group
                className="mb-3"
                controlId="h_sl"
                onChange={(e) => {
                  setH_sl(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>h_sl:</Form.Label>
                <Form.Control type="number" placeholder="0.2" />
              </Form.Group>
              {/* ------------------------ b_eff >--- */}
              <Form.Group
                className="mb-3"
                controlId="b_eff"
                onChange={(e) => {
                  setB_eff(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>b_eff:</Form.Label>
                <Form.Control type="number" placeholder="1" />
              </Form.Group>
              <Row>
                <Col>
                  {/* ------------------------ cl_conc >--- */}
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
                </Col>
                <Col>
                  {/* ------------------------ cl_steel >--- */}
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
                </Col>
              </Row>
              {/* ------------------------< c >--- */}
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
              {/* ------------------------< fi >--- */}
              <Form.Group
                className="mb-3"
                controlId="fi"
                onChange={(e) => {
                  setFi(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>Main reinforc. diameter Ø [mm]: </Form.Label>
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
              {/* ------------------------< fi_s >--- */}
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
                  placeholder="12"
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
              {/* ------------------------< fi_opp >--- */}
              <Form.Group
                className="mb-3"
                controlId="fi_opp"
                onChange={(e) => {
                  setFi_opp(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>Opp. reinforc. diameter Ø [mm]: </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  placeholder="16"
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
              {/* ------------------------< m_sd >--- */}
              <Form.Group
                className="mb-3"
                controlId="m_sd"
                onChange={(e) => {
                  setM_sd(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>m_sd: </Form.Label>
                <Form.Control type="number" placeholder="3000" />
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
            <JSXdrawT />
            {/* <TDraw
              imgWidth={800}
              imgHeight={400}
              h={h}
              h_sl={h_sl}
              b={b}
              b_eff={b_eff}
              reRender={forceUpdate}
            /> */}
            <img
              src={image}
              width={332}
              height={400}
              alt="cocktail db logo"
              className="weightElement"
            />
          </Col>
        </Row>
        <br></br>
        <TsecReinfResultView
          isCollapseOpen={true}
          as1={as1}
          ns1={ns1}
          as2={as2}
          ns2={ns2}
          remark={remark}
          remark2={remark2}
        />
      </Container>
    </>
  );
};

export default TsecReinfCalcView;
