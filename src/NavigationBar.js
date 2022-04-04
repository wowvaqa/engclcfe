import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const NavigationBar = () => {
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
            <Navbar.Text>
              Signed in as: <a href="#login">Wowvaqa</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default NavigationBar;
