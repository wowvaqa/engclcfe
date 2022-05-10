import React from "react";
import { Table, Collapse } from "react-bootstrap";

const RectFindReinfResultView = ({ isCollapseOpen, as1, ns1, as2, ns2, remark }) => {
  return (
    <>
      <Collapse in={isCollapseOpen}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <td colSpan="5">Bending capacity of analyzed cross section</td>
            </tr>
            <tr>
              <th>As1 :</th>
              <th>ns1 :</th>
              <th>As2 :</th>
              <th>ns2 :</th>
              <th>remark :</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{as1 !== 0 && <h4>{as1} [?]</h4>}</td>
              <td>{ns1 !== 0 && <h4>{ns1} [?]</h4>}</td>
              <td>{as2 !== 0 && <h4>{as2} [?]</h4>}</td>
              <td>{ns2 !== 0 && <h4>{ns2} [?]</h4>}</td>
              <td>{remark !== 0 && <h4>{remark} [?]</h4>}</td>
            </tr>
          </tbody>
        </Table>
      </Collapse>
    </>
  );
};

export default RectFindReinfResultView;
