import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const ReinforcedConcreteCalcView = () => {
  /* JSON Input data */
  const [nameValue, setNameValue] = useState("My first cross sect");
  const [bValue, setBValue] = useState(0.5);
  const [hValue, setHValue] = useState(1);
  const [concreteClassValue, setConcreteClassValue] = useState("C30_37");
  const [steelTypeValue, setSteelTypeValue] = useState("bst500s");
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
        <h1>Kalkulator żelbetu v. 0.0.1</h1>
      </Container>

      <Container>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="name_value"
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
          >
            <Form.Label>Nazwa:</Form.Label>
            <Form.Control type="text" placeholder="My first cross sect" />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="b_value"
            onChange={(e) => {
              setBValue(parseFloat(e.target.value.replace(",", ".")));
            }}
          >
            <Form.Label>b:</Form.Label>
            <Form.Control type="number" placeholder="0.5" />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="h_value"
            onChange={(e) => {
              setHValue(parseFloat(e.target.value.replace(",", ".")));
            }}
          >
            <Form.Label>h:</Form.Label>
            <Form.Control type="number" placeholder="1.0" />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="concrete_class"
            onChange={(e) => {
              setConcreteClassValue(e.target.value);
            }}
          >
            <Form.Label>Klasa betonu:</Form.Label>
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
            <Form.Label>Typ stali:</Form.Label>
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
            <Form.Label>c:</Form.Label>
            <Form.Control type="number" placeholder="30" />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="fi_value"
            onChange={(e) => {
              setFiValue(parseFloat(e.target.value.replace(",", ".")));
            }}
          >
            <Form.Label>fi:</Form.Label>
            <Form.Control type="number" placeholder="32" />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="no_of_bar_value"
            onChange={(e) => {
              setNoOfBarsValue(parseFloat(e.target.value.replace(",", ".")));
            }}
          >
            <Form.Label>No of bar:</Form.Label>
            <Form.Control type="number" placeholder="8" />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="fi_s_value"
            onChange={(e) => {
              setFiSValue(parseFloat(e.target.value.replace(",", ".")));
            }}
          >
            <Form.Label>fi s:</Form.Label>
            <Form.Control type="number" placeholder="12" />
          </Form.Group>
        </Form>

        <Button
          variant="success"
          type="button"
          className="btn btn-primary"
          onClick={(event) => {
            sendData(event);
          }}
        >
          Wyślij
        </Button>
        {m_rd === 0 && <h4>Tutaj wyświetlimy wynik...</h4>}
        {m_rd !== 0 && (
          <h4>
            m_rd: {m_rd} ksi_eff: {ksi_eff} x_eff: {x_eff}
          </h4>
        )}
      </Container>
    </>
  );
};

export default ReinforcedConcreteCalcView;
