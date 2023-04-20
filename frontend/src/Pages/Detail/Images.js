import React, { useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { instance } from "../../utils/axios";
import { Spin, Image } from "antd";

import "./style.css"

export default function Images({ id }) {
  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(true);

  const [imgs, setImgs] = useState([]);
  const onChange = () => {};

  const onClickItem = () => {};

  const onClickThumb = () => {};

  useEffect(() => {
    instance
      .post("/apis/exam/exam-images", {
        id,
      })
      .then((res) => {
        let data = res.data.respond;
        setImgs(data);
        setLoading(false);
      });
  }, []);

  return (
    <Spin
      spinning={loading}
      size="large"
      tip="Loading..."
      style={{ backgroundColor: "black" }}
    >
      <Carousel
        dynamicWidth
        showArrows={true}
        onChange={onChange}
        onClickItem={onClickItem}
        onClickThumb={onClickThumb}
        infiniteLoop = {true}
       
      >
        {imgs.map((value, index) => (
          <div>
            <Image height={600} src={`data:image/jpeg;base64,${value.image}`} />
            <p className="legend">Ảnh {index + 1}</p>
          </div>
        ))}
      </Carousel>

      <div style={{ color: "red", textAlign: "center" }}>
        Nhấn (hoặc chạm) vào ảnh để phóng to.
      </div>
    </Spin>
  );
}
