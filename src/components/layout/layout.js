import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  BankOutlined,
  PieChartOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import auth from "../services/authService";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(
    <Link to="" className="text-decoration-none">
      Dashboard
    </Link>,
    "1",
    <PieChartOutlined />
  ),
  getItem(
    <Link to="/degree" className="text-decoration-none">
      Degree
    </Link>,
    "2",
    <AppstoreOutlined />
  ),
  getItem(
    <Link to="/department" className="text-decoration-none">
      Department
    </Link>,
    "3",
    <BankOutlined />
  ),
  getItem(
    <Link to="/hostel" className="text-decoration-none">
      Hostel
    </Link>,
    "4",
    <HomeOutlined />
  ),
  getItem(
    <Link to="/student" className="text-decoration-none">
      Student
    </Link>,
    "5",
    <UserOutlined />
  ),
];
const LayoutComponent = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [logo, setLogo] = useState(true);
  const [user, setUser] = useState();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onCollapse = (value) => {
    if (logo) {
      setLogo(false);
    } else {
      setLogo(true);
    }
    setCollapsed(value);
  };

  const handleLogout = () => {
    auth.logout();
    window.location = "/login";
  };
  const handleResponse = () => {
    if (window.innerWidth < 700) {
      setCollapsed(true);
    }
    else {
      setCollapsed(false);
    }
  }


  useEffect(() => {
    const token = auth.getAuthToken(); if (token) {
      handleUser()
    }
    if (window.innerWidth < 700) setCollapsed(true);
    window.addEventListener('resize', handleResponse)
  }, [])

  const handleUser = async () => {
    const user = await auth.getCurrentUser();
    setUser(user)
  }

  const styles = {
    container1: {
      marginLeft: 80
    },
    container2: {
      marginLeft: 200
    },
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => onCollapse(value)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          className="m-3 text-center"
          style={{ color: "white", display: "block" }}
        >
          {logo ? <div style={{ fontSize: 16 }}>IIT Roorkee</div> : ""}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout"
        style={collapsed ? styles.container1 : styles.container2}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="mb-4"
        >
          <div className="text-end me-5">
            <span className="me-4 fw-bold text-primary">{user?.username}</span>
            <button className="btn btn-primary btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {/* <Outlet /> */}
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <span className="fw-bolder">Created by Anuj Kumar</span>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutComponent;
