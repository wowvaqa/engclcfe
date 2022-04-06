import React, { useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

import { useCookies } from "react-cookie";

import { useGlobalContext } from "./Context";

const NavigationBar = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies();

  const { isLogged, setIsLogged } = useGlobalContext();

  useEffect(() => {
    console.log(cookies);
    if (cookies.member !== undefined) {
      console.log(cookies.member.length);
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              {isLogged === true && (
              <NavDropdown.Item eventKey="4.3" href="/compdatathree">
                Token access test
              </NavDropdown.Item>)}
            </NavDropdown>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {isLogged === false && (
              <Navbar.Text>
                {" "}
                <a href="/login">Sign In</a>
              </Navbar.Text>
            )}
            {cookies.member !== "" && (
              <Navbar.Text>
                {" "}
                <a href="/login">{cookies.member}</a>
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
