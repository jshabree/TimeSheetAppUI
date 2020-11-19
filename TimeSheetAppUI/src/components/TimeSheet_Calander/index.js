import React, { Component } from "react";
import { ClockCircleOutlined, HomeOutlined, LogoutOutlined, ProjectOutlined } from '@ant-design/icons';
import { Calendar, Menu, Button, Row, Col, Layout } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;

export default class TimeSheet_Calander extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "home",
      isAdmin: false,
    };
  }
  handleClick = (e) => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    function onPanelChange(value, mode) {
      console.log(value, mode);
    }
    let timeSheetMenu;
    let projectMenu;
    let managerTimeSheetApproval;
    let timeSheetListMenu;

    if (!this.state.isAdmin) {
      timeSheetMenu = (
        <Menu.Item key="timesheet">
          <Link to={{ pathname: "/createNewRequest" }}>
            <ClockCircleOutlined />
            TimeSheet
          </Link>
        </Menu.Item>
      );
      timeSheetListMenu = (
        <Menu.Item key="timesheetlist">
          <Link to="TimesheetList">TimesheetList</Link>
        </Menu.Item>
      );
    }
    if (this.state.isAdmin) {
      projectMenu = (
        <Menu.Item key="project">
          <Link to={{ pathname: "/Project" }}>
            <ProjectOutlined />
            Project
          </Link>
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
    }

    return (
      <div>
        <Header>
          {/* <img src={require('../../images/reliable.png')} width="200px" height="60px"></img> */}
          <Row>
            <Col xs={22} sm={22} md={22} lg={22} xl={22}>
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
                <Menu.Item key="home">
                  <Link to={{ pathname: "/home" }}>
                    <HomeOutlined />
                    Home
                  </Link>
                </Menu.Item>
                {timeSheetMenu}
                {projectMenu}
                {managerTimeSheetApproval}
                {timeSheetListMenu}
              </Menu>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
              {/* <p>{this.props.auth}</p> */}

              <Link to={{ pathname: "/logout" }}>
                {" "}
                <Button size="large">
                  <LogoutOutlined />
                  Logout
                </Button>
              </Link>
            </Col>
          </Row>
        </Header>
        <div>
          <Calendar onPanelChange={onPanelChange} />{" "}
        </div>
      </div>
    );
  }
}
