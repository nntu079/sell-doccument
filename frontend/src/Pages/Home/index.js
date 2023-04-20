import React, { useEffect, useState, useRef } from "react";
import Header from "../../Components/Header";
import { instance } from "../../utils/axios";
import Item from "./item";
import { Row, Col, Spin, Button } from "antd";
import { useUpdateEffect } from "ahooks";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  const page = useRef(1);

  const nextPage = () => {
    page.current++;

    setLoading(true);
    instance
      .post("/apis/document/get-all", {
        page: page.current,
        keyword,
      })
      .then((res) => {
        setLoading(false);
        setData([...data, ...res.data.data]);
      });
  };

  useEffect(() => {
    setLoading(true);
    instance
      .post("/apis/document/get-all", {
        page: 1,
        keyword,
      })
      .then((res) => {
        setLoading(false);
        setData([...data, ...res.data.data]);
      });
  },[]);

  useUpdateEffect(() => {
 
    setLoading(true);
    setData([]);
    page.current=1

    instance
      .post("/apis/document/get-all", {
        page:1,
        keyword,
      })
      .then((res) => {
        setLoading(false);
        setData(res.data.data);
      });
  }, [keyword]);

  return (
    <Spin spinning={loading}>
      <Header setKeyword={setKeyword} />

      <Row gutter={[16, 24]} style={{ marginLeft: "30px" }}>
        {data.map((value) => (
          <Col span={[6, 8, 12]}>
            <Item
              id={value.id}
              title={value.title}
              description={value.description}
              price={value.price}
            />
          </Col>
        ))}
      </Row>

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <Button onClick={nextPage} style={{ width: "50%" }}>
          Xem thêm
        </Button>
      </div>
    </Spin>
  );
}
