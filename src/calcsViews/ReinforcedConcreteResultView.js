import React from "react";
import { Table, Collapse } from "react-bootstrap";

const ReinforcedConcreteResultView = ({
  isCollapseOpen,
  m_rd,
  ksi_eff,
  x_eff,
}) => {
  return (
    <>
      <Collapse in={isCollapseOpen}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <td colSpan="3">Bending capacity of analyzed cross section</td>
            </tr>
            <tr>
              <th>
                Bending capacity of analyzed cross section 'M<sub>rd</sub>' :
              </th>
              <th>
                Relative height of the compression zone 'ξ<sub>eff</sub>' :
              </th>
              <th>
                Height of the compression zone 'x<sub>eff</sub>' :
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{m_rd !== 0 && <h4>{m_rd} [kN]</h4>}</td>
              <td>{m_rd !== 0 && <h4>{ksi_eff} [-]</h4>}</td>
              <td>{m_rd !== 0 && <h4>{x_eff} [m]</h4>}</td>
            </tr>
          </tbody>
        </Table>
      </Collapse>
    </>
  );
};

export default ReinforcedConcreteResultView;
