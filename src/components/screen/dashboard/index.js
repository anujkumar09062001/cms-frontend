import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/card";

const Dashboard = () => {
  const [studentList, setStudentList] = useState([]);
  const [degreeList, setDegreeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [hostelList, setHostelList] = useState([]);

  const fetchDegree = () => {
    axios
      .get(`degree/`)
      .then((res) => {
        setDegreeList(res.data.length);
      })
      .catch((err) => {
        console.log(err, "error degree");
      });
  };
  const fetchDepartment = (params = {}) => {
    axios
      .get(`department/`, { params: { ...params } })
      .then((res) => {
        setDepartmentList(res.data.length);
      })
      .catch((err) => {
        console.log(err, "error department");
      });
  };
  const fetchHostel = () => {
    axios
      .get(`hostel/`)
      .then((res) => {
        setHostelList(res.data.length);
      })
      .catch((err) => {
        console.log(err, "error hostel");
      });
  };

  const fetchStudent = (params = {}) => {
    axios
      .get(`student/`, { params: { ...params } })
      .then((res) => {
        setStudentList(res.data.length);
      })
      .catch((err) => {
        console.log(err, "error student");
      });
  };

  useEffect(() => {
    fetchDegree();
    fetchDepartment();
    fetchHostel();
    fetchStudent();
  }, []);

  return (
    <div className="container">
      <h4 className="text-bold main-color">Dashboard</h4>
      <div className="row mt-3">
        <div className="col-lg-3">
          <div className="m-2">
            <Card
              icon="fa fa-file-text"
              title={degreeList}
              subTitle="Total Degree"
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="m-2">
            <Card
              icon="fa fa-user"
              title={departmentList}
              subTitle="Total Department"
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="m-2">
            <Card
              icon="fa fa-home"
              title={hostelList}
              subTitle="Total Hostel"
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="m-2">
            <Card
              icon="fa fa-users m-2"
              title={studentList}
              subTitle="Total Students"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
