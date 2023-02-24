import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  message,
  Tag,
  Popconfirm,
} from "antd";
import {
  UserAddOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const Degree = () => {
  const [degreeList, setDegreeList] = useState([]);
  const [editId, setEditId] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);

  const formRef = useRef();

  const fetchData = () => {
    axios
      .get(`degree/`)
      .then((res) => {
        setDegreeList(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClose = () => {
    setVisible(false);
    setEditId(null);
    formRef.current.resetFields();
  };

  const onDelete = (id) => {
    axios
      .delete(`degree/${id}`)
      .then((res) => {
        message.success("Degree deleted successfully");
        fetchData();
      })
      .catch((err) => {
        message.error("Failed to delete degree");
      });
  };

  const onUpdate = (id) => {
    setVisible(true);
    setEditId(id);
    axios
      .get(`degree/${id}`)
      .then((res) => {
        formRef.current.setFieldsValue({
          name: res.data.name,
        });
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const onSubmit = () => {
    var uv = formRef.current.getFieldsValue();
    const valuees = new FormData();
    valuees.append("name", uv.name);
    if (editId) {
      axios
        .put(`degree/${editId}`, valuees)
        .then((res) => {
          message.success("Degree updated successfully");
          fetchData();
          onClose();
        })
        .catch((err) => {
          message.error("Failed to update degree");
          onClose();
        });
    } else {
      axios
        .post(`degree/`, valuees)
        .then((res) => {
          message.success("Degree added successfully");
          fetchData();
          onClose();
        })
        .catch((err) => {
          message.error("Failed to add degree");
          onClose();
        });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <div size="">
          <Tag
            icon={<EditOutlined />}
            color="warning"
            style={{ cursor: "pointer" }}
            onClick={() => onUpdate(data.id)}
          >
            Edit
          </Tag>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(data.id)}
          >
            <Tag
              icon={<CloseCircleOutlined />}
              color="error"
              style={{ cursor: "pointer" }}
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
      <div className="">
        <strong>Degree List</strong>
      </div>
      <div className="text-end mb-3">
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => setVisible(true)}
        >
          Add Degree
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={degreeList}
        pagination={false}
        rowKey="id"
        loading={loading}
        scroll={{ x: 'max-content' }}
      />
      <Drawer
        title="Add Degree"
        width={window.innerWidth > 786 ? 500 : window.innerWidth - 10}
        onClose={onClose}
        open={visible}
        footer={
          <div className="text-end">
            <Button onClick={onClose} style={{ marginRight: 12 }}>
              Cancel
            </Button>
            <Button form="degreeForm" type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        }
      >
        <Form
          id="degreeForm"
          ref={formRef}
          layout="vertical"
          onFinish={onSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please Enter Degree" }]}
          >
            <Input placeholder="Enter Degree" />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Degree;
