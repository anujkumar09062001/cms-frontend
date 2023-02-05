import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Table,
  Select,
  Button,
  Form,
  message,
  Drawer,
  Input,
  Tag,
  Popconfirm,
} from "antd";
import {
  UserAddOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const Department = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [degreeList, setDegreeList] = useState([]);
  const [degree, setDegree] = useState(null);
  const [loading, setloading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showDegree, setShowDegree] = useState(null);
  const [editId, seteditId] = useState(null);

  const formRef = useRef();
  const searchRef = useRef();

  const fetchDegree = () => {
    axios
      .get(`degree/`)
      .then((res) => {
        setDegreeList(res.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const onOpen = () => {
    setVisible(true);
    if (degree) {
      formRef.current.setFieldsValue({
        degree: degree,
      });
    }
  };

  const onClose = () => {
    setVisible(false);
    seteditId(null);
    formRef.current.resetFields();
  };

  useEffect(() => {
    fetchDegree();
  }, []);

  const onSearchSubmit = () => {
    var uv = searchRef.current.getFieldsValue();
    setDegree(uv.degree);
    onSearch({ degree: uv.degree }, uv.degree);
  };

  const onSubmit = () => {
    var uv = formRef.current.getFieldsValue();
    var valuees = new FormData();
    valuees.append("name", uv.name);
    valuees.append("degree", uv.degree);
    if (editId) {
      axios
        .put(`department/${editId}`, valuees)
        .then((res) => {
          message.success("Department Updated Successfully");
          setDegree(uv.degree);
          onSearch({ degree: uv.degree }, uv.degree);
          onClose();
        })
        .catch((err) => {
          message.error("Failed to update Department");
          onClose();
        });
    } else {
      axios
        .post(`department/`, valuees)
        .then((res) => {
          message.success("Department Added Successfully");
          setDegree(uv.degree);
          onSearch({ degree: uv.degree }, uv.degree);
          onClose();
        })
        .catch((err) => {
          message.error("Failed to add Department");
          onClose();
        });
    }
  };

  const onSearch = (params = {}, id) => {
    setloading(true);
    setShowDegree(id);
    axios
      .get(`department/`, { params: { ...params } })
      .then((res) => {
        setDepartmentList(res.data);
        setloading(false);
        searchRef.current.resetFields();
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const onDelete = (id) => {
    axios
      .delete(`department/${id}`)
      .then((res) => {
        message.success("Department deleted successfully");
        onSearch({ degree: degree }, degree);
      })
      .catch((err) => {
        message.error("Failed to delete department");
      });
  };

  const onUpdate = (id) => {
    seteditId(id);
    setVisible(true);
    axios.get(`department/${id}`).then((res) => {
      formRef.current.setFieldsValue({
        name: res.data.name,
        degree: degree,
      });
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "key",
      render: (data) => (
        <div>
          <Tag
            color="warning"
            style={{ cursor: "pointer" }}
            icon={<EditOutlined />}
            onClick={() => onUpdate(data.id)}
          >
            Edit
          </Tag>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(data.id)}
          >
            <Tag
              style={{ cursor: "pointer" }}
              color="error"
              icon={<CloseCircleOutlined />}
            >
              Delete
            </Tag>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="mb-3">
        <strong>Department List</strong>
      </div>
      <Form layout="horizontal" onFinish={onSearchSubmit} ref={searchRef}>
        <div className="row">
          <div className="col-lg-3">
            <Form.Item
              name="degree"
              rules={[{ required: true, message: "Please select degree" }]}
            >
              <Select placeholder="Select Degree" className="w-100">
                {degreeList.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-lg-1">
            <div className="text-center">
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </div>
          </div>
          <div className="col-lg-8"></div>
        </div>
      </Form>
      <div className="mb-3">
        <div className="text-end">
          <Button type="primary" icon={<UserAddOutlined />} onClick={onOpen}>
            Add Department
          </Button>
        </div>
        <div className="mt-2 mb-2">
          {degreeList
            ?.filter((item) => item?.id === showDegree)
            ?.map((item) => (
              <div>
                <strong>Degree:</strong> {item?.name}
              </div>
            ))}
        </div>
      </div>
      <div className="">
        <Table
          columns={columns}
          dataSource={departmentList}
          pagination={false}
          rowKey="id"
          loading={loading}
        />
      </div>
      <Drawer
        title="Add Department"
        open={visible}
        onClose={onClose}
        width={window.innerWidth > 786 ? 500 : window.innerWidth - 10}
        footer={
          <div className="text-end">
            <Button
              type="primary"
              style={{ marginRight: 12 }}
              onClick={onClose}
            >
              Close
            </Button>
            <Button form="departmentForm" type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        }
      >
        <Form
          id="departmentForm"
          ref={formRef}
          onFinish={onSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please Enter Name" }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>
          <Form.Item
            label="Select Degree"
            name="degree"
            rules={[{ required: true, message: "Please Enter Degree" }]}
          >
            <Select placeholder="Please Select Degree">
              {degreeList.map((item) => (
                <Option id={item.id} value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Department;
