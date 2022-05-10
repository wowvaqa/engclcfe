import React, { useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";

import { useCookies } from "react-cookie";

import { useGlobalContext } from "./Context";

const NavigationBar = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const { isLogged, setIsLogged } = useGlobalContext();

  useEffect(() => {
    console.log(cookies);
    if (cookies.member !== undefined) {
      console.log("cookies.member.length:" + cookies.member.length);
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = (event) => {
    setIsLogged(false);
    event.preventDefault();
    removeCookie("member");
    removeCookie("token");
    console.log("Nastąpiło wylogowanie");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ENGINEERING CALCULATORS</Navbar.Brand>
          <Nav variant="pills" className="me-auto" defaultActiveKey="/">
            <NavDropdown
              title="Reinforced concrete computations"
              id="nav-dropdown"
            >
              <NavDropdown.Item eventKey="4.0" href="/canvastesting">
                Canvas Testing
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="4.1" href="/testapi">
                Test API
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="4.2"
                href="/calcs/reinforcedconcretecalc"
              >
                Single reinforced concrete calculator
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="4.3"
                href="/calcs/rectdoublereinfcalc"
              >
                Double reinforced concrete calculator
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="4.4" href="/calcs/rectfindreinfcalc">
                Single-reinforced section dimensioning
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="4.5" href="/calcs/tsecreinfcalc">
                T-section reinforcement calculator
              </NavDropdown.Item>
              {isLogged === true && (
                <NavDropdown.Item eventKey="4.6" href="/compdatathree">
                  Token access test
                </NavDropdown.Item>
              )}
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
                <a href="/login">{cookies.member}</a>{" "}
              </Navbar.Text>
            )}
            <p>..</p>
            {isLogged !== false && (
              <Button
                size="sm"
                variant="secondary"
                onClick={(event) => {
                  logout(event);
                }}
              >
                Logout
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default NavigationBar;
