import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  HeartOutlined
} from "@ant-design/icons";
import { createSearchParams, useNavigate,Link } from "react-router-dom";

import React from "react";

const { Meta } = Card;

export default function Item({ id,title, description, price }) {

  const navigate = useNavigate();

  const viewDetail = ()=>{
    navigate(`/detail/${id}`);
  }

  return (
    <Card
      style={{ width: 300 }}
      actions={[
        <HeartOutlined />,
        <EditOutlined key="edit" />,
        <div style={{color:'red'}} onClick={viewDetail}>Xem chi tiết</div>,
      ]}
    >
      <Meta
        title={title}
        description={description}
      />
    </Card>
  );
}
