import React, { Component } from "react";
import Validator from "validator";

import {
  ClockCircleOutlined,
  CopyrightOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import HeaderHome from "../HeaderNav/HeaderHome";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";

import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Card,
  Input,
  AutoComplete,
} from "antd";
import InlineError from "../messages/InlineError";
import { Link } from "react-router-dom";
import { editEmployee, updateEmployee } from "../../redux/actions/home";
import { connect } from "react-redux";
const Option = AutoComplete.Option;
const { Header, Content, Footer } = Layout;

class EmployeeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEmp: {
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
        managerName: "",
        approverName: "",
      },
      data: this.props.empList,
      empId: props.location.state.emp._id,
      current: "employee/:id",
      errors: {},
      isAdmin: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(editEmployee(id));
    console.log(id);
    if (this.props.user.role === 1) this.setState({ isAdmin: true });
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({ data: props.empList });
  }

  onChange = (e) =>
    this.setState({
      currentEmp: { ...this.state.currentEmp, [e.target.name]: e.target.value },
    });

  onSubmit = (e) => {
    let data = this.state.currentEmp;
    data._id = this.state.empId;
    console.log(this.state.data);
    const errors = this.validate(this.state.currentEmp);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.dispatch(updateEmployee(data));
      this.props.history.push("/addEmployee");
    }
  };

  validate = (data) => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
    if (!data.firstName) errors.firstName = "Can't be empty";
    if (!data.lastName) errors.lastName = "Can't be empty";
    if (!data.phoneNumber) errors.phoneNumber = "Please Enter Number";
    if (!data.approverName) errors.approverName = "Can't be empty";
    if (!data.managerName) errors.managerName = "Can't be empty";
    return errors;
  };

  render() {
    const { data, errors } = this.state;
    console.log(this.state.currentEmp);
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

    return (
      <div>
        <Layout>
          <HeaderHome />
          <Content className="content">
            <Form>
              <Card>
                <h2>Edit Employee</h2>
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
                      {errors.address && <InlineError text={errors.address} />}
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
                      {errors.jobCode && <InlineError text={errors.jobCode} />}
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
                      {/* <AutoComplete
                          placeholder="Enter clientID"
                          style={{
                            width: "100%",
                          }}
                        >
                          {optionsClient.map(({ id, text }) => (
                            <Option key={id} value={id}>
                              {id}
                            </Option>
                          ))} */}
                      {/* options.map
                            placeholder="Enter client ID"
                            // onChange={this.onDropChange}
                            // filterOption={(inputValue, option) =>
                            //   option.value
                            //     .toUpperCase()
                            //     .indexOf(inputValue.toUpperCase()) !== -1
                            // } */}
                      {/* </AutoComplete> */}
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
                      {/* <AutoComplete
                          placeholder="Enter clientName"
                          style={{
                            width: "100%",
                          }}
                        >
                          {optionsClient.map(({ id, text }) => (
                            <Option key={id} value={text}>
                              {text}
                            </Option>
                          ))}
                        </AutoComplete> */}
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
                      {/* <AutoComplete
                          placeholder="Enter vendorID"
                          style={{
                            width: "100%",
                          }}
                        >
                          {optionsVendor.map(({ id, text }) => (
                            <Option key={id} value={id}>
                              {id}
                            </Option>
                          ))}
                        </AutoComplete> */}
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
                      {/* <AutoComplete
                          placeholder="Enter vendor Name"
                          style={{
                            width: "100%",
                          }}
                        >
                          {optionsVendor.map(({ id, text }) => (
                            <Option key={id} value={text}>
                              {text}
                            </Option>
                          ))}
                        </AutoComplete> */}
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
                  Edit Employee
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
  // console.log("STATE" + JSON.stringify(state))
  console.log(state.empList.result);
  return {
    empList: state.empList.result,
    user: state.auth.user,
  };
}
export default connect(mapStateToProps)(EmployeeView);
