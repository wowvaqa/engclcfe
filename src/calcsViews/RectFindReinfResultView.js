import React, { useEffect } from "react";
import { Table, Collapse } from "react-bootstrap";

import { useGlobalContext } from "../Context";

const RectFindReinfResultView = ({ isCollapseOpen }) => {
  const { singleDimensioningDataFromApi } = useGlobalContext();

  useEffect(() => {
    console.log("Reciving data from API: " + singleDimensioningDataFromApi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleDimensioningDataFromApi]);

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
                <h4>{singleDimensioningDataFromApi.as1} [m2]</h4>
              </td>
              <td>
                <h4>{singleDimensioningDataFromApi.ns1}</h4>
              </td>
              <td>
                <h4>{singleDimensioningDataFromApi.as2} [m2]</h4>
              </td>
              <td>
                <h4>{singleDimensioningDataFromApi.ns2}</h4>
              </td>
              <td>
                <h4>{singleDimensioningDataFromApi.remark}</h4>
              </td>
            </tr>
          </tbody>
        </Table>
      </Collapse>
    </>
  );
};

export default RectFindReinfResultView;
