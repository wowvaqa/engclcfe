import React, { useEffect } from "react";
import { Table, Collapse } from "react-bootstrap";

import { useGlobalContext } from "../Context";

const RectDoubleReinfResultView = ({
  isCollapseOpen,
}) => {
  const { doubleReinforcedConcreteDataFromApi } = useGlobalContext();

  useEffect(() => {
    console.log(
      "Reciving data from API: " + doubleReinforcedConcreteDataFromApi
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doubleReinforcedConcreteDataFromApi]);

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
              <td>
                {doubleReinforcedConcreteDataFromApi.m_rd !== 0 && (
                  <h4>{doubleReinforcedConcreteDataFromApi.m_rd} [kN]</h4>
                )}
              </td>
              <td>
                {doubleReinforcedConcreteDataFromApi.m_rd !== 0 && (
                  <h4>{doubleReinforcedConcreteDataFromApi.ksi_eff} [-]</h4>
                )}
              </td>
              <td>
                {doubleReinforcedConcreteDataFromApi.m_rd !== 0 && (
                  <h4>{doubleReinforcedConcreteDataFromApi.x_eff} [m]</h4>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </Collapse>
    </>
  );
};

export default RectDoubleReinfResultView;
