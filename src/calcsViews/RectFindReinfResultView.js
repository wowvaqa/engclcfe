import React from "react";
import { Table, Collapse } from "react-bootstrap";

const RectFindReinfResultView = ({
  isCollapseOpen,
  as1,
  ns1,
  as2,
  ns2,
  remark,
}) => {
  return (
    <>
      <Collapse in={isCollapseOpen}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <td colSpan="5">Bending capacity of analyzed cross section</td>
            </tr>
            <tr>
              <th>Main reinforcement req. area (As1)</th>
              <th>Req. number of main bars</th>
              <th>Opposite reinforcement req. area (As2)</th>
              <th>Req. number of opposite (compressed) bars</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h4>{as1} [m2]</h4>
              </td>
              <td>
                <h4>{ns1}</h4>
              </td>
              <td>
                <h4>{as2} [m2]</h4>
              </td>
              <td>
                <h4>{ns2}</h4>
              </td>
              <td>
                <h4>{remark}</h4>
              </td>
            </tr>
          </tbody>
        </Table>
      </Collapse>
    </>
  );
};

export default RectFindReinfResultView;
