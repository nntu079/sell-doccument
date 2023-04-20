import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Space,
  Avatar,
  Image,
  Tooltip,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";
import { instance } from "../utils/axios";
import { ProfileOutlined } from "@ant-design/icons";

import "./style.css";
import { notification, Modal } from "antd";

const { Search } = Input;
const { Option } = Select;

export default function Header({setKeyword}) {
  const [modalUpload, setModalUpload] = useState(false);

  const showModalUpload = () => {
    setModalUpload(true);
  };

  const handleUploadOk = () => {
    setModalUpload(false);
  };

  const handleUploadCancel = () => {
    setModalUpload(false);
  };

  const [modalSearch, setModalSearch] = useState(false);

  const showModalSearch = () => {
    setModalSearch(true);
  };

  const handleSearchOk = () => {
    setModalSearch(false);
  };

  const handleSearchCancel = () => {
    setModalSearch(false);
  };

  const onSearch = (value) => {

    setKeyword(value.trim())
  };

  let navigate = useNavigate();

  const uploadDocument = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
    }

    if (user.role != "admin") {
      notification["error"]({
        message: "You are not admin",
        placement: "top",
      });
      return;
    }

    showModalUpload();

    //navigate("/upload-exam")
  };

  const navigateHome = () => {
    navigate("/home");
    navigate(0);
  };

  const navigateUploadExam = () =>{
    navigate("/upload-exam")
    
  }

  const navigateUploadBook = () =>{
    
  }

  const navigateUploadSlide = () =>{
    
  }

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100px",

        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div style={{ marginLeft: "30px", cursor: "pointer" }}>
        <img
          src="/logo.jpg"
          alt="image"
          height={"50px"}
          onClick={navigateHome}
        />
      </div>

      <div style={{ marginLeft: "10px" }}>
        <Search
          placeholder="Nhập từ khóa liên quan tài liệu"
          onSearch={onSearch}
          style={{ width: 304 }}
        />
      
      </div>
      
      <a style={{marginLeft:"20px"}} onClick={showModalSearch}>
          Tìm kiếm nâng cao
        </a>

      <div
        style={{
          marginLeft: "auto",
          cursor: "pointer",
          marginRight: "30px",
          display: "flex",
        }}
      >
        <Tooltip
          title={
            <div style={{ color: "black" }}>
              <p className="item__select__profile">Thông tin cá nhân</p>
              <p className="item__select__profile" onClick={uploadDocument}>
                Upload tài liệu
              </p>
              <p className="item__select__profile" onClick={logout}>
                Đăng xuất
              </p>
            </div>
          }
          color="white"
        >
          <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            NT
          </Avatar>
        </Tooltip>

        <Tooltip
          title={
            <div style={{ color: "black" }}>
              <p className="item__select__profile">Thông tin cá nhân</p>
              <p className="item__select__profile" onClick={uploadDocument}>
                Upload tài liệu
              </p>
              <p className="item__select__profile" onClick={logout}>
                Đăng xuất
              </p>
            </div>
          }
          color="white"
        >
          <ProfileOutlined style={{ fontSize: "200%" }} />
        </Tooltip>
      </div>

      <Modal
        title="Chọn loại tài liệu cần upload"
        visible={modalUpload}
        onOk={handleUploadOk}
        onCancel={handleUploadCancel}
      >
        <Button onClick={navigateUploadExam}>Upload đề thi</Button>
        <Button style={{marginLeft:20, marginRight:20}} onClick={navigateUploadSlide}>Upload bài giảng</Button>
        <Button onClick={navigateUploadBook}>Upload sách</Button>
      </Modal>


      <Modal
        title="Nhập các thông tin để tìm kiếm chính xác"
        visible={modalSearch}
        onOk={handleSearchOk}
        onCancel={handleSearchCancel}
      >
        Chức năng đang được phát triển
      </Modal>



    </div>
  );
}
