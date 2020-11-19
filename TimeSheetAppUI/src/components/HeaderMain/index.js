import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header } = Layout;

class HeaderMain extends Component {
  render() {
    return (
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            left: "0",
            top: "0px",
            right: "0",
            background: "#f2f2f2",
            padding: "10px",
          }}
        >
          <Link to="/login">
            <img
              src={"https://rsrit.com/wp-content/uploads/2017/12/logo_dark.png"}
              width="145px"
              height="50px"
              bottom="10px"
              float="left"
              alt="rsrit logo"
              style={{ paddingBottom: "10px" }}
            />
          </Link>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ float: "right", textAlign: "center" }}
          >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">
              <Link to="/signup">SignUp</Link>
            </Menu.Item>
            <Menu.Item key="3">About</Menu.Item>
            <Menu.Item key="4">Contact</Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}

export default HeaderMain;
