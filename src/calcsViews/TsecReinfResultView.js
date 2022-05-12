import React, { useEffect } from "react";
import { Table, Collapse } from "react-bootstrap";

import { useGlobalContext } from "../Context";

const TsecReinfResultView = ({ isCollapseOpen }) => {
  const { tReinforcedConcreteDataFromApi } = useGlobalContext();

  useEffect(() => {
    console.log("Reciving data from API: " + tReinforcedConcreteDataFromApi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tReinforcedConcreteDataFromApi]);

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
                <h4>{tReinforcedConcreteDataFromApi.as1} [m2]</h4>
              </td>
              <td>
                <h4>{tReinforcedConcreteDataFromApi.ns1} </h4>
              </td>
              <td>
                <h4>{tReinforcedConcreteDataFromApi.as2} [m2]</h4>
              </td>
              <td>
                <h4>{tReinforcedConcreteDataFromApi.ns2} </h4>
              </td>
              <td>
                <h4>{tReinforcedConcreteDataFromApi.remark} </h4>
              </td>
              <td>
                <h4>{tReinforcedConcreteDataFromApi.remark2} </h4>
              </td>
            </tr>
          </tbody>
        </Table>
      </Collapse>
    </>
  );
};

export default TsecReinfResultView;
