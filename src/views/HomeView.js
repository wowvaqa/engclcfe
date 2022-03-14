import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const HomeView = () => {
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
        <h1>Test API v. 0.0.5</h1>
      </Container>

      <Container>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="a_value"
            onChange={(e) => {
              setFirstVal(parseFloat(e.target.value.replace(",", ".")));
            }}
          >
            <Form.Label>Wartość A:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="b_value"
            onChange={(e) => {
              setSecVal(parseFloat(e.target.value.replace(",", ".")));
            }}
          >
            <Form.Label>Wartość B:</Form.Label>
            <Form.Control type="text" />
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
        <br></br>
        <br></br>

        {sum === 0 && <h4>Tutaj wyświetlimy wynik działania...</h4>}
        {sum !== 0 && <h4>Wynik: {sum}</h4>}
      </Container>
    </>
  );
};

export default HomeView;
