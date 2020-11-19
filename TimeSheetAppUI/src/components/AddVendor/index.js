import React, { Component } from "react";
import { connect } from "react-redux";
import Validator from "validator";

import {
  ClockCircleOutlined,
  CopyrightOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import HeaderHome from "../HeaderNav/HeaderHome";
import { Menu, Layout, Row, Input, Button, Card, Col } from "antd";
import InlineError from "../messages/InlineError";
import VendorList from "../AddVendor/list";
import { addVendor } from "../../redux/actions/Vendor_list";
import { checkEmail } from "../../redux/actions/home";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "redux";
const { Header, Content, Footer } = Layout;

class AddVendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstName: "",
        lastName: "",
        vendorID: "",
        phoneNumber: "",
        primaryEmail: "",
        secondaryEmail: "",
        managerName: "",
        approverName: "",
      },
      loading: false,
      errors: {},
      current: "addVendor",
      isAdmin: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.checkEmail.status === 1) {
      state.errors.primaryEmail = "Email already exists";
    } else if (props.checkEmail.status === 0) {
      state.errors.primaryEmail = "";
    } else if (props.checkEmail.status === 2) {
      state.errors.primaryEmail = "Unable to verify email";
    }
    if (props.userObject.role === 1) state.isAdmin = true;

    return null;
  }

  onChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  checkEmail = (e) => {
    if (this.state.data.primaryEmail === "") {
      this.setState({ errors: { primaryEmail: "" } });
      console.log(this.state);
    }
    if (Validator.isEmail(this.state.data.primaryEmail)) {
      this.props.dispatch(checkEmail(this.state.data.primaryEmail));
    }
  };

  handleEdit = (vend) => {
    this.props.history.push({
      pathname: "/Vendor/" + vend._id,
      state: { vend: vend },
    });
  };

  onSubmit = (e) => {
    console.log("AFter onSubmit", this.state.data);
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const {
        firstName,
        lastName,
        vendorID,
        phoneNumber,
        primaryEmail,
        secondaryEmail,
        managerName,
        approverName,
      } = this.state.data;
      this.props.dispatch(
        addVendor({
          firstName: firstName,
          lastName: lastName,
          vendorID: vendorID,
          phoneNumber: phoneNumber,
          primaryEmail: primaryEmail,
          SecondaryEmail: secondaryEmail,
          managerName: managerName,
          approverName: approverName,
        })
      );

      this.props.history.push("/home");
    }
  };

  onClear = () => {
    this.setState({
      data: {
        firstName: "",
        lastName: "",
        vendorID: "",
        phoneNumber: "",
        primaryEmail: "",
        secondaryEmail: "",
        managerName: "",
        approverName: "",
      },
    });
  };

  validate = (data) => {
    const errors = {};
    if (!Validator.isEmail(data.primaryEmail))
      errors.primaryEmail = "Invalid Email";
    if (!data.firstName) errors.firstName = "Can't be empty";
    if (!data.lastName) errors.lastName = "Can't be empty";
    if (!data.vendorID) errors.vendorID = "Can't be empty";
    if (!data.phoneNumber) errors.phoneNumber = "Please Enter Number";
    if (!data.approverName) errors.approverName = "Can't be empty";
    if (!data.managerName) errors.managerName = "Can't be empty";
    return errors;
  };

  render() {
    const { data, errors } = this.state;
    const { t } = this.props;

    let timeSheetMenu;
    let projectMenu;
    let managerTimeSheetApproval;
    let addEmployeeMenu;
    let employeeMenu;
    let addClient;
    let addVendor;

    if (!this.state.isAdmin) {
      timeSheetMenu = (
        <Menu.Item key="timesheet">
          <Link to={{ pathname: "/createNewRequest" }}>
            <ClockCircleOutlined />
            TimeSheet
          </Link>
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
    if (this.state.isAdmin) {
      addEmployeeMenu = (
        <Col span={8}>
          {" "}
          <Link to={{ pathname: "/addEmployee" }}>Add Employee</Link>{" "}
        </Col>
      );
    }
    if (this.state.isAdmin) {
      employeeMenu = (
        <Col span={8}>
          {" "}
          <Link to={{ pathname: "/Employee" }}>Employee</Link>{" "}
        </Col>
      );
    }
    if (this.state.isAdmin) {
      addClient = (
        <Col span={8}>
          {" "}
          <Link to={{ pathname: "/addClient" }}>Add Client</Link>{" "}
        </Col>
      );
    }
    if (this.state.isAdmin) {
      addVendor = (
        <Col span={8}>
          {" "}
          <Link to={{ pathname: "/addVendor" }}>Add Vendor</Link>{" "}
        </Col>
      );
    }
    return (
      <div>
        <Layout className="layout">
          <HeaderHome />
          <Content className="content">
            <Row gutter={24}>
              <Col md={24} lg={16} sm={24} xs={24} className="column">
                <Form>
                  <Card>
                    <h2>{t("Add Vendor")}</h2>
                  </Card>
                  <Row type="flex" justify="start">
                    <Col span={8}>
                      <Card>
                        <label>{t("First Name")}</label>
                        <Form.Item error={!!errors.firstName}>
                          <Input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={data.firstName}
                            onChange={this.onChange}
                            placeholder="Enter Name"
                          />
                          {errors.firstName && (
                            <InlineError text={errors.firstName} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>{t("Last Name")}</label>
                        <Form.Item error={!!errors.lastName}>
                          <Input
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={data.lastName}
                            onChange={this.onChange}
                            placeholder="Enter Last Name"
                          />
                          {errors.lastName && (
                            <InlineError text={errors.lastName} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>{t("Vendor ID")}</label>
                        <Form.Item error={!!errors.vendorID}>
                          <Input
                            id="vendorID"
                            type="number"
                            name="vendorID"
                            value={data.vendorID}
                            onChange={this.onChange}
                            placeholder="Enter Vendor ID"
                          />
                          {errors.vendorID && (
                            <InlineError text={errors.vendorID} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>{t("Phone Number")}</label>
                        <Form.Item error={!!errors.phoneNumber}>
                          <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            placeholder="10 Digits Phone number"
                            value={data.phoneNumber}
                            onChange={this.onChange}
                          />
                          {errors.phoneNumber && (
                            <InlineError text={errors.phoneNumber} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>{t("Primary Email")}</label>
                        <Form.Item error={!!errors.primaryEmail}>
                          <Input
                            id="primaryEmail"
                            type="email"
                            name="primaryEmail"
                            value={data.primaryEmail}
                            onChange={this.onChange}
                            onBlur={this.checkEmail}
                            placeholder="email@rsrit.com"
                          />
                          {errors.primaryEmail && (
                            <InlineError text={errors.primaryEmail} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>{t("Secondary Email")}</label>
                        <Form.Item>
                          <Input
                            id="secondaryEmail"
                            type="email"
                            name="secondaryEmail"
                            value={data.secondaryEmail}
                            onChange={this.onChange}
                            placeholder="email@gmail.com"
                          />
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>{t("Manager Name")}</label>
                        <Form.Item error={!!errors.managerName}>
                          <Input
                            id="managerName"
                            type="text"
                            name="managerName"
                            value={data.managerName}
                            onChange={this.onChange}
                            placeholder="Person who manages the Employee"
                          />
                          {errors.managerName && (
                            <InlineError text={errors.managerName} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>{t("Approver Name")}</label>
                        <Form.Item error={!!errors.approverName}>
                          <Input
                            id="approverName"
                            type="text"
                            name="approverName"
                            value={data.approverName}
                            onChange={this.onChange}
                            placeholder="Person who approved the Employee"
                          />
                          {errors.approverName && (
                            <InlineError text={errors.approverName} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                  </Row>

                  <br />
                  <Button
                    type="primary"
                    onClick={this.onSubmit}
                    style={{ marginLeft: "2em" }}
                  >
                    {t("Add Vendor")}
                  </Button>
                  <Button
                    type="primary"
                    onClick={this.onClear}
                    style={{ marginLeft: "2em" }}
                  >
                    {t("Clear")}
                  </Button>
                </Form>
              </Col>
              <Col md={24} lg={8} sm={24} xs={24} className="col-list">
                <VendorList handleEdit={this.handleEdit} />
              </Col>
            </Row>
          </Content>
          <br />
        </Layout>
        <Footer>
          <center>
            <CopyrightOutlined />
            Reliable Software 2018
          </center>
        </Footer>
      </div>
    );
  }
}

AddVendor.propTypes = {};

const mapStateToProps = (state) => {
  return {
    userObject: state.auth.user,
    checkEmail: state.auth.checkEmail,
  };
};

export default compose(withNamespaces(), connect(mapStateToProps))(AddVendor);
