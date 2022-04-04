import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  Button,
  Col,
  Row,
  Table,
  Collapse,
} from "react-bootstrap";
import { useGlobalContext } from "../Context";
import axios from "axios";
import image from "../assets/API_1_pio.png";

const ReinforcedConcreteCalcView = () => {
  const {
    setModalInfoShow,
    setModalInfoText,
    setModalInputShow,
    setModalInputText,
    modalInputShow,
    setModalWaitShow,
    setModalWaitText,
    modalInputOkPressed,
    okPressedModalInput,

  } = useGlobalContext();
  /* JSON Input data */
  const [nameValue, setNameValue] = useState("My first cross sect");
  const [bValue, setBValue] = useState(0.5);
  const [hValue, setHValue] = useState(1);
  const [concreteClassValue, setConcreteClassValue] = useState("C30_37");
  const [steelTypeValue, setSteelTypeValue] = useState("BSt500S");
  const [cValue, setCValue] = useState(30);
  const [fiValue, setFiValue] = useState(32);
  const [noOfBarsValue, setNoOfBarsValue] = useState(8);
  const [fiSValue, setFiSValue] = useState(12);
  /* JSON Api data */
  const [m_rd, setM_rd] = useState(0);
  const [ksi_eff, setKsi_eff] = useState(0);
  const [x_eff, setX_eff] = useState(0);
  /* Visual - results view collapse*/
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  /* Handling errors */
  const isErr = useRef(false);
  const waitUntilOk = useRef(false);

  useEffect(() => {
    if (modalInputShow){    
      console.log("Modal input show is " + modalInputShow);
    } else {
      console.log("Modal input show is " + modalInputShow);
    }
  }, [modalInputShow]);

  useEffect(() => {
    if (modalInputOkPressed){
      waitUntilOk.current = false;
      initSendData();
      isErr.current = false;
      okPressedModalInput();
      console.log("OK_PRESSED: is TRUE");
    } 
  }, [modalInputOkPressed]);

  /**
   * Send JSON to API
   * @param {*} event event fo pervent default action
   */
  const sendData = (event) => {
    handleError();
    if (!waitUntilOk.current && !isErr.current) {
      initSendData();
      console.log("b: " + bValue + " h: " + hValue + " c: " + cValue + " modalOkPressed:" + modalInputShow);
      isErr.current = false;
    }    
    event.preventDefault();
  };

  async function initSendData() {
    console.log("ERR: " + isErr.current);
    setModalWaitShow(true);
    setModalWaitText("Please wait...");
    await axios
      .post(
        "https://django-civil-85.herokuapp.com/api/civil_calcs/rect_sing_reinf",
        {
          name: nameValue,
          b: bValue,
          h: hValue,
          cl_conc: concreteClassValue,
          cl_steel: steelTypeValue,
          c: cValue,
          fi: fiValue,
          no_of_bars: noOfBarsValue,
          fi_s: fiSValue,
        }
      )
      .then(
        (response) => {
          setM_rd(response.data.m_rd);
          setKsi_eff(response.data.ksi_eff);
          setX_eff(response.data.x_eff);
          setModalWaitShow(false);
          setIsCollapseOpen(true);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const handleError = () => {
    if (Number.isNaN(bValue) || bValue <= 0) {
      setModalInfoText("Invalid value : 'b'");
      setModalInfoShow(true);
      isErr.current = true;
      console.log("B is NAN or b value <= 0 isErr: " + isErr.current);
    }

    if (Number.isNaN(hValue) || hValue <= 0) {
      setModalInfoText("Invalid value : 'h'");
      setModalInfoShow(true);
      isErr.current = true;
      console.log("h is NAN or h value <= 0 isErr: " + isErr.current);
    }

    if (bValue > 2) {
      waitUntilOk.current = true;
      setModalInputText(
        "Value 'b', are you sure you entered the given values in meters?"
      );
      setModalInputShow(true);
    }

    if (hValue > 4) {
      waitUntilOk.current = true;
      setModalInputText(
        "Value 'h', are you sure you entered the given values in meters?"
      );
      setModalInputShow(true);
    }

    if (Number.isNaN(cValue) || cValue <= 0) {
      setModalInfoText("Invalid value : 'c'");
      setModalInfoShow(true);
      isErr.current = true;
      console.log("c is NAN or c value <= 0 isErr: " + isErr.current);
    }

    if (cValue < 20) {
      waitUntilOk.current = true;
      setModalInputText(
        "The concrete cover is rarely smaller than 20 mm, are you sure of this decision?"
      );
      setModalInputShow(true);
    }

    if (cValue > 70) {
      waitUntilOk.current = true;
      setModalInputText(
        "the concrete cover is rarely grater than 70 mm, are you sure of this decision?"
      );
      setModalInputShow(true);
    }
  };

  return (
    <>
      <Container>
        <h3>Reinforced concrete calculator</h3>
      </Container>
      <Container fluid="md">
        <Row>
          <Col>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="name_value"
                onChange={(e) => {
                  setNameValue(e.target.value);
                }}
              >
                <Form.Label>Cross section label:</Form.Label>
                <Form.Control type="text" placeholder="My first cross sect" />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="b_value"
                onChange={(e) => {
                  setBValue(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>Width 'b' [m]:</Form.Label>
                <Form.Control type="number" placeholder="0.5" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="h_value"
                onChange={(e) => {
                  setHValue(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>Height 'h' [m]:</Form.Label>
                <Form.Control type="number" placeholder="1.0" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="concrete_class"
                onChange={(e) => {
                  setConcreteClassValue(e.target.value);
                }}
              >
                <Form.Label>Concrete class :</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="1">C30_37</option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="steel_type"
                onChange={(e) => {
                  setSteelTypeValue(e.target.value);
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
                controlId="c_value"
                onChange={(e) => {
                  setCValue(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>Concrete cover 'c' [mm]: </Form.Label>
                <Form.Control type="number" placeholder="30" />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="fi_value"
                onChange={(e) => {
                  setFiValue(parseFloat(e.target.value.replace(",", ".")));
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
                controlId="no_of_bar_value"
                onChange={(e) => {
                  setNoOfBarsValue(
                    parseFloat(e.target.value.replace(",", "."))
                  );
                }}
              >
                <Form.Label>Number of main rebars : </Form.Label>
                <Form.Control type="number" placeholder="8" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="fi_s_value"
                onChange={(e) => {
                  setFiSValue(parseFloat(e.target.value.replace(",", ".")));
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
              aria-expanded={isCollapseOpen}
              onClick={(event) => {
                sendData(event);
              }}
            >
              Calculate
            </Button>
          </Col>
          <Col>
            <Container>
              <img
                src={image}
                width={732}
                height={800}
                alt="cocktail db logo"
                className="weightElement"
              />
            </Container>
          </Col>
        </Row>
        <br></br>
        <Collapse in={isCollapseOpen}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td colSpan="3">Bending capacity of analyzed cross section</td>
              </tr>
              <tr>
                <th>
                  Bending capacity of analyzed cross section 'M<sub>rd</sub>' :
                </th>
                <th>
                  Relative height of the compression zone 'ξ<sub>iff</sub>' :
                </th>
                <th>
                  Height of the compression zone 'x<sub>eff</sub>' :
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{m_rd !== 0 && <h4>{m_rd} [kN]</h4>}</td>
                <td>{m_rd !== 0 && <h4>{ksi_eff} [-]</h4>}</td>
                <td>{m_rd !== 0 && <h4>{x_eff} [m]</h4>}</td>
              </tr>
            </tbody>
          </Table>
        </Collapse>
      </Container>
    </>
  );
};

export default ReinforcedConcreteCalcView;
