import { Table, Button, Container, Row, Col, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context";

/**
 * Input table for testing dynamic draws
 * @param {*} props
 */

const DynamicDrawInput = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [key, setKey] = useState(1);

  const [strokeWidth, setStrokeWidth] = useState(2);
  const [bleeding, setBleeding] = useState(10);

  const [outlineData, setOutlineData] = useState([]);

  const { setDynamicDrawData, setDrawProperties } = useGlobalContext();

  useEffect(() => {
    console.log("outlineData has change", outlineData);
    setDynamicDrawData(outlineData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outlineData]);

  /**
   * Updating line stroke width & edge bleeding of dynamic draw
   * @param {*} event
   */
  const updateDrawProperties = (event) => {
    const drawPropertiesData = { strokeWidth, bleeding };
    // setDrawProps(drawPropertiesData);
    setDrawProperties(drawPropertiesData)
    event.preventDefault();
  };

  const addData = (event) => {
    const dataForDraw = { key, x, y };

    setKey(key + 1);
    setOutlineData((data) => [...data, dataForDraw]);

    console.log("(Dynamic draw input) Outline data: ", outlineData);
    event.preventDefault();
  };

  const clearData = (event) => {
    setOutlineData([]);
    event.preventDefault();
  };

  return (
    <>
      <Container fluid="md">
        <Row>
          <Col>
            <Form>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="x"
                    onChange={(e) => {
                      setX(parseFloat(e.target.value.replace(",", ".")));
                    }}
                  >
                    <Form.Label>X coord</Form.Label>
                    <Form.Control type="number" placeholder="0" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="y"
                    onChange={(e) => {
                      setY(parseFloat(e.target.value.replace(",", ".")));
                    }}
                  >
                    <Form.Label>Y coord:</Form.Label>
                    <Form.Control type="number" placeholder="0" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="strokeWidth"
                    onChange={(e) => {
                      setStrokeWidth(
                        parseFloat(e.target.value.replace(",", "."))
                      );
                    }}
                  >
                    <Form.Label>StrokeWidth:</Form.Label>
                    <Form.Control type="number" placeholder="2" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="bleeding"
                    onChange={(e) => {
                      setBleeding(parseFloat(e.target.value.replace(",", ".")));
                    }}
                  >
                    <Form.Label>Bleeding:</Form.Label>
                    <Form.Control type="number" placeholder="10" />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <Row>
              <Col>
                <Button
                  variant="primary"
                  type="button"
                  className="btn btn-primary"
                  aria-controls="example-collapse-text"
                  aria-expanded={true}
                  onClick={(event) => {
                    addData(event);
                  }}
                >
                  ADD
                </Button>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  type="button"
                  className="btn btn-primary"
                  aria-controls="example-collapse-text"
                  aria-expanded={true}
                  onClick={(event) => {
                    clearData(event);
                  }}
                >
                  CLEAR
                </Button>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  type="button"
                  className="btn btn-primary"
                  aria-controls="example-collapse-text"
                  aria-expanded={true}
                  onClick={(event) => {
                    updateDrawProperties(event);
                  }}
                >
                  UPDATE
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Container fluid="md">
        <Table striped bordered hover size="sm" responsive="xl">
          <thead>
            <tr>
              <td colSpan="6">
                Enter and add coordinates of a point of the figure
              </td>
            </tr>
            <tr>
              <th>x</th>
              <th>y</th>
            </tr>
          </thead>
          <tbody>
            {outlineData.map((el) => (
              <tr key={el.key}>
                <td>{el.x}</td>
                <td>{el.y}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default DynamicDrawInput;
