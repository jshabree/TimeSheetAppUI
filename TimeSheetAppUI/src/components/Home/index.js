import React, { Component } from "react";

import {
  ClockCircleOutlined,
  CopyrightOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import { Divider, Menu, Card, List, Button, Tabs, Row, Col, Badge } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { listEmployee } from "../../redux/actions/Employee_list";
import TimeSheet_Calander from "../TimeSheet_Calander";
import HeaderHome from "../HeaderNav/HeaderHome";

const { Header, Sider, Content, Footer } = Layout;
const style = {
  height: 100,
  width: 200,
  textAlign: "center",
  padding: "5px",
  margin: "10px",
  background: "#ececec",
};
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "home",
      isAdmin: false,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.auth.user.role === 1) state.isAdmin = true;
    return null;
  }

  render() {
    let display = "";

    if (this.state.isAdmin) {
      display = (
        <React.Fragment>
          <Col span={4}>
            <Card hoverable bordered={true} style={{ ...style }}>
              <Link to={{ pathname: "/Vendor" }}>Vendor </Link>
            </Card>
          </Col>
          <Col span={4}>
            <Card hoverable bordered={true} style={{ ...style }}>
              <Link to={{ pathname: "/addClient" }}>Client </Link>
            </Card>
          </Col>
          <Col span={4}>
            <Card hoverable bordered={true} style={{ ...style }}>
              <Link to={{ pathname: "/addEmployee" }}>Employee</Link>
            </Card>
          </Col>
          <Col span={4}>
            <Card hoverable bordered={true} style={{ ...style }}>
              <Link to={{ pathname: "/Project" }}>Project</Link>
            </Card>
          </Col>
        </React.Fragment>
      );
    }

    return (
      <div>
        <Layout>
          <HeaderHome current={this.state.current} />
          <Content
            style={{
              margin: " 100px 40px 40px 40px",
              background: "#fff",
              padding: 24,
              display: "flex",
              minHeight: 450,
              justifyContent: "space-around",
            }}
          >
            {display}
          </Content>
          <Footer>
            <center>
              <CopyrightOutlined />
              Reliable Software 2018
            </center>
          </Footer>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("ggg" + JSON.stringify(state.auth));
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Home);
