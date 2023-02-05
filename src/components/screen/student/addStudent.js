import React, { useEffect, useState, useRef } from "react";
import { Form, Select, Input, Row, Col, Button, message } from "antd";
import axios from "axios";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

const { Option } = Select;

const AddStudent = () => {
  const [degreeList, setDegreeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [hostelList, setHostelList] = useState([]);

  const id = useParams();
  const navigate = useNavigate();

  const formRef = useRef();

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
  const fetchHostel = (params = {}) => {
    axios
      .get(`hostel/`, { params: { ...params } })
      .then((res) => {
        setHostelList(res.data);
      })
      .catch((err) => {
        console.log(err, "error hostel");
      });
  };
  const fetchStudent = (params = {}) => {
    axios
      .get(`student/${id.studentId}`, { params: { ...params } })
      .then((res) => {
        fetchDepartment({ degree: res.data.degree });
        if (res.data.hostel === 1) {
          fetchHostel({ type: "boys" });
          formRef.current.setFieldsValue({ hostel_type: "Boys" });
        } else if (res.data.hostel === 2) {
          fetchHostel({ type: "girls" });
          formRef.current.setFieldsValue({ hostel_type: "Girls" });
        } else {
          fetchHostel({ type: "married" });
          formRef.current.setFieldsValue({ hostel_type: "Married" });
        }
        console.log(res.data.date_of_birth);
        console.log(moment(res.data.date_of_birth));
        formRef.current.setFieldsValue({
          name: res.data.name,
          degree: res.data.degree,
          department: res.data.department,
          hostel: res.data.hostel,
          contact: res.data.contact,
          gender: res.data.gender,
          date_of_birth: res.data.date_of_birth,
        });
      })
      .catch((err) => {
        console.log(err, "error student");
      });
  };

  useEffect(() => {
    fetchDegree();
    if (id.studentId) {
      fetchStudent();
    }
  }, []);

  const onSubmit = () => {
    var uv = formRef.current.getFieldsValue();
    var valuees = new FormData();
    valuees.append("name", uv.name);
    valuees.append("degree", uv.degree);
    valuees.append("department", uv.department);
    valuees.append("hostel", uv.hostel);
    valuees.append("contact", uv.contact);
    valuees.append("gender", uv.gender);
    valuees.append("date_of_birth", uv.date_of_birth);
    if (id.studentId) {
      axios
        .put(`student/${id.studentId}`, valuees)
        .then((res) => {
          message.success("Student Updated successfully");
          formRef.current.resetFields();
          navigate("/student/");
        })
        .catch((err) => {
          message.error("Failed to update student");
          console.log(err, "error");
        });
    } else {
      axios
        .post(`student/`, valuees)
        .then((res) => {
          message.success("Student added successfully");
          formRef.current.resetFields();
        })
        .catch((err) => {
          message.error("Failed to add student");
          console.log(err, "error");
        });
    }
  };

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
        <strong>Add Student</strong>
      </div>
      <div className="mt-3">
        <Form
          id="studentForm"
          ref={formRef}
          onFinish={onSubmit}
          layout="vertical"
        >
          <Row gutter={12}>
            <Col sm={24} md={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter student name" },
                ]}
              >
                <Input placeholder="Enter student name" />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                label="Degree"
                name="degree"
                rules={[
                  { required: true, message: "Please select degree type" },
                ]}
              >
                <Select
                  placeholder="Select degree"
                  onChange={(e) => fetchDepartment({ degree: e })}
                >
                  {degreeOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  { required: true, message: "Please select department type" },
                ]}
              >
                <Select placeholder="Select department">
                  {departmentOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                label="Hostel Type"
                name="hostel_type"
                rules={[
                  { required: true, message: "Please Select Hostel type" },
                ]}
              >
                <Select
                  placeholder="Select hostel type"
                  onChange={(e) => fetchHostel({ type: e })}
                >
                  <Option value="boys">Boys</Option>
                  <Option value="girls">Girls</Option>
                  <Option value="married">Married</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                label="Hostel"
                name="hostel"
                rules={[
                  { required: true, message: "Please select hostel type" },
                ]}
              >
                <Select placeholder="Select hostel" className="w-100">
                  {hostelOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                label="Contact"
                name="contact"
                rules={[
                  { required: true, message: "Please enter contact number" },
                ]}
              >
                <Input placeholder="Enter contact number" />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Please Select gender" }]}
              >
                <Select placeholder="Select gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                label="Date of Birth"
                name="date_of_birth"
                rules={[
                  { required: true, message: "Please select date of birth" },
                ]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <hr />
            </Col>
            <Col span={24}>
              <Form.Item className="text-end">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AddStudent;
