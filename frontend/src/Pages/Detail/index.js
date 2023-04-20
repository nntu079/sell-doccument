import React from "react";

import { BrowserRouter as Router, Switch, useLocation,useParams  } from "react-router-dom";

import CommonInfo from "./CommonInfo";
import File from "./File";
import { Col, Row } from "antd";
import Header from "../../Components/Header";

import Images from "./Images";

export default function Detail() {
 
  let { id } = useParams();

  
  return (
    <>
      <Header />

      <Row
        gutter={[16, 24]}
        style={{ marginLeft: "30px", marginRight: "30px" }}
      >
        <Col span={[ 24]}>
          <Images id={id}/>
        </Col>

        <Col span={[12]}>
          <CommonInfo
            id={id}
            title={"Đề thi cuối kỳ giải tích"}
            price={0}
            description={"Đề thi cuối kỳ giải tích, đề rất hay"}
            type={"exam"}
            school={"Đại học Khoa Học Tự Nhiên TPHCM"}
            semester={"Học Kỳ 1"}
            ship={"Ca 1"}
            system={"Chính quy"}
          />
        </Col>

        <Col span={[12]}>
          <File />
        </Col>

      </Row>
    </>
  );
}
