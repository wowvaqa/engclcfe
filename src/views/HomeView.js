import React, {useEffect, useState} from "react";
import { Container, Form, Button } from "react-bootstrap";

const HomeView = () => {

    const [appState, setAppState] = useState({
        loading: false,
        repos: null,
      });

    useEffect(() => {
        setAppState({ loading: true });
        const apiUrl = `https://django-civil-85.herokuapp.com/comp_data`;
        fetch(apiUrl)
          .then((res) => res.json())
          .then((repos) => {
            setAppState({ loading: false, repos: repos });
          });
      }, [setAppState]);


    const sendData = () => {
        console.log(appState);
    };

    return (
        <>
            <Container>
                <h1>Test API</h1>
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
    )
}

export default HomeView