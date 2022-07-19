import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
//  import image from "../assets/API_3_pio.png";

import JSXdrawT from "../graphics/JSXdrawT";

import TsecReinfResultView from "../calcsViews/TsecReinfResultView";
import TsecReinfApi from "./TsecReinfApi";
import TsecReinfErrHandler from "./TsecReinfErrHandler";

import { log, jsClasses } from "../utils/Utils";

import { useGlobalContext } from "../Context";

/** Show log in console if true */
const showLogs = true;
/** Class name for log */
const cls = jsClasses.TsecReinfCalcView;

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

  /** Flaga informująca czy dane pochodzą z suwaków i tym samym czy wymagana jest aktualizacja stanów */
  const [dataFromSlidersFlag, setDataFromSlidersFlag] = useState(false);

  const {
    setTreinforcedConcreteData,
    apiTrigger,
    setApiTrigger,
    tReinforcedConcreteDataFromApi,
    setTDrawData,
    tDrawDataFromSliders,
  } = useGlobalContext();

  useEffect(() => {
    /* Dane z suwaków - nie wymagana aktualizacja stanów. */
    if (!dataFromSlidersFlag)
      setTDrawData({ b: b, b_eff: b_eff, h: h, h_sl: h_sl });
    setDataFromSlidersFlag(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [b, h, h_sl, b_eff]);

  useEffect(() => {
    log(
      cls,
      "Reciving data from API",
      tReinforcedConcreteDataFromApi,
      showLogs
    );

    setAs1(tReinforcedConcreteDataFromApi.as1);
    setNs1(tReinforcedConcreteDataFromApi.ns1);
    setAs2(tReinforcedConcreteDataFromApi.ns1);
    setNs2(tReinforcedConcreteDataFromApi.ns1);
    setRemark(tReinforcedConcreteDataFromApi.remark);
    setRemark2(tReinforcedConcreteDataFromApi.remark2);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tReinforcedConcreteDataFromApi]);

  useEffect(() => {
    log(cls, "tDrawDataFromSliders", tDrawDataFromSliders, showLogs);

    if (tDrawDataFromSliders.b !== -1) {
      document.getElementById("inputB").value = tDrawDataFromSliders.b;
      setB(tDrawDataFromSliders.b);
    }

    if (tDrawDataFromSliders.h !== -1) {
      document.getElementById("inputH").value = tDrawDataFromSliders.h;
      setH(tDrawDataFromSliders.h);
    }

    if (tDrawDataFromSliders.b_eff !== -1) {
      document.getElementById("inputB_eff").value = tDrawDataFromSliders.b_eff;
      setB_eff(tDrawDataFromSliders.b_eff);
    }

    if (tDrawDataFromSliders.h_sl !== -1) {
      document.getElementById("inputH_sl").value = tDrawDataFromSliders.h_sl;
      setH_sl(tDrawDataFromSliders.h_sl);
    }

    setDataFromSlidersFlag(true);
  }, [tDrawDataFromSliders]);

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
    log(cls, "sendDataToApi", dataToSend, showLogs);

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
              <Row>
                <h6>b:</h6>
                <Col>
                  <Form.Group
                    className="mb-3"
                    onChange={(e) => {
                      setB(parseFloat(e.target.value.replace(",", ".")));
                    }}
                  >
                    {/* <Form.Label>b:</Form.Label> */}
                    <Form.Control id="inputB" type="number" placeholder="0.5" />
                  </Form.Group>
                </Col>
                <Col>
                  <RangeSlider
                    size="lg"
                    tooltip="off"
                    min={0.1}
                    max={4}
                    step={0.01}
                    value={b}
                    onChange={(changeEvent) => {
                      if (changeEvent.target.value < b_eff) {
                        setB(parseFloat(changeEvent.target.value.replace(",", ".")));
                        document.getElementById("inputB").value = b;
                      }
                    }}
                  />
                </Col>
              </Row>
              {/* ------------------------ h >--- */}
              <Row>
                <h6>h:</h6>
                <Col>
                  <Form.Group
                    className="mb-3"
                    onChange={(e) => {
                      setH(parseFloat(e.target.value.replace(",", ".")));
                    }}
                  >
                    <Form.Control id="inputH" type="number" placeholder="1.2" />
                  </Form.Group>
                </Col>
                <Col>
                  <RangeSlider
                    size="lg"
                    tooltip="off"
                    min={0.1}
                    max={4}
                    step={0.01}
                    value={h}
                    onChange={(changeEvent) => {
                      if (changeEvent.target.value > h_sl) {
                        setH(parseFloat(changeEvent.target.value.replace(",", ".")));
                        document.getElementById("inputH").value = h;
                      }
                    }}
                  />
                </Col>
              </Row>
              {/* ------------------------ h_sl >--- */}
              <Row>
                <h6>h_sl:</h6>
                <Col>
                  <Form.Group
                    className="mb-3"
                    onChange={(e) => {
                      setH_sl(parseFloat(e.target.value.replace(",", ".")));
                    }}
                  >
                    <Form.Control
                      id="inputH_sl"
                      type="number"
                      placeholder="0.2"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <RangeSlider
                    size="lg"
                    tooltip="off"
                    min={0.1}
                    max={4}
                    step={0.01}
                    value={h_sl}
                    onChange={(changeEvent) => {
                      if (changeEvent.target.value < h) {
                        setH_sl(parseFloat(changeEvent.target.value.replace(",", ".")));
                        document.getElementById("inputH_sl").value = h_sl;
                      }
                    }}
                  />
                </Col>
              </Row>

              {/* ------------------------ b_eff >--- */}
              <Row>
                <h6>b_eff:</h6>
                <Col>
                  <Form.Group
                    className="mb-3"
                    onChange={(e) => {
                      setB_eff(parseFloat(e.target.value.replace(",", ".")));
                    }}
                  >
                    <Form.Control
                      id="inputB_eff"
                      type="number"
                      placeholder="1"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <RangeSlider
                    size="lg"
                    tooltip="off"
                    min={0.1}
                    max={4}
                    step={0.01}
                    value={b_eff}
                    onChange={(changeEvent) => {
                      if (changeEvent.target.value > b) {
                        setB_eff(parseFloat(changeEvent.target.value.replace(",", ".")));
                        document.getElementById("inputB_eff").value = b_eff;
                      }
                    }}
                  />
                </Col>
              </Row>

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
            {/* <img
              src={image}
              width={332}
              height={400}
              alt="cocktail db logo"
              className="weightElement"
            /> */}
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
