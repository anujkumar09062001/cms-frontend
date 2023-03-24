import {
  Button,
  Form,
  Input,
  Select,
  Table,
  Tag,
  Popconfirm,
  message,
} from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  UserAddOutlined,
  EditOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Option } = Select;

const Student = () => {
  const searchRef = useRef();

  const [studentList, setStudentList] = useState([]);
  const [degreeList, setDegreeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [hostelList, setHostelList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDegree = () => {
    axios
      .get(`degree/`)
      .then((res) => {
        setDegreeList(res.data);
      })
      .catch((err) => {
        console.log(err, "error degree");
      });
  };
  const fetchDepartment = (params = {}) => {
    axios
      .get(`department/`, { params: { ...params } })
      .then((res) => {
        setDepartmentList(res.data);
      })
      .catch((err) => {
        console.log(err, "error department");
      });
  };
  const fetchHostel = () => {
    axios
      .get(`hostel/`)
      .then((res) => {
        setHostelList(res.data);
      })
      .catch((err) => {
        console.log(err, "error hostel");
      });
  };

  const fetchStudent = (params = {}) => {
    axios
      .get(`student/`, { params: { ...params } })
      .then((res) => {
        setStudentList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "error student");
      });
  };

  const onSearchSubmit = () => {
    setLoading(true);
    var uv = searchRef.current.getFieldsValue();
    fetchStudent({
      degree: uv.degree,
      department: uv.department,
      hostel: uv.hostel,
      search: uv.name,
    });
    searchRef.current.resetFields();
  };

  useEffect(() => {
    fetchDegree();
    fetchDepartment();
    fetchHostel();
  }, []);

  const onDelete = (id) => {
    axios
      .delete(`student/${id}`)
      .then((res) => {
        message.success("Student deleted successfully");
        fetchStudent();
      })
      .catch((err) => {
        message.error("Failed to delete Student");
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Degree",
      dataIndex: "degree",
      key: "degree",
      render: (data) =>
        degreeList
          .filter((item) => item.id === data)
          .map((item) => (
            <div key={item.id} value={item.id}>
              {item.name}
            </div>
          )),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (data) => {
        return departmentList
          .filter((item) => item.id === data)
          .map((item) => {
            return (
              <div key={item.id} value={item.id}>
                {item.name}
              </div>
            );
          });
      },
    },
    {
      title: "Hostel",
      dataIndex: "hostel",
      key: "hostel",
      render: (data) => {
        return hostelList
          .filter((item) => item.id === data)
          .map((item) => {
            return (
              <div key={item.id} value={item.id}>
                {item.name}
              </div>
            );
          });
      },
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Date of Birth",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
    },
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <div>
          <Link to={`/addStudent/${data.id}`}>
            <Tag
              color="warning"
              icon={<EditOutlined />}
              style={{ cursor: "pointer" }}
            >
              Edit
            </Tag>
          </Link>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(data.id)}
          >
            <Tag
              color="error"
              icon={<CloseCircleFilled />}
              style={{ cursor: "pointer" }}
            >
              Delete
            </Tag>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const degreeOptions = degreeList?.map((item) => (
    <Option key={item.id} value={item.id}>
      {item.name}
    </Option>
  ));

  const departmentOptions = departmentList?.map((item) => (
    <Option key={item.id} value={item.id}>
      {item.name}
    </Option>
  ));

  const hostelOptions = hostelList?.map((item) => (
    <Option key={item.id} value={item.id}>
      {item.name}
    </Option>
  ));

  return (
    <div className="container">
      <div className="">
        <strong>Student Info</strong>
      </div>
      <div className="mt-3">
        <Form ref={searchRef} layout="horizontal" onFinish={onSearchSubmit}>
          <div className="row">
            <div className="col-lg-2">
              <Form.Item name="degree">
                <Select placeholder="Select Degree" allowClear>
                  {degreeOptions}
                </Select>
              </Form.Item>
            </div>
            <div className="col-lg-2">
              <Form.Item name="department">
                <Select placeholder="Select Department" allowClear>
                  {departmentOptions}
                </Select>
              </Form.Item>
            </div>
            <div className="col-lg-2">
              <Form.Item name="hostel">
                <Select placeholder="Select Hostel" allowClear>
                  {hostelOptions}
                </Select>
              </Form.Item>
            </div>
            <div className="col-lg-2">
              <Form.Item name="name">
                <Input placeholder="Enter Student Name" allowClear />
              </Form.Item>
            </div>
            <div className="col-lg-2">
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <div className="text-end mb-3">
        <Link to="/addStudent">
          <Button type="primary" icon={<UserAddOutlined />}>
            Add Student
          </Button>
        </Link>
      </div>
      <div className="">
        <Table
          columns={columns}
          dataSource={studentList}
          pagination={false}
          rowKey="id"
          loading={loading}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
};

export default Student;
