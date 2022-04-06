import React, { useState } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGlobalContext } from "../Context";

const CompDataThree = () => {
  const { setModalInfoShow, setModalInfoText } = useGlobalContext();

  const [sum, setSum] = useState(0);
  const [firstVal, setFirstVal] = useState(20);
  const [secVal, setSecVal] = useState(11);
  const [thirdVal, setThirdVal] = useState(20);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState();
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies();

  async function sendData(event) {
    event.preventDefault();

    handleError();
    // setCookie("token", "871ada39b44e1e0e64518104db630e2062e040c3", {
    //   path: "/",
    // });

    setToken(cookies.token);
    console.log("Token: " + cookies.token);

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + cookies.token,
    };

    await axios
      .post(
        "https://django-civil-85.herokuapp.com/api/civil_calcs/comp_data_three",
        {
          first_number: firstVal,
          second_number: secVal,
          third_number: thirdVal,
        }
      )
      .then(
        (response) => {
          //setJsonData(response.data);
          setSum(response.data.sum);
        },
        (error) => {
          setModalInfoText("Error");
          setModalInfoShow(true);
          console.log(error);
        }
      );
  }

  const handleError = () => {};
  return (
    <>
      <Container>
        <h1>Token access data test</h1>
      </Container>
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="a_value"
                onChange={(e) => {
                  setFirstVal(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>Wartość A:</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="b_value"
                onChange={(e) => {
                  setSecVal(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>Wartość B:</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="c_value"
                onChange={(e) => {
                  setThirdVal(parseFloat(e.target.value.replace(",", ".")));
                }}
              >
                <Form.Label>Wartość C:</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
            </Col>
          </Row>
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

export default CompDataThree;
