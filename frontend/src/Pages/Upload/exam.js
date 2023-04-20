import React from "react";
import {
  Upload,
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { instance } from "../../utils/axios";

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
};
const { Option } = Select;
const { TextArea } = Input;

export default function Exam() {

  const navigateHome = ()=>{
    navigate("/home")
  }


  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  let navigate = useNavigate();
  const onFinish = (values) => {
    let files = values.files;
    let images = values.images;

    if (
      !(Array.isArray(files) && files.length > 0) &&
      !(Array.isArray(images) && images.length > 0)
    ) {
      notification["error"]({
        message: "Nhập ít nhất ảnh hoặc file",
        placement: "top",
      });
      return;
    }

    let formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("school", values.school);
    formData.append("type", values.type);
    formData.append("class", values.class);
    formData.append("system", values.system);
    formData.append("semester", values.semester);
    formData.append("ship", values.ship);
    formData.append("price", values.price);

    if (Array.isArray(files) && files.length > 0) {
      for (const iterator of files) {
        formData.append("files", iterator.originFileObj);
      }
    }

    if (Array.isArray(images) && images.length > 0) {
      for (const iterator of images) {
        formData.append("images", iterator.originFileObj);
      }
    }

    instance
      .post("/apis/exam/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.isError) {
          notification["error"]({
            message: res.data.error.message,
            placement: "top",
          });

          navigate("/login");
        } else {
          notification["success"]({
            message: "Upload successfully",
            placement: "top",
          });
          navigate("/home");
        }
      })
      .catch((err) => {
        notification["error"]({
          message: "error",
          placement: "top",
        });
      });
  };

  return (
    <div>
      <Form {...layout} onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Miêu tả"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item name="school" label="Trường">
          <Select
            showSearch
            placeholder="Chọn trường"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            <Option value="Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM">
              Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM
            </Option>
            <Option value="Trường Đại học Bách khoa - Đại học Quốc gia TP.HCM">
              Trường Đại học Bách khoa - Đại học Quốc gia TP.HCM
            </Option>
            <Option value="Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM">
              Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM
            </Option>
          </Select>
        </Form.Item>

        <Form.Item name="class" label="Lớp">
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="system" label="Hệ" initialValue={"Chính quy"}>
          <Select
            showSearch
            placeholder="Chọn hệ"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            <Option value="Chính quy">Chính quy</Option>
            <Option value="Tiên tiến">Tiên tiến</Option>
            <Option value="Việt Pháp">Việt Pháp</Option>
            <Option value="Cao đẳng">Cao đẳng</Option>
            <Option value="Tài năng">Tài năng</Option>
            <Option value="Chất lương cao">Chất lương cao</Option>
          </Select>
        </Form.Item>

        <Form.Item name="semester" label="Học kỳ">
          <Select
            showSearch
            placeholder="Chọn học kỳ"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            <Option value="Học kỳ 1">Học kỳ 1</Option>
            <Option value="Học kỳ 2">Học kỳ 2</Option>
            <Option value="Học kỳ 3 (Hè)">Học kỳ 3 (Hè)</Option>
          </Select>
        </Form.Item>

        <Form.Item name="ship" label="Ca">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="price" label="Giá">
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="files" label="PDF file" getValueFromEvent={normFile}>
          <Upload
            accept=".doc,.docx,.pdf"
            maxCount={8}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="images" label="Images" getValueFromEvent={normFile}>
          <Upload accept="image/*" maxCount={8} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button onClick={navigateHome} style={{marginRight:10}}>Cancel</Button>

          <Button type="primary" htmlType="submit">
            Upload
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

/**
 *   <Form.Item name="type" label="Loại">
          <Select
            showSearch
            placeholder="Chọn loại"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            <Option value="Bài giảng">Bài giảng</Option>
            <Option value="Đề thi">Đề thi</Option>
          </Select>
        </Form.Item>
 */
