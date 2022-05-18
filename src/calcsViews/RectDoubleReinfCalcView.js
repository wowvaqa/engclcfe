import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import image from "../assets/API_2_pio.png";

import { useGlobalContext } from "../Context";

import RectDoubleReinfHandleErr from "../calcsViews/RectDoubleReinfHandleErr";
import RectDoubleReinfResultView from "../calcsViews/RectDoubleReinfResultView";
import RectDoubleReinfApi from "../calcsViews/RectDoubleReinfApi";

const RectDoubleReinfCalcView = () => {
  const [name, setName] = useState("My first cross sect");
  const [b, setB] = useState(0.5);
  const [h, setH] = useState(1.2);
  const [cl_conc, setCl_conc] = useState("C30_37");
  const [cl_steel, setCl_steel] = useState("BSt500S");
  const [c, setC] = useState(30);
  const [fi, setFi] = useState(32);
  const [no_of_bars, setNo_of_bars] = useState(6);
  const [fi_s, setFi_s] = useState(12);
  const [fi_opp, setFi_opp] = useState(16);
  const [no_of_opp_bars, setNo_of_opp_bars] = useState(2);
  /* JSON Api data */
  const [m_rd, setM_rd] = useState(0);
  const [ksi_eff, setKsi_eff] = useState(0);
  const [x_eff, setX_eff] = useState(0);

  const {
    setDoubleReinforcedConcreteData,
    apiTrigger,
    setApiTrigger,
    doubleReinforcedConcreteDataFromApi,
  } = useGlobalContext();

  useEffect(() => {
    console.log("(DoubleCalcView) Reciving data from API: ");
    console.log(doubleReinforcedConcreteDataFromApi);

    setM_rd(doubleReinforcedConcreteDataFromApi.m_rd);
    setKsi_eff(doubleReinforcedConcreteDataFromApi.ksi_eff);
    setX_eff(doubleReinforcedConcreteDataFromApi.x_eff);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doubleReinforcedConcreteDataFromApi]);

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
      fi_opp,
      no_of_opp_bars,
    };
    console.log("Sending data to API: " + dataToSend);

    setupDataModel(true);
    setDoubleReinforcedConcreteData(dataToSend);
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
      <RectDoubleReinfHandleErr />
      <RectDoubleReinfApi />
      <Container>
        <h3>Double reinforced concrete calculator</h3>
      </Container>
      <Container fluid="md">
        <Row>
          <Col>
            <Form>
              {/* ------------------------ name >--- */}
              <Form.Group
                className="mb-3"
                controlId="name_value"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              >
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="My first double cross sect"
                />
              </Form.Group>
              <Col>
                {/* ------------------------ b >--- */}
                <Form.Group
                  className="mb-3"
                  controlId="b_value"
                  onChange={(e) => {
                    setB(parseFloat(e.target.value.replace(",", ".")));
                  }}
                >
                  <Form.Label>Width 'b' [m]:</Form.Label>
                  <Form.Control type="number" placeholder="0.5" />
                </Form.Group>
              </Col>
              <Col>
                {/* ------------------------ h >--- */}
                <Form.Group
                  className="mb-3"
                  controlId="h_value"
                  onChange={(e) => {
                    setH(parseFloat(e.target.value.replace(",", ".")));
                  }}
                >
                  <Form.Label>Height 'h' [m]:</Form.Label>
                  <Form.Control type="number" placeholder="1.2" />
                </Form.Group>
              </Col>
              <Row>
                <Col>
                  {/* ------------------------ cl_conc >--- */}
                  <Form.Group
                    className="mb-3"
                    controlId="concrete_class"
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
                    controlId="steel_type"
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
                controlId="c_value"
                onChange={(e) => {
                  setC(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>Concrete cover 'c' [mm]: </Form.Label>
                <Form.Control type="number" placeholder="30" />
              </Form.Group>
              <Row>
                <Col>
                  {/* ------------------------< fi >--- */}
                  <Form.Group
                    className="mb-3"
                    controlId="fi_value"
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
                </Col>
                <Col>
                  {/* ------------------------< no_of_bars >--- */}
                  <Form.Group
                    className="mb-3"
                    controlId="no_of_bar_value"
                    onChange={(e) => {
                      setNo_of_bars(
                        parseFloat(e.target.value.replace(",", "."))
                      );
                    }}
                  >
                    <Form.Label>Number of main rebars : </Form.Label>
                    <Form.Control type="number" placeholder="6" />
                  </Form.Group>
                </Col>
              </Row>

              {/* ------------------------< fi_s >--- */}
              <Form.Group
                className="mb-3"
                controlId="fi_s_value"
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
              <Row>
                <Col>
                  {/* ------------------------< fi_opp >--- */}
                  <Form.Group
                    className="mb-3"
                    controlId="fi_opp_value"
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
                </Col>
                <Col>
                  {/* ------------------------< no_of_opp_bars >--- */}
                  <Form.Group
                    className="mb-3"
                    controlId="no_of_opp_bar_value"
                    onChange={(e) => {
                      setNo_of_opp_bars(
                        parseFloat(e.target.value.replace(",", "."))
                      );
                    }}
                  >
                    <Form.Label>Number of opposed rebars : </Form.Label>
                    <Form.Control type="number" placeholder="6" />
                  </Form.Group>
                </Col>
              </Row>
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
            <img
              src={image}
              width={732}
              height={800}
              alt="cocktail db logo"
              className="weightElement"
            />
          </Col>
        </Row>
        <br></br>
        <RectDoubleReinfResultView
          isCollapseOpen={true}
          m_rd={m_rd}
          ksi_eff={ksi_eff}
          x_eff={x_eff}
        />
      </Container>
    </>
  );
};

export default RectDoubleReinfCalcView;
