import React, { Component } from "react";
import { listEmployee } from "../../redux/actions/Employee_list";
import { deleteEmployee } from "../../redux/actions/home";
import { connect } from "react-redux";
import {
  ClockCircleOutlined,
  LogoutOutlined,
  MailOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import {
  Collapse,
  Button,
  Tabs,
  Modal,
  Layout,
  Input,
  TextArea,
  Card,
  List,
  Divider,
  Row,
  Col,
  Menu,
} from "antd";
import { withNamespaces } from "react-i18next";
import { compose } from "redux";
import { Link } from "react-router-dom";
const Search = Input.Search;
const { Header, Sider, Content, Footer } = Layout;

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      empList: [],
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.user.role === 1) state.isAdmin = true;
    return null;
  }

  componentDidMount() {
    this.props.dispatch(listEmployee());
  }

  componentDidUpdate(prevProps) {
    if (this.props.empList !== prevProps.empList) {
      console.log(
        "receiving the props in ComponentDidUpdate() ",
        this.props.empList
      );
      if (this.props.empList === undefined) {
        this.setState({ empList: [] });
      } else {
        this.setState({ empList: this.props.empList });
      }
    }
  }

  handleEdit(emp) {
    console.log("Edit Click");
    this.props.handleEdit(emp);
  }

  handleDelete(emp) {
    this.props.dispatch(deleteEmployee(emp._id));
    console.log("DEL" + emp._id);
  }

  info = (item) => {
    const { t } = this.props;
    console.log(item);
    Modal.info({
      content: (
        <div>
          <p>
            <h3>{t("Employee Details")}</h3>
          </p>
          <p>
            <b>{t("First Name")}:</b> {item.firstName}
          </p>
          <p>
            <b>{t("Last Name")}:</b> {item.lastName}
          </p>
          <p>
            <b>{t("phone Number")}:</b> {item.phoneNumber}
          </p>
          <p>
            <b>{t("Primary Email")}:</b> {item.email}
          </p>
          <p>
            <b>{t("Secondary Email")}:</b> {item.secondaryEmail}
          </p>
          <p>
            <b>{t("Address")}:</b> {item.address}
          </p>
          <p>
            <b>{t("Job Code")}:</b> {item.jobCode}
          </p>
          <p>
            <b>{t("Job Title")}:</b> {item.jobTitle}
          </p>
          <p>
            <b>{t("Client ID")}:</b> {item.clientId}
          </p>
          <p>
            <b>{t("End client")}:</b> {item.endClient}
          </p>
          <p>
            <b>{t("Start Date")}:</b> {item.startDate}
          </p>
          <p>
            <b>{t("VendorID")}:</b> {item.vendorId}
          </p>
          <p>
            <b>{t("Vendor Name")}:</b> {item.vendorName}
          </p>
          <p>
            <b>{t("Project ID")}:</b> {item.projectId}
          </p>
          <p>
            <b>{t("Project Name")}:</b> {item.projectName}
          </p>
          <p>
            <b>{t("Bill Rate")}:</b> {item.billRate}
          </p>
          <p>
            <b>{t("Pay Rate")}:</b> {item.payRate}
          </p>
          <p>
            <b>{t("Manager Name")}:</b> {item.managerName}
          </p>
          <p>
            <b>{t("Approver Name")}:</b>
            {item.approverName}
          </p>
        </div>
      ),
      onOk() {},
    });
  };

  render() {
    const data = Array.from(this.state.empList);
    const { t } = this.props;
    console.log("ADDS" + JSON.stringify(this.props.empList));

    return (
      <div>
        <Row>
          <Card style={{ width: "100%" }}>
            <Search
              placeholder="Search Employee"
              onSearch={(value) => console.log(value)}
              style={{ width: "100%" }}
            />
            <List
              style={{ marginTop: "15px" }}
              pagination="true"
              size="large"
              header={
                <div>
                  <b>List of Employees</b>
                </div>
              }
              bordered
              dataSource={data}
              renderItem={(item) => (
                <Row>
                  <List.Item style={{ width: "100%" }}>
                    <Col span={12}>
                      <u onClick={() => this.info(item)}>
                        {" "}
                        {item.firstName} {item.lastName}
                      </u>
                    </Col>
                    <Col span={12}>
                      <input
                        type="button"
                        value="Edit"
                        className="buttons"
                        onClick={() => this.handleEdit(item)}
                      />
                      <input
                        type="button"
                        value="Delete"
                        className="buttons"
                        onClick={() => this.handleDelete(item)}
                      />
                    </Col>
                  </List.Item>
                </Row>
              )}
            />
          </Card>
        </Row>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log("STATE" + JSON.stringify(state.empList.result));
  return {
    empList: state.empList.result,
    user: state.auth.user,
  };
}
export default compose(
  withNamespaces(),
  connect(mapStateToProps)
)(EmployeeList);
