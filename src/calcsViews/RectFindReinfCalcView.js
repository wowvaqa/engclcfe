import React from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import image from "../assets/API_1_pio.png";

import RectFindReinfResultView from "../calcsViews/RectFindReinfResultView";

const RectFindReinfCalcView = () => {
  return (
    <>
      <Container>
        <h3>Single-reinforced section dimensioning</h3>
      </Container>
      <Container fluid="md">
        <Row>
          <Col>
            <Form>
              {/* ------------------------< name >--- */}
              <Form.Group
                className="mb-3"
                controlId="name_value"
                onChange={(e) => {}}
              >
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" placeholder="My first dimensioning" />
              </Form.Group>
              {/* ------------------------< b >--- */}
              <Form.Group
                className="mb-3"
                controlId="b_value"
                onChange={(e) => {}}
              >
                <Form.Label>Width 'b' [m]:</Form.Label>
                <Form.Control type="number" placeholder="1.4" />
              </Form.Group>
              {/* ------------------------< h >--- */}
              <Form.Group
                className="mb-3"
                controlId="h_value"
                onChange={(e) => {}}
              >
                <Form.Label>Height 'h' [m]:</Form.Label>
                <Form.Control type="number" placeholder="0.5" />
              </Form.Group>
              <Row>
                <Col>
                  {/* ------------------------< cl_conc >--- */}
                  <Form.Group
                    className="mb-3"
                    controlId="concrete_class"
                    onChange={(e) => {}}
                  >
                    <Form.Label>Concrete class :</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option value="1">C30_37</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  {/* ------------------------< cl_steel >--- */}
                  <Form.Group
                    className="mb-3"
                    controlId="steel_type"
                    onChange={(e) => {}}
                  >
                    <Form.Label>Steel class :</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option value="1">Bst500s</option>
                      <option value="1">B500SP</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              {/* ------------------------< c >--- */}
              <Form.Group
                className="mb-3"
                controlId="c_value"
                onChange={(e) => {}}
              >
                <Form.Label>Concrete cover 'c' [mm]: </Form.Label>
                <Form.Control type="number" placeholder="30" />
              </Form.Group>
              {/* ------------------------< fi >--- */}
              <Form.Group
                className="mb-3"
                controlId="fi_value"
                onChange={(e) => {}}
              >
                <Form.Label>Main reinforcement diameter Ø [mm]: </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  placeholder="32"
                >
                  <option value="32">32</option>
                  <option value="25">25</option>
                  <option value="20">20</option>
                  <option value="18">18</option>
                  <option value="16">16</option>
                  <option value="12">12</option>
                  <option value="10">10</option>
                  <option value="8">8</option>
                  <option value="6">6</option>
                </Form.Select>
              </Form.Group>
              {/* ------------------------< fi_s >--- */}
              <Form.Group
                className="mb-3"
                controlId="fi_s_value"
                onChange={(e) => {}}
              >
                <Form.Label>
                  Diameter of stirrups Ø<sub>s</sub> [mm]:
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  placeholder="12"
                >
                  <option value="32">32</option>
                  <option value="25">25</option>
                  <option value="20">20</option>
                  <option value="18">18</option>
                  <option value="16">16</option>
                  <option value="12">12</option>
                  <option value="10">10</option>
                  <option value="8">8</option>
                  <option value="6">6</option>
                </Form.Select>
              </Form.Group>
              {/* ------------------------< fi_opp >--- */}
              <Form.Group
                className="mb-3"
                controlId="fi_opp_value"
                onChange={(e) => {}}
              >
                <Form.Label>Opp. reinforc. diameter Ø [mm]:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  placeholder="16"
                >
                  <option value="32">32</option>
                  <option value="25">25</option>
                  <option value="20">20</option>
                  <option value="18">18</option>
                  <option value="16">16</option>
                  <option value="12">12</option>
                  <option value="10">10</option>
                  <option value="8">8</option>
                  <option value="6">6</option>
                </Form.Select>
              </Form.Group>
              {/* ------------------------< m_sd >--- */}
              <Form.Group
                className="mb-3"
                controlId="csd_value"
                onChange={(e) => {}}
              >
                <Form.Label>m_sd: </Form.Label>
                <Form.Control type="number" placeholder="8000" />
              </Form.Group>
            </Form>
            <Button
              variant="primary"
              type="button"
              className="btn btn-primary"
              aria-controls="example-collapse-text"
              aria-expanded={true}
              onClick={(event) => {}}
            >
              Calculate
            </Button>
          </Col>
          <Col>
            <img
              src={image}
              width={732}
              height={800}
              alt="cocktail db logo"
              className="weightElement"
            />
          </Col>
        </Row>
        <br></br>
        <RectFindReinfResultView
          isCollapseOpen={true}
          as1={0}
          ns1={0}
          as2={0}
          ns2={0}
          remark={0}
        />
      </Container>
    </>
  );
};

export default RectFindReinfCalcView;
