import React, { useState } from "react";
import { Container, Form, Button, Col, Row, Table } from "react-bootstrap";
import axios from "axios";
import image from "../assets/API_1_pio.png";

const ReinforcedConcreteCalcView = () => {
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

  /**
   * Send JSON to API
   * @param {*} event event fo pervent default action
   */
  async function sendData(event) {
    event.preventDefault();
    await axios
      .post("https://django-civil-85.herokuapp.com/rect_sing_reinf", {
        name: nameValue,
        b: bValue,
        h: hValue,
        cl_conc: concreteClassValue,
        cl_steel: steelTypeValue,
        c: cValue,
        fi: fiValue,
        no_of_bars: noOfBarsValue,
        fi_s: fiSValue,
      })
      .then(
        (response) => {
          setM_rd(response.data.m_rd);
          setKsi_eff(response.data.ksi_eff);
          setX_eff(response.data.x_eff);
        },
        (error) => {
          console.log(error);
        }
      );
  }

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
                <Form.Control type="number" placeholder="32" />
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
                <Form.Control type="number" placeholder="12" />
              </Form.Group>
            </Form>
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
        <Row>
          <Button
            variant="success"
            type="button"
            className="btn btn-primary"
            onClick={(event) => {
              sendData(event);
            }}
          >
            Calculate
          </Button>
        </Row>
        <br></br>
        <Row>
          <h4>Bending capacity of analyzed cross section:</h4>
        </Row>
        <Table striped bordered hover>
          <thead>
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
      </Container>
    </>
  );
};

export default ReinforcedConcreteCalcView;
