import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import { useGlobalContext } from "../Context";

const LogView = () => {
  const { setLogUser } = useGlobalContext();

  const submitClick = (event) => {
    setLogUser("Wowvaqa");
    event.preventDefault();
  };

  return (
    <>
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Col>
          </Row>

          <Button
            variant="primary"
            type="submit"
            onClick={(event) => {
              submitClick(event);
            }}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default LogView;
