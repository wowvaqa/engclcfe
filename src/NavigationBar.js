import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Kalkulatory inżynieryjne</Navbar.Brand>
          <Nav variant="pills" className="me-auto" defaultActiveKey="/">
            <NavDropdown title="Kalkulatory" id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1" href="/testapi">
                Test API
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2" href="/reinforcedconcretecalc">
                Kalkulator żelbetu
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default NavigationBar;
