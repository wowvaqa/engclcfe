import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import image from "../assets/API_1_pio.png";

import RectFindReinfResultView from "../calcsViews/RectFindReinfResultView";
import RectFindReinfApi from "../calcsViews/RectFindReinfApi";
import RectFindReinfErrHandler from "../calcsViews/RectFindReinfErrHandler";

import { useGlobalContext } from "../Context";

const RectFindReinfCalcView = () => {
  const [name, setName] = useState("My first cross sect");
  const [b, setB] = useState(0.5);
  const [h, setH] = useState(1.4);
  const [cl_conc, setCl_conc] = useState("C30_37");
  const [cl_steel, setCl_steel] = useState("BSt500S");
  const [c, setC] = useState(30);
  const [fi, setFi] = useState(32);
  const [fi_s, setFi_s] = useState(12);
  const [fi_opp, setFi_opp] = useState(16);
  const [m_sd, setM_sd] = useState(8000);
  /* JSON Api data */
  const [as1, setAs1] = useState(0);
  const [ns1, setNs1] = useState(0);
  const [as2, setAs2] = useState(0);
  const [ns2, setNs2] = useState(0);
  const [remark, setRemark] = useState("no remarks");

  const {
    setSingleDimensioningData,
    apiTrigger,
    setApiTrigger,
    singleDimensioningDataFromApi,
  } = useGlobalContext();

  useEffect(() => {
    console.log("(RectFindView) Reciving data from API: ");
    console.log(singleDimensioningDataFromApi);

    setAs1(singleDimensioningDataFromApi.as1);
    setNs1(singleDimensioningDataFromApi.ns1);
    setAs2(singleDimensioningDataFromApi.as2);
    setNs2(singleDimensioningDataFromApi.ns2);
    setRemark(singleDimensioningDataFromApi.remark);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleDimensioningDataFromApi]);

  const sendDataToApi = (event) => {
    event.preventDefault();
    const dataToSend = {
      name,
      b,
      h,
      cl_conc,
      cl_steel,
      c,
      fi,
      fi_s,
      fi_opp,
      m_sd,
    };
    console.log("(RectFindView) Sending data to API: " + dataToSend);
    setupDataModel(true);
    setSingleDimensioningData(dataToSend);
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
      <RectFindReinfErrHandler />
      <RectFindReinfApi />
      <Container>
        <h3>Single-reinforced section dimensioning</h3>
      </Container>
      <Container fluid="md">
        <Row>
          <Col>
            <Form>
              {/* ------------------------< name >--- */}
              <Form.Group
                className="mb-3"
                controlId="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              >
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" placeholder="My first dimensioning" />
              </Form.Group>
              {/* ------------------------< b >--- */}
              <Form.Group
                className="mb-3"
                controlId="b"
                onChange={(e) => {
                  setB(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>Width 'b' [m]:</Form.Label>
                <Form.Control type="number" placeholder="1.4" />
              </Form.Group>
              {/* ------------------------< h >--- */}
              <Form.Group
                className="mb-3"
                controlId="h"
                onChange={(e) => {
                  setH(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>Height 'h' [m]:</Form.Label>
                <Form.Control type="number" placeholder="0.5" />
              </Form.Group>
              <Row>
                <Col>
                  {/* ------------------------< cl_conc >--- */}
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
                  {/* ------------------------< cl_steel >--- */}
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
                <Form.Label>Opp. reinforc. diameter Ø [mm]:</Form.Label>
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
        <RectFindReinfResultView
          isCollapseOpen={true}
          as1={as1}
          ns1={ns1}
          as2={as2}
          ns2={ns2}
          remark={remark}
        />
      </Container>
    </>
  );
};

export default RectFindReinfCalcView;
