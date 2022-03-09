import React from "react";
import { Container, Form } from "react-bootstrap";

const HomeView = () => {
    return (
        <>
            <Container>
                <h1>Kalkulator inżynieryjny</h1>
            </Container>

            <Container>
                <Form>
                <Form.Group
                className="mb-3"
                controlId="a_value"
                
              >
                <Form.Label>Wartość A:</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="b_value"
                
              >
                <Form.Label>Wartość B:</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
                </Form>
            </Container>
        </>
    )
}

export default HomeView