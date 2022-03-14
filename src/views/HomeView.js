import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const HomeView = () => {
  const apiUrl = "https://django-civil-85.herokuapp.com/comp_data";
  //const apiUrl = "/";

  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(apiUrl);
      const tours = await response.json();
      setTours(tours);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const sendData = () => {
    //fetchTours();

    const data = {
      first_number: 1,
      second_number: 2,
    };

    axios.post(apiUrl, { data }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  return (
    <>
      <Container>
        <h1>Test API</h1>
      </Container>

      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="a_value">
            <Form.Label>Wartość A:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="b_value">
            <Form.Label>Wartość B:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Form>
        <Button
          variant="success"
          type="button"
          className="btn btn-primary"
          onClick={() => sendData()}
        >
          Wyślij
        </Button>
      </Container>
    </>
  );
};

export default HomeView;
