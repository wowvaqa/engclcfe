import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const HomeView = () => {
  const [sum, setSum] = useState(0);
  const [firstVal, setFirstVal] = useState(20);
  const [secVal, setSecVal] = useState(11);
  const [jsonData, setJsonData] = useState();
  const [loading, setLoading] = useState(false);

  async function sendData() {
    await axios
      .post("https://django-civil-85.herokuapp.com/comp_data", {
        first_number: firstVal,
        second_number: secVal,
      })
      .then(
        (response) => {
          console.log(response);
          setJsonData(response.data);
          console.log(jsonData.sum);
          const tempSum = jsonData.sum;
          setSum(tempSum);
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <>
      <Container>
        <h1>Test API v. 0.0.4</h1>
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
          onClick={() => {
            setLoading(true);
            sendData();
          }}
        >
          Wyślij
        </Button>
        <br></br>
        <br></br>

        {loading && <h4>Czekam na wynik...</h4>}
        {!loading && <h4>Wynik: {sum}</h4>}
      </Container>
    </>
  );
};

export default HomeView;
