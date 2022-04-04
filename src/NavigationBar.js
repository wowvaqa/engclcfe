import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

import { useGlobalContext } from "./Context";

const NavigationBar = () => {
  const { logUser } = useGlobalContext();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ENGINEERING CALCULATORS</Navbar.Brand>
          <Nav variant="pills" className="me-auto" defaultActiveKey="/">
            <NavDropdown title="Calcs" id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1" href="/testapi">
                Test API
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2" href="/reinforcedconcretecalc">
                Reinforced concrete calculator
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {logUser === "" && (
              <Navbar.Text>
                {" "}
                <a href="/login">Sign in</a>
              </Navbar.Text>
            )}
            {logUser !== "" && (
              <Navbar.Text> Zalogowany: 
                {" "}
                <a href="/login">{logUser}</a>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default NavigationBar;
