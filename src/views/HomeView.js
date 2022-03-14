import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

// const api = axios.create({
//   baseURL: `https://django-civil-85.herokuapp.com/comp_data`,
// });

// const sendData = async () => {

//   // let res = await api.post("/", { first_number: 1, second_number: 2 });
//   // console.log(res);
// };

const HomeView = () => {
  
  // const sendData = () => {
  //   axios
  //     .post("https://django-civil-85.herokuapp.com/comp_data", {
  //       first_number: 2,
  //       second_number: 3,
  //     })
  //     .then(
  //       (response) => {
  //         console.log(response);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );

  //   //fetchTours();

  //   // const data = {
  //   //   first_number: 1,
  //   //   second_number: 2,
  //   // };
  // };

  return (
    <>
      <Container>
        <h1>Test API v. 0.0.2</h1>
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
          // onClick={() => sendData()}
        >
          Wyślij
        </Button>
      </Container>
    </>
  );
};

export default HomeView;
