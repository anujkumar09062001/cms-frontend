import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Form,
  Select,
  Button,
  Drawer,
  Input,
  Tag,
  Popconfirm,
  message,
} from "antd";
import {
  UserAddOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const Hostel = () => {
  const [hostel, setHostel] = useState([]);
  const [typeId, setTypeId] = useState("");
  const [visible, setVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef();
  const formRef = useRef();

  const fetchHostel = (params = {}, id) => {
    setTypeId(id);
    axios
      .get(`hostel/`, { params: { ...params } })
      .then((res) => {
        setHostel(res.data);
        searchRef.current.resetFields();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  useEffect(() => { }, []);

  const onSearchSubmit = () => {
    setLoading(true);
    var uv = searchRef.current.getFieldsValue();
    fetchHostel({ type: uv.type }, uv.type);
  };

  const onOpen = () => {
    setVisible(true)
    if (typeId) {
      formRef.current.setFieldsValue({
        type: typeId
      })
    }
  }

  const onClose = () => {
    setVisible(false);
    setEditId(null);
    formRef.current.resetFields();
  };

  const onSubmit = () => {
    var uv = formRef.current.getFieldsValue();
    var valuees = new FormData();
    valuees.append("name", uv.name);
    valuees.append("type", uv.type);
    setTypeId(uv.type);
    if (editId) {
      axios
        .put(`hostel/${editId}`, valuees)
        .then((res) => {
          success("updated");
          onClose();
          fetchHostel({ type: uv.type }, uv.type);
        })
        .catch((err) => {
          error("update");
          onClose();
        });
    } else {
      axios
        .post(`hostel/`, valuees)
        .then((res) => {
          success("added");
          onClose();
          fetchHostel({ type: uv.type }, uv.type);
        })
        .catch((err) => {
          error("add");
          onClose();
        });
    }
  };

  const onUpdate = (id) => {
    setVisible(true);
    setEditId(id);
    axios.get(`hostel/${id}`).then((res) => {
      formRef.current.setFieldsValue({
        name: res.data.name,
        type: res.data.type,
      });
    });
  };

  const onDelete = (id) => {
    axios
      .delete(`hostel/${id}`)
      .then((res) => {
        success("deleted");
        fetchHostel({ type: typeId }, typeId);
      })
      .catch((err) => {
        error("delete");
      });
  };

  const success = (op) => {
    message.success(`Hostel ${op} successfully`);
  };

  const error = (op) => {
    message.error(`Failed to ${op} Hostel`);
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
        <div>
          <Tag
            color="warning"
            icon={<EditOutlined />}
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
              color="error"
              icon={<CloseCircleOutlined />}
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
      <div className="mb-3">
        <div className="mb-3">
          <strong>Hostel List</strong>
        </div>
        <div className="">
          <Form layout="horizontal" ref={searchRef} onFinish={onSearchSubmit}>
            <div className="row">
              <div className="col-lg-2">
                <Form.Item name="type" rules={[{ required: true, message: "Please select hostel type" }]}>
                  <Select placeholder="Select hostel type">
                    <Option value="boys">BOYS</Option>
                    <Option value="girls">GIRLS</Option>
                    <Option value="married">MARRIED</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col-lg-1">
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Search
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        <div className="">
          {typeId === "boys" ? (
            <div>
              <strong>Hostel Type: </strong>Boys
            </div>
          ) : (
            ""
          )}
          {typeId === "girls" ? (
            <div>
              <strong>Hostel Type: </strong>Girls
            </div>
          ) : (
            ""
          )}
          {typeId === "married" ? (
            <div>
              <strong>Hostel Type: </strong>Married
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="text-end">
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={onOpen}
          >
            Add Hostel
          </Button>
        </div>
      </div>
      <div className="">
        <Table
          columns={columns}
          dataSource={hostel}
          pagination={false}
          rowKey="id"
          loading={loading}
          scroll={{ x: 'max-content' }}
        />
      </div>
      <Drawer
        title="Add Hostel"
        open={visible}
        onClose={onClose}
        width={window.innerWidth > 786 ? 500 : window.innerWidth - 10}
        footer={
          <div className="text-end">
            <Button
              onClick={onClose}
              type="primary"
              style={{ marginRight: 12 }}
            >
              Close
            </Button>
            <Button form="hostelForm" htmlType="submit" type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form
          id="hostelForm"
          layout="vertical"
          ref={formRef}
          onFinish={onSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter hostel name" }]}
          >
            <Input placeholder="Enter hostel name" />
          </Form.Item>
          <Form.Item
            label="Hostel type"
            name="type"
            rules={[{ required: true, message: "Please select hostel type" }]}
          >
            <Select placeholder="Select hostel type">
              <Option value="boys">BOYS</Option>
              <Option value="girls">GIRLS</Option>
              <Option value="married">MARRIED</Option>
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Hostel;
