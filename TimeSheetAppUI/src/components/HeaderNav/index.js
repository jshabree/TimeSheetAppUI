import React, { Component } from "react";
import { ClockCircleOutlined, HomeOutlined, LogoutOutlined, ProjectOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

class HeaderNav extends Component {
  render() {
    if (this.props.history.location.pathname === "/login") return null;
    return (
      <Header>
        <Row>
          <Col xs={22} sm={22} md={22} lg={22} xl={22}>
            <Menu mode="horizontal">
              <Menu.Item>
                <Link
                  to={{
                    pathname: "/home",
                  }}
                >
                  {" "}
                  <img
                    src="https://rsrit.com/wp-content/uploads/2017/12/logo_dark.png"
                    width="200px"
                    height="60px"
                    alt="rsrit-logo"
                  >
                    {" "}
                  </img>
                </Link>
              </Menu.Item>{" "}
              <Menu.Item key="home">
                <Link
                  to={{
                    pathname: "/home",
                  }}
                >
                  {" "}
                  <HomeOutlined /> Home{" "}
                </Link>{" "}
              </Menu.Item>{" "}
              <Menu.Item key="timesheet">
                <Link
                  to={{
                    pathname: "/createNewRequest",
                  }}
                >
                  {" "}
                  <ClockCircleOutlined /> TimeSheet{" "}
                </Link>{" "}
              </Menu.Item>{" "}
              <Menu.Item key="project">
                <Link
                  to={{
                    pathname: "/Project",
                  }}
                >
                  {" "}
                  <ProjectOutlined /> Project{" "}
                </Link>{" "}
              </Menu.Item>{" "}
              <Menu.Item key="Manager Approval">
                <Link
                  to={{
                    pathname: "/mTSA",
                  }}
                >
                  <ClockCircleOutlined />
                  Manager TimeSheet Approval{" "}
                </Link>{" "}
              </Menu.Item>{" "}
            </Menu>{" "}
          </Col>{" "}
          <Col xs={2} sm={2} md={2} lg={2} xl={2}>
            <Link
              to={{
                pathname: "/login",
              }}
            >
              {" "}
              <Button size="large">
                {" "}
                <LogoutOutlined /> Logout{" "}
              </Button>
            </Link>
          </Col>{" "}
        </Row>{" "}
      </Header>
    );
  }
}

export default HeaderNav;
