import React, { Component } from "react";

import { CopyrightOutlined } from "@ant-design/icons";

import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import HeaderHome from "../HeaderNav/HeaderHome";
import "./ProjectDetails.scss";
import {
  Menu,
  Collapse,
  Button,
  Layout,
  Input,
  Row,
  Col,
  DatePicker,
  Card,
  Switch,
} from "antd";
import { connect } from "react-redux";
import { updateProject } from "../../redux/actions/ProjectDetails";

const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "project/:id",
      userId: props.location.state.proj._id,
      createdById: "1",
      clientProjectId: "111",
      clientProjectName: "aaa",
      vendorId: "111",
      vendorName: "aaa",
      clientId: "111",
      clientName: "aaa",
      startDate: "",
      endDate: "",
      notes: "aaa",
      activeTimesheetStartDate: "",
      activeTimesheetEndDate: "",
      activeTimesheetFreezeDate: "",
      isActiveTimesheet: true,
      listOfEmployees: [],
      isAdmin: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    // this.props.dispatch(editProject(id));
    console.log(id);
    if (this.props.user.role === 1) this.setState({ isAdmin: true });
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({ projectDetails: props.projectDetails });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeId = (e) => {
    console.log(this.state.projectDetails);
    // let projectDetails = Object.assign({}, this.state.projectDetails);
    // projectDetails[e.target.name] = Number(e.target.value);
    // return this.setState({ projectDetails });
  };

  onChangeRangePicker = (e, date) => {
    // let projectDetails = Object.assign({}, this.state.projectDetails);
    let startDate = date[0];
    let endDate = date[1];
    return this.setState({ startDate, endDate });
  };

  onChangeActiveRangePicker = (e, date) => {
    // let projectDetails = Object.assign({}, this.state.projectDetails);
    let activeTimesheetStartDate = date[0];
    let activeTimesheetEndDate = date[1];
    return this.setState({ activeTimesheetStartDate, activeTimesheetEndDate });
  };

  onChangeFreezeDatePicker = (e, date) => {
    // let projectDetails = Object.assign({}, this.state.projectDetails);
    let activeTimesheetFreezeDate = date;
    return this.setState({ activeTimesheetFreezeDate });
  };

  onChangeActivetimeSheet = (checked) => {
    //let projectDetails = Object.assign({}, this.state.projectDetails);
    let isActiveTimesheet = checked;
    return this.setState({ isActiveTimesheet });
  };

  getSelectedEmployees = (empData) => {
    let projectDetails = Object.assign({}, this.state.projectDetails);
    projectDetails.listOfEmployees = empData;
    this.setState({ projectDetails });
    // console.log(projectDetails);
  };

  onSubmit = (e) => {
    e.preventDefault();
    let projectDetails = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        let data = {};
        data.projectDetails = projectDetails;
        data.projectDetails.createdById = Math.floor(Math.random() * 100 + 1);
        console.log(data.projectDetails);
        this.props.dispatch(updateProject(data.projectDetails));
        this.props.history.push("/Project");
        return this.setState({ projectDetails });
      }
    });
  };

  getSelectedEmployees = (empData) => {
    let projectDetails = Object.assign({}, this.state);
    projectDetails.listOfEmployees = empData;
    this.setState({ projectDetails });
    // console.log(projectDetails);
  };

  render() {
    const { TextArea } = Input;
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    const { projectDetails } = this.state;
    const formItemLayout = {
      labelCol: {
        xl: { span: 24 },
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xl: { span: 24 },
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div>
        <Layout>
          <HeaderHome />
          <Content className="content">
            <Row gutter={24}>
              <Col span={24}>
                <Collapse defaultActiveKey={["1"]} onChange={true}>
                  <Panel header="Project Details" key="1">
                    <div>
                      <Row gutter={24}>
                        <Col span={12}>
                          <label>
                            PROJECT ID:
                            <FormItem {...formItemLayout}>
                              {getFieldDecorator("clientProjectId", {
                                initialValue: this.state.clientProjectId,
                                rules: [
                                  {
                                    required: true,
                                    message: "Please input Project id!",
                                  },
                                ],
                              })(
                                <Input
                                  type="text"
                                  size="default"
                                  name="clientProjectId"
                                  onChange={this.onChangeId}
                                />
                              )}
                            </FormItem>
                          </label>
                        </Col>
                        <Col span={12}>
                          <label>
                            PROJECT NAME:
                            <FormItem {...formItemLayout}>
                              {getFieldDecorator("clientProjectName", {
                                rules: [
                                  {
                                    required: true,
                                    message: "Please input Project Name!",
                                  },
                                ],
                              })(
                                <Input
                                  type="text"
                                  size="default"
                                  name="clientProjectName"
                                  onChange={this.onChange}
                                  placeholder="Enter Project Name"
                                />
                              )}
                            </FormItem>
                          </label>
                        </Col>
                      </Row>
                    </div>
                  </Panel>
                  <Panel header="Client Details" key="2">
                    <div>
                      <Row gutter={24}>
                        <Col span={12}>
                          <label>
                            CLIENT ID:
                            <FormItem {...formItemLayout}>
                              {getFieldDecorator("clientId", {
                                rules: [
                                  {
                                    required: true,
                                    message: "Please input Client Id!",
                                  },
                                ],
                              })(
                                <Input
                                  type="text"
                                  size="default"
                                  name="clientId"
                                  onChange={this.onChangeId}
                                  placeholder="Enter Client Id"
                                />
                              )}
                            </FormItem>
                          </label>
                        </Col>
                        <Col span={12}>
                          <label>
                            CLIENT NAME:
                            <FormItem {...formItemLayout}>
                              {getFieldDecorator("clientName", {
                                rules: [
                                  {
                                    required: true,
                                    message: "Please input Client Name!",
                                  },
                                ],
                              })(
                                <Input
                                  type="text"
                                  size="default"
                                  name="clientName"
                                  onChange={this.onChange}
                                  placeholder="Enter Client Name"
                                />
                              )}
                            </FormItem>
                          </label>
                        </Col>
                      </Row>
                    </div>
                  </Panel>

                  <Panel header="TimeSheet" key="4">
                    <div>
                      <Row>
                        <Col span={12}>
                          <label>
                            PROJECT:
                            <FormItem {...formItemLayout}>
                              {getFieldDecorator("projectRangePicker", {
                                rules: [
                                  {
                                    required: true,
                                    message: "Please Select Project Dates!",
                                  },
                                ],
                              })(
                                <RangePicker
                                  name="projectRangePicker"
                                  format="YYYY-MM-DD"
                                  placeholder={["Start Time", "End Time"]}
                                  onChange={this.onChangeRangePicker}
                                  onOk={this.onChangeRanePickerSubmit}
                                />
                              )}
                            </FormItem>
                          </label>
                        </Col>

                        <Col span={12}>
                          <label>
                            FREEZE DATE:
                            <FormItem {...formItemLayout}>
                              {getFieldDecorator("freezeDate", {
                                rules: [
                                  {
                                    required: true,
                                    message: "Please Select Freeze  Dates!",
                                  },
                                ],
                              })(
                                <DatePicker
                                  name="freezeDate"
                                  format="YYYY-MM-DD"
                                  onChange={this.onChangeFreezeDatePicker}
                                />
                              )}
                            </FormItem>
                          </label>
                        </Col>
                        <Col span={12}>
                          <label htmlFor="Switch">
                            ACTIVE TIMESHEET:
                            <FormItem className="displayInline">
                              <Switch
                                defaultChecked
                                onChange={this.onChanegeActivetimeSheet}
                              />
                            </FormItem>
                          </label>
                        </Col>
                      </Row>
                    </div>
                  </Panel>
                </Collapse>
                <Row type="flex" justify="start">
                  <Col span={24}>
                    <Card>
                      <div>
                        <label htmlFor="notes" className="displayBlock">
                          Notes:
                          <TextArea
                            rows={3}
                            name="notes"
                            onChange={this.onChange}
                          />
                        </label>
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Row type="flex" justify="center">
                  <Button type="primary" className="buttonStyle">
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.onSubmit}
                    className="buttonStyle"
                  >
                    {" "}
                    Save Project
                  </Button>
                </Row>
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
  console.log("Project" + JSON.stringify(state.projectDetails));
  return {
    projectDetails: state.projectDetails.result,
    user: state.auth.user,
  };
}

const WrappedForm = Form.create()(ProjectView);

export default connect(mapStateToProps)(WrappedForm);
