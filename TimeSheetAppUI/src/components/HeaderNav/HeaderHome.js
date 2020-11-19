import React, { Component } from "react";
import { Layout, Row, Col, Menu, Button, Card, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  ClockCircleOutlined,
  ProfileOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import i18n from "../../i18n";
import "../../App.css";
import { DownOutlined, GlobalOutlined } from "@ant-design/icons";
const { Header } = Layout;
const style = {
  height: 100,
  width: 200,
  textAlign: "center",
  padding: "5px",
  margin: "10px",
  background: "#ececec",
};

class HeaderHome extends Component {
  state = {
    isAdmin: false,
    current: "",
    visible: false,
    language: "en",
  };

  static getDerivedStateFromProps(props, state) {
    if (props.user.role === 1) state.isAdmin = true;
    state.current = props.current;
  }

  handleClick = (e) => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  handleMenuClick = (e) => {
    console.log("e.value....", e.key);
    const key = e.key;
    i18n.changeLanguage(key);
    this.setState({ language: key, visible: false });
  };

  render() {
    console.log("default", this.state.language);
    console.log("visibility", this.state.visible);

    let timeSheetMenu;
    let managerTimeSheetApproval;
    let timehsheetListMenu;
    let home;
    let Timesheet;

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="en">English - EN</Menu.Item>
        <Menu.Item key="de">Deutsch - DE</Menu.Item>
      </Menu>
    );

    const Usermenu = (
      <Menu>
        <Menu.Item>
          <Link to={{ pathname: "/MyAccount" }}> My Account</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={{ pathname: "/logout" }}>Logout</Link>
        </Menu.Item>
      </Menu>
    );
    if (!this.state.isAdmin) {
      timeSheetMenu = (
        <Menu.Item key="timesheet">
          <Link to={{ pathname: "/createNewRequest" }}>
            <ClockCircleOutlined />
            TimeSheet
          </Link>
        </Menu.Item>
      );
      timehsheetListMenu = (
        <Menu.Item key="timesheetlist">
          <Link to="TimesheetList">TimesheetList</Link>
        </Menu.Item>
      );
    }
    if (this.state.isAdmin) {
      managerTimeSheetApproval = (
        <Menu.Item key="Manager Approval">
          <Link to={{ pathname: "/mTSA" }}>
            <ClockCircleOutlined />
            Manager TimeSheet Approval
          </Link>
        </Menu.Item>
      );
      home = (
        <Menu.Item key="home">
          <Link to={{ pathname: "/home" }}>
            <HomeOutlined />
            Home
          </Link>
        </Menu.Item>
      );
      Timesheet = (
        <Menu.Item key="TimesheetAdmin">
          <Link to={{ pathname: "/createTimesheet" }}>
            <ProfileOutlined /> Timesheet
          </Link>
        </Menu.Item>
      );
    }

    return (
      <Header className="content-header">
        <Row>
          <Col span={22}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item>
                <Link to={{ pathname: "/home" }}>
                  {" "}
                  <img
                    src="https://rsrit.com/wp-content/uploads/2017/12/logo_dark.png"
                    width="200px"
                    height="60px"
                    alt="logo"
                  />
                </Link>
              </Menu.Item>
              {home}
              {timeSheetMenu}
              {managerTimeSheetApproval}
              {timehsheetListMenu}
              {Timesheet}
            </Menu>
          </Col>
          <Col span={1}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
                style={{ margin: "7px" }}
              >
                <GlobalOutlined />
                {" " /**
                  this.state.language
                */}
                <DownOutlined />
              </a>
            </Dropdown>
          </Col>
          <Col xs={1} sm={1} md={1} lg={1} xl={1}>
            <Dropdown overlay={Usermenu}>
              <UserOutlined className="sizeOfIcon" />
            </Dropdown>
          </Col>
        </Row>
      </Header>
    );
  }
}

function mapStateToProps(state) {
  console.log("STATE" + JSON.stringify(state));
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(HeaderHome);
