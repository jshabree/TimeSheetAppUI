import React, { Component } from "react";
import { connect } from "react-redux";
import Validator from "validator";
import {
  ClockCircleOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProjectOutlined,
  CopyrightOutlined,
} from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import {
  Menu,
  Layout,
  Row,
  Input,
  Button,
  Card,
  Col,
  Select,
  AutoComplete,
} from "antd";
import HeaderHome from "../HeaderNav/HeaderHome";
import EmployeeList from "../AddEmployee/List";
import InlineError from "../messages/InlineError";
import { addEmployee, checkEmail } from "../../redux/actions/home";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
const { Header, Content, Footer } = Layout;
const Option = AutoComplete.Option;
//const { Option } = Select;

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        secondaryEmail: "",
        address: "",
        jobCode: "",
        jobTitle: "",
        clientID: "",
        endClient: "",
        startDate: "",
        vendorID: "",
        vendorName: "",
        projectId: "",
        projectName: "",
        billRate: "",
        payRate: "",
        managerName: "",
        approverName: "",
      },
      loading: false,
      errors: {},
      current: "addEmployee",
      isAdmin: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.checkEmail.status === 1) {
      state.errors.email = "Email already exists";
    } else if (props.checkEmail.status === 0) {
      state.errors.email = "";
    } else if (props.checkEmail.status === 2) {
      state.errors.email = "Unable to verify email";
    }
    if (props.userObject.role === 1) state.isAdmin = true;

    return null;
  }

  onChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  checkEmail = (e) => {
    if (this.state.data.email === "") {
      this.setState({ errors: { email: "" } });
      console.log(this.state);
    }
    if (Validator.isEmail(this.state.data.email)) {
      this.props.dispatch(checkEmail(this.state.data.email));
    }
  };

  handleEdit = (emp) => {
    this.props.history.push({
      pathname: "/Employee/" + emp._id,
      state: { emp: emp },
    });
  };

  onChangeClientID = (e) => {
    this.setState({ clientID: e.target.value });
  };

  onSubmit = (e) => {
    console.log(this.state.data);
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const {
        firstName,
        lastName,
        phoneNumber,
        email,
        secondaryEmail,
        address,
        jobCode,
        jobTitle,
        clientID,
        endClient,
        startDate,
        vendorID,
        vendorName,
        projectId,
        projectName,
        billRate,
        payRate,
        managerName,
        approverName,
      } = this.state.data;
      this.props.dispatch(
        addEmployee({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          SecondaryEmail: secondaryEmail,
          address: address,
          jobCode: jobCode,
          jobTitle: jobTitle,
          clientID: clientID,
          endClient: endClient,
          startDate: startDate,
          vendorID: vendorID,
          vendorName: vendorName,
          projectId: projectId,
          projectName: projectName,
          billRate: billRate,
          payRate: payRate,
          managerName: managerName,
          approverName: approverName,
        })
      );

      this.props.history.push("/home");
    }
  };

  onClear = (e) => {
    this.setState({
      data: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        secondaryEmail: "",
        address: "",
        jobCode: "",
        jobTitle: "",
        clientID: "",
        endClient: "",
        startDate: "",
        vendorID: "",
        vendorName: "",
        projectId: "",
        projectName: "",
        billRate: "",
        payRate: "",
        managerName: "",
        approverName: "",
      },
    });
  };

  validate = (data) => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
    if (!Validator.isEmail(data.secondaryEmail))
      errors.secondaryEmail = "Invalid Email";
    if (!/^([A-Za-z]+\s)*[A-Za-z]+$/.test(data.firstName))
      errors.firstName = "Should contain only characters";
    if (!data.firstName) errors.firstName = "Please Enter First Name";
    if (!/^([A-Za-z]+\s)*[A-Za-z]+$/.test(data.lastName))
      errors.lastName = "Should contain only characters";
    if (!data.lastName) errors.lastName = "Please Enter Last Name";
    if (data.phoneNumber.length < 8)
      errors.phoneNumber = "Password Should me more than 8 characters";
    if (!/^[0-9]+$/.test(data.phoneNumber))
      errors.phoneNumber = "Should contain only numbers";
    if (!data.phoneNumber.length === 10)
      errors.phoneNumber = "Enter correct number";
    if (!data.phoneNumber) errors.phoneNumber = "Please Enter Number";
    if (!data.address) errors.address = "Please Enter Address";
    if (!data.jobCode) errors.jobCode = "Please Enter Job Code";
    if (!data.jobTitle) errors.jobTitle = "Please Enter Job Title";
    if (!data.clientID) errors.clientID = "Please Enter client ID";
    if (!data.endClient) errors.endClient = "Please Enter End Client";
    if (!/^([A-Za-z]+\s)*[A-Za-z]+$/.test(data.vendorName))
      errors.vendorName = "Should contain only characters";
    if (!data.vendorID) errors.vendorID = "Please Enter vendor ID";
    if (!data.vendorName) errors.vendorName = "Please Enter Vendor Name";
    if (!data.projectId) errors.projectId = "Please Enter Project ID";
    if (!data.payRate) errors.payRate = "Please Enter Pay Rate";
    if (!data.billRate) errors.billRate = "Please Enter BillRate";
    if (!data.projectName) errors.projectName = "Please Enter Project Name";
    if (!/^([A-Za-z]+\s)*[A-Za-z]+$/.test(data.approverName))
      errors.approverName = "Should contain only characters";
    if (!data.approverName) errors.approverName = "Please Enter Approver Name";
    if (!/^([A-Za-z]+\s)*[A-Za-z]+$/.test(data.managerName))
      errors.managerName = "Should contain only characters";
    if (!data.managerName) errors.managerName = "Please Enter Manager Name";
    return errors;
  };

  render() {
    const { data, errors } = this.state;
    const optionsClient = [
      { id: "1", text: "Infosys" },
      { id: "2", text: "TCS" },
      { id: "3", text: "Deloitte" },
    ];

    const optionsVendor = [
      { id: "1", text: "Apex systems" },
      { id: "2", text: "Tek systems" },
      { id: "3", text: "Kforce" },
    ];

    let timeSheetMenu;
    let projectMenu;
    let managerTimeSheetApproval;
    let addEmployeeMenu;
    let employeeMenu;

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

    return (
      <div>
        <Layout>
          <HeaderHome />
          <Content className="content">
            <Row gutter={24}>
              <Col span={16}>
                <Form>
                  <Card>
                    <h2>Add Employee</h2>
                  </Card>
                  <Row type="flex" justify="start">
                    <Col span={8}>
                      <Card>
                        <label>First Name</label>
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
                        <label>Last Name</label>
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
                        <label>Phone Number</label>
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
                        <label>Primary Email</label>
                        <Form.Item error={!!errors.email}>
                          <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={this.onChange}
                            onBlur={this.checkEmail}
                            placeholder="email@rsrit.com"
                          />
                          {errors.email && <InlineError text={errors.email} />}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>Secondary Email</label>
                        <Form.Item error={!!errors.secondaryEmail}>
                          <Input
                            id="secondaryEmail"
                            type="email"
                            name="secondaryEmail"
                            value={data.secondaryEmail}
                            onChange={this.onChange}
                            placeholder="email@gmail.com"
                          />
                          {errors.secondaryEmail && (
                            <InlineError text={errors.secondaryEmail} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>Address</label>
                        <Form.Item error={!!errors.address}>
                          <Input
                            id="address"
                            type="text"
                            name="address"
                            value={data.address}
                            onChange={this.onChange}
                            placeholder="Enter Current Address"
                          />
                          {errors.address && (
                            <InlineError text={errors.address} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>Job Code</label>
                        <Form.Item error={!!errors.jobCode}>
                          <Input
                            id="jobCode"
                            type="text"
                            name="jobCode"
                            value={data.jobCode}
                            onChange={this.onChange}
                            placeholder="Enter Job code"
                          />
                          {errors.jobCode && (
                            <InlineError text={errors.jobCode} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>Job Title</label>
                        <Form.Item error={!!errors.jobTitle}>
                          <Input
                            id="jobTitle"
                            type="text"
                            name="jobTitle"
                            value={data.jobTitle}
                            onChange={this.onChange}
                            placeholder="Enter Job Title"
                          />
                          {errors.jobTitle && (
                            <InlineError text={errors.jobTitle} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>Client ID</label>
                        <Form.Item error={!!errors.clientID}>
                          <Input
                            id="clientID"
                            type="text"
                            name="clientID"
                            value={data.clientID}
                            onChange={this.onChange}
                            placeholder="Enter client ID"
                          />
                          {errors.clientID && (
                            <InlineError text={errors.clientID} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>End Client</label>
                        <Form.Item error={!!errors.endClient}>
                          <Input
                            id="endClient"
                            type="text"
                            name="endClient"
                            value={data.endClient}
                            onChange={this.onChange}
                            placeholder="Enter End Client Name"
                          />
                          {errors.endClient && (
                            <InlineError text={errors.endClient} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>Start Date</label>
                        <Form.Item>
                          <Input
                            id="startDate"
                            type="date"
                            name="startDate"
                            value={data.startDate}
                            onChange={this.onChange}
                            placeholder="Enter the Date of Joining"
                          />
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>Vendor ID</label>
                        <Form.Item error={!!errors.vendorID}>
                          <Input
                            id="vendorID"
                            type="text"
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
                        <label>Vendor Name</label>
                        <Form.Item error={!!errors.vendorName}>
                          <Input
                            id="vendorName"
                            type="text"
                            name="vendorName"
                            value={data.vendorName}
                            onChange={this.onChange}
                            placeholder="Enter Vendor Name"
                          />
                          {errors.vendorName && (
                            <InlineError text={errors.vendorName} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>Project ID</label>
                        <Form.Item error={!!errors.projectId}>
                          <Input
                            id="projectId"
                            type="text"
                            name="projectId"
                            value={data.projectId}
                            onChange={this.onChange}
                            placeholder="Enter ID of Project"
                          />
                          {errors.projectId && (
                            <InlineError text={errors.projectId} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>Project Name</label>
                        <Form.Item error={!!errors.projectName}>
                          <Input
                            id="ProjectName"
                            type="text"
                            name="projectName"
                            value={data.projectName}
                            onChange={this.onChange}
                            placeholder="Enter Name of Project"
                          />
                          {errors.projectName && (
                            <InlineError text={errors.projectName} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>Bill Rate</label>
                        <Form.Item error={!!errors.billRate}>
                          <Input
                            id="billRate"
                            type="text"
                            name="billRate"
                            value={data.billRate}
                            onChange={this.onChange}
                            placeholder="Enter Bill Rate"
                          />
                          {errors.billRate && (
                            <InlineError text={errors.billRate} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>Pay Rate</label>
                        <Form.Item error={!!errors.payRate}>
                          <Input
                            id="payRate"
                            type="text"
                            name="payRate"
                            value={data.payRate}
                            onChange={this.onChange}
                            placeholder="Enter PayRate"
                          />
                          {errors.payRate && (
                            <InlineError text={errors.payRate} />
                          )}
                        </Form.Item>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <label>Manager Name</label>
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
                        <label>Approver Name</label>
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

                  <div className="buttons-emp">
                    <Button
                      className="button"
                      type="primary"
                      onClick={this.onSubmit}
                      style={{ marginLeft: "2em" }}
                    >
                      Add Employee
                    </Button>
                    <Button
                      className="button"
                      type="primary"
                      onClick={this.onClear}
                      style={{ marginLeft: "2em" }}
                    >
                      Clear
                    </Button>
                  </div>
                </Form>
              </Col>
              <Col span={8}>
                <EmployeeList handleEdit={this.handleEdit} />
              </Col>
            </Row>
          </Content>
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

AddEmployee.propTypes = {};

const mapStateToProps = (state) => {
  return {
    userObject: state.auth.user,
    checkEmail: state.auth.checkEmail,
  };
};

export default connect(mapStateToProps)(AddEmployee);
