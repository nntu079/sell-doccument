import React, {useEffect, useState } from "react";

import { instance } from "../../utils/axios";

export default function CommonInfo({ id }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [school, setSchool] = useState("");
  const [semester, setSemester] = useState("");
  const [ship, setShip] = useState("");
  const [system, setSystem] = useState("");
  useEffect(() => {
    instance
      .post("/apis/exam/exam-detail", { id })
      .then((data) => {
        let respond = data.data;

        setPrice(respond.document.price);
        setTitle(respond.document.title);
        setDescription(respond.document.description);
        setType(respond.document.type);
        setSchool(respond.exam.school);
        setSemester(respond.exam.semester);
        setShip(respond.exam.ship);
        setSystem(respond.exam.ship);
      })
      .catch((e) => {
        console.log({ e });
      });
  }, []);

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          fontWeight: 800,
          marginBottom: 30,
        }}
      >
        THÔNG TIN
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ width: "50vh", fontWeight: 800 }}>Tiêu đề</div>
        <div style={{ width: "50vh" }}>{title}</div>
      </div>

      {price != 0 && (
        <div style={{ display: "flex" }}>
          <div style={{ width: "50vh", fontWeight: 800 }}>Giá</div>
          <div style={{ width: "50vh" }}>{price}</div>
        </div>
      )}

      <div style={{ display: "flex" }}>
        <div style={{ width: "50vh", fontWeight: 800 }}>Miêu tả</div>
        <div style={{ width: "50vh" }}>{description}</div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ width: "50vh", fontWeight: 800 }}>Loại</div>
        <div style={{ width: "50vh" }}>{type}</div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ width: "50vh", fontWeight: 800 }}>Trường</div>
        <div style={{ width: "50vh" }}>{school}</div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ width: "50vh", fontWeight: 800 }}>Học kỳ</div>
        <div style={{ width: "50vh" }}>{semester}</div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ width: "50vh", fontWeight: 800 }}>Ca thi</div>
        <div style={{ width: "50vh" }}>{ship}</div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ width: "50vh", fontWeight: 800 }}>Hệ</div>
        <div style={{ width: "50vh" }}>{system}</div>
      </div>
    </div>
  );
}
