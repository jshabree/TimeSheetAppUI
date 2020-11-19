import React, { Component } from "react";
import Validator from "validator";
import {
  ClockCircleOutlined,
  CopyrightOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Menu, Collapse, Button, Layout, Input, Row, Col, DatePicker, Card, Switch } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateClient
} from "../../redux/actions/ClientDetails";
import EmpModal from "../Search";
import Moment from "moment";
import InlineError from "../messages/InlineError";
import HeaderHome from "../HeaderNav/HeaderHome";
import { withNamespaces } from "react-i18next";
import { compose } from "redux";

const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;

class ClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.location.state.cli._id,
      data: {
      companyName: "",
      clientId: "",
      phoneNumber: "",
      primaryEmail: "",
      secondaryEmail: "",
      address: "",
      managerName: "",
      approverName: "",
    },
      loading: false,
      errors: {},
      current: 'addEmployee',
      isAdmin: false
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.user.role === 1) state.isAdmin = true;

    return null;
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    // this.props.dispatch(editProject(id));
    console.log(id);
    if (this.props.user.role === 1) this.setState({ isAdmin: true });
  }

  componentWillReceiveProps(props) {
    this.setState({ clientDetails: props.clientDetails });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeId = (e) => {
    console.log(this.state.clientDetails);
    // let clientDetails = Object.assign({}, this.state.clientDetails);
    // clientDetails[e.target.name] = Number(e.target.value);
    // return this.setState({ clientDetails });
  };

  // onChangeRangePicker = (e, date) => {
  //   // let clientDetails = Object.assign({}, this.state.clientDetails);
  //   let startDate = date[0];
  //   let endDate = date[1];
  //   return this.setState({ startDate, endDate });
  // };

  // onChangeActiveRangePicker = (e, date) => {
  //   // let clientDetails = Object.assign({}, this.state.clientDetails);
  //   let activeTimesheetStartDate = date[0];
  //   let activeTimesheetEndDate = date[1];
  //   return this.setState({ activeTimesheetStartDate, activeTimesheetEndDate });
  // };

  // onChangeFreezeDatePicker = (e, date) => {
  //   // let clientDetails = Object.assign({}, this.state.clientDetails);
  //   let activeTimesheetFreezeDate = date;
  //   return this.setState({ activeTimesheetFreezeDate });
  // };

  // onChangeActivetimeSheet = (checked) => {
  //   //let clientDetails = Object.assign({}, this.state.clientDetails);
  //   let isActiveTimesheet = checked;
  //   return this.setState({ isActiveTimesheet });
  // };

  // getSelectedEmployees = (empData) => {
  //   let clientDetails = Object.assign({}, this.state.clientDetails);
  //   clientDetails.listOfEmployees = empData;
  //   this.setState({ clientDetails });
  //   // console.log(clientDetails);
  // };

  validate = (data) => {
    const errors = {};
    if (!Validator.isEmail(data.primaryEmail))
      errors.primaryEmail = "Invalid Email";
    if (!data.companyName) errors.companyName = "Can't be empty";
    if (!data.clientId) errors.clientId = "Can't be empty";
    if (!data.phoneNumber) errors.phoneNumber = "Please Enter Number";
    if (!data.approverName) errors.approverName = "Can't be empty";
    if (!data.managerName) errors.managerName = "Can't be empty";
    return errors;
  };

  onSubmit = (e) => {
    e.preventDefault();
    let clientDetails = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        let data = {};
        data.clientDetails = clientDetails;
        data.clientDetails.createdById = Math.floor(Math.random() * 100 + 1);
        console.log(data.clientDetails);
        this.props.dispatch(updateClient(data.clientDetails));
        this.props.history.push("/Client");
        return this.setState({ clientDetails });
      }
    });
  };

  // getSelectedEmployees = (empData) => {
  //   let clientDetails = Object.assign({}, this.state);
  //   clientDetails.listOfEmployees = empData;
  //   this.setState({ clientDetails });
  //   // console.log(clientDetails);
  // };

  

  render() {
    const { data, errors } = this.state;
    const { t } = this.props;
    const { TextArea } = Input;
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    const { clientDetails } = this.state;

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
          <HeaderHome/>
          <Content className="content">
                    <Row gutter={24}>
                    <Col span={16}>
                    <Form>
                    <Card>
                      <h2>{t("Edit Client Details")}</h2>
                    </Card>
                    <Row type="flex" justify="start">
                        <Col span={8}>
                        <Card>
                            <label>{t("Company Name")}</label>
                            <Form.Item error={!!errors.companyName}>
                                <Input
                                    id="companyName"
                                    type="text"
                                    size="default"
                                    name="companyName"
                                    onChange={this.onChange}
                                    placeholder="Enter Name"
                                />
                                {errors.companyName && <InlineError text={errors.companyName}/>}
                            </Form.Item>
                            </Card>
                        </Col>
                        <Col span={8}>
                        <Card>
                            <label>{t("Client ID")}</label>
                            <Form.Item error={!!errors.clientId}>
                            
                                <Input
                                    id = "clientId"
                                    type="text"
                                    size="default"
                                    name = "clientId"
                                    value={data.clientId}
                                    onChange={this.onChange}
                                    placeholder="Enter ID"
                                />
                                {errors.clientId && <InlineError text={errors.clientId} />}
                            </Form.Item>
                            </Card>
                        </Col>
                        <Col span={8}>
                        <Card>
                            <label>{t("Phone Number")}</label>
                            <Form.Item error={!!errors.phoneNumber}>
                                <Input
                                    id="phoneNumber"
                                    size="default"
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="10 Digits Phone number"
                                    onChange={this.onChange}
                                />
                                {errors.lastName && (
                            <InlineError text={errors.lastName} />
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
                                    size="default"
                                    name="primaryEmail"
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
                            <Form.Item error={!!errors.secondaryEmail}>
                                <Input
                                    id="secondaryEmail"
                                    size="default"
                                    type="email"
                                    name="secondaryEmail"
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
                            <label>{t("Address")}</label>
                            <Form.Item error={!!errors.address}>
                                <Input
                                    id="address"
                                    type="text"
                                    size="default"
                                    name="address"
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
                            <label>{t("Manager Name")}</label>
                            <Form.Item error={!!errors.managerName}>
                                <Input
                                    id="managerName"
                                    type="text"
                                    size="default"
                                    name="managerName"
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
                                    size="default"
                                    name="approverName"
                                    onChange={this.onChange}
                                    placeholder="Person who approved the Employee"
                                />
                                {errors.approverName && (
                            <InlineError text={errors.approverName} />
                          )}
                            </Form.Item>
                            </Card>
                            </Col>
                  <Col span={6}>
                    <div>
                      <Button type="primary" style={{ marginLeft: "2em" }}>
                        {t("Clear")}
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={this.onSubmit}
                        style={{ marginLeft: "2em" }}
                      >
                        {t("Update Client")}
                      </Button>
                    </div>
                  </Col>
                  </Row>
                  </Form>
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

function mapStateToProps(state) {
  console.log("Client" + JSON.stringify(state.clientDetails));
  return {
    clientDetails: state.clientDetails.result,
    user: state.auth.user,
  };
}

const WrappedForm = Form.create()(ClientView);

export default compose(
  withNamespaces(),connect(mapStateToProps))(WrappedForm);
