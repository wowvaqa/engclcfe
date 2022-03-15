import React, { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import axios from "axios";

const ReinforcedConcreteCalcView = () => {
  const [sum, setSum] = useState(0);
  const [firstVal, setFirstVal] = useState(20);
  const [secVal, setSecVal] = useState(11);

  async function sendData(event) {
    event.preventDefault();
    await axios
      .post("https://django-civil-85.herokuapp.com/comp_data", {
        first_number: firstVal,
        second_number: secVal,
      })
      .then(
        (response) => {
          //setJsonData(response.data);
          setSum(response.data.sum);
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
          <Col>
            <Form.Group
              className="mb-3"
              controlId="name_value"
              onChange={(e) => {}}
            >
              <Form.Label>Nazwa:</Form.Label>
              <Form.Control type="text" placeholder="My first cross sect" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="b_value"
              onChange={(e) => {
                setSecVal(parseFloat(e.target.value.replace(",", ".")));
              }}
            >
              <Form.Label>b:</Form.Label>
              <Form.Control type="number" placeholder="0.5" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="h_value"
              onChange={(e) => {
                setSecVal(parseFloat(e.target.value.replace(",", ".")));
              }}
            >
              <Form.Label>h:</Form.Label>
              <Form.Control type="number" placeholder="1.0" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="concrete_class"
              onChange={(e) => {
                setSecVal(parseFloat(e.target.value.replace(",", ".")));
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
                setSecVal(parseFloat(e.target.value.replace(",", ".")));
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
                setSecVal(parseFloat(e.target.value.replace(",", ".")));
              }}
            >
              <Form.Label>c:</Form.Label>
              <Form.Control type="number" placeholder="30" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="fi_value"
              onChange={(e) => {
                setSecVal(parseFloat(e.target.value.replace(",", ".")));
              }}
            >
              <Form.Label>fi:</Form.Label>
              <Form.Control type="number" placeholder="32" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="no_of_bar_value"
              onChange={(e) => {
                setSecVal(parseFloat(e.target.value.replace(",", ".")));
              }}
            >
              <Form.Label>No of bar:</Form.Label>
              <Form.Control type="number" placeholder="8" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="fi_s_value"
              onChange={(e) => {
                setSecVal(parseFloat(e.target.value.replace(",", ".")));
              }}
            >
              <Form.Label>fi s:</Form.Label>
              <Form.Control type="number" placeholder="12" />
            </Form.Group>
          </Col>
        </Form>
        <br></br>
        <br></br>
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
        {sum === 0 && <h4>Tutaj wyświetlimy wynik działania...</h4>}
        {sum !== 0 && <h4>Wynik: {sum}</h4>}
      </Container>
    </>
  );
};

export default ReinforcedConcreteCalcView;
