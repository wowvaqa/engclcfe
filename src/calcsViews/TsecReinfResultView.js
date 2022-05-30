import React from "react";
import { Table, Collapse } from "react-bootstrap";
import { roundNumber } from "../utils/Utils";

const TsecReinfResultView = ({
  isCollapseOpen,
  as1,
  ns1,
  as2,
  ns2,
  remark,
  remark2,
}) => {
  return (
    <>
      <Collapse in={isCollapseOpen}>
        <Table striped bordered hover size="sm" responsive="xl">
          <thead>
            <tr>
              <td colSpan="6">Bending capacity of analyzed T cross section</td>
            </tr>
            <tr>
              <th>Main reinforcement req. area (As1)</th>
              <th>Req. number of main bars </th>
              <th>Opposite reinforcement req. area (As2)</th>
              <th>Req. number of opposite (compressed) bars</th>
              <th>Remark</th>
              <th>Remark 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h4>{roundNumber(as1, 4)} [m2]</h4>
              </td>
              <td>
                <h4>{roundNumber(ns1, 4)} </h4>
              </td>
              <td>
                <h4>{roundNumber(as2, 4)} [m2]</h4>
              </td>
              <td>
                <h4>{roundNumber(ns2, 4)} </h4>
              </td>
              <td>
                <h4>{remark} </h4>
              </td>
              <td>
                <h4>{remark2} </h4>
              </td>
            </tr>
          </tbody>
        </Table>
      </Collapse>
    </>
  );
};

export default TsecReinfResultView;
