import React, { Component } from "react";
import {
  ClockCircleOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import {
  Menu,
  Collapse,
  Button,
  Tabs,
  Layout,
  Input,
  Row,
  Col,
  DatePicker,
  Radio,
  Card,
  Select,
  Upload,
  message,
} from "antd";
import moment from "moment";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import {
  createRequestSubmit,
  assignedProject,
} from "../../redux/actions/CreateNewRequest";
import { getEmployeeByEmail } from "../../redux/actions/Get_List";
import HeaderHome from "../HeaderNav/HeaderHome";
//import { createWorkingHourTimeSheet } from "../../redux/actions/CreateNewRequest";
import { connect } from "react-redux";
import TimeSheet from "../TimeSheet/index";
const { TextArea } = Input;
const Option = Select.Option;
const { Header, Sider, Content } = Layout;
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const MomentTag = Moment;

// function onChange(date, dateString) {
//     console.log(date, dateString);
// }
class CreateNewRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewTimesheet: false,
      error: "",
      current: "timesheet",
      TimeSheetDetails: {},
      EmployeeDetails: {},
      ProjectDetails: {},
      isAdmin: false,
      UserDetails: this.props.UserDetails,
    };
  }

  componentDidMount() {
    let TimeSheetDetails = Object.assign(
      {},
      this.state.TimeSheetDetails,
      this.props.TimeSheetDetails
    );
    this.setState({ TimeSheetDetails });
    //this.props.dispatch(assignedProject(TimeSheetDetails.employeeID));
    // find employee details based on email
    // setTimeout(function() {
    this.props.dispatch(getEmployeeByEmail(this.state.UserDetails.employeeId));
    // }, 3000);
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.EmployeeDetails !== prevState.EmployeeDetails) {
      console.log(
        "receiving the props in GetDerivedStateFromProps() ",
        newProps.EmployeeDetails
      );
      if (newProps.EmployeeDetails === undefined) {
        return { EmployeeDetails: [] };
      } else {
        return { EmployeeDetails: newProps.EmployeeDetails };
      }
    } else return null;
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.UserDetails.role === 1) this.setState({ isAdmin: true });
    this.setState({ ProjectDetails: props.ProjectDetails });
  }

  handleClick = (e) => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  onDropdownChange = (e, i) => {
    console.log("DDL" + e);
    let TimeSheetDetails = Object.assign({}, this.state.TimeSheetDetails);
    TimeSheetDetails.jobTitle = e;
    return this.setState({ TimeSheetDetails });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.setState({ viewTimesheet: !this.state.viewTimesheet });
        let data = {};
        data.TimeSheetDetails = this.state.TimeSheetDetails;
        // data.TimeSheetDetails.employeeID = Math.floor((Math.random() * 100) + 1);
        console.log("Details for time sheet details", data.TimeSheetDetails);
        //  data.reqId = this.state.TimeSheetDetails.reqId;
        // this.props.dispatch(createRequestSubmit(data));
        //this.props.dispatch(createWorkingHourTimeSheet(data));
        console.log("Submit click");
      }
    });
  };

  onSelectWeekChange = (e, date) => {
    console.log("select week change", e);
    console.log("date" + date);
    let TimeSheetDetails = Object.assign({}, this.state.TimeSheetDetails);
    console.log(moment(e).valueOf());
    TimeSheetDetails["selectWeek"] = moment(e).valueOf();
    return this.setState({ TimeSheetDetails });
  };

  saveTimesheet = (data) => {
    data.projectId = this.props.ProjectDetails.projectId;
    data.employeeID = this.state.UserDetails.email;
    // this.props.dispatch(createRequestSubmit(data));
    this.props.history.push("/home");
  };

  render() {
    const { WeekPicker } = DatePicker;
    const { getFieldDecorator } = this.props.form;
    let TimeSheetDetails = this.state.TimeSheetDetails;
    const formItemLayout = {
      labelCol: {
        xl: { span: 24 },
        lg: { span: 24 },
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xl: { span: 24 },
        lg: { span: 24 },
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div>
        <Layout>
          <HeaderHome current={this.state.current} />
          <Content className="content">
            <Form layout="inline">
              <Row>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Card>
                    <p>
                      {" "}
                      <h3 className="displayInline">END CLIENT: </h3>
                      {this.state.EmployeeDetails.endClient}
                    </p>
                  </Card>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Card>
                    <p>
                      {" "}
                      <h3 className="displayInline"> APPROVER(S): </h3>
                      {this.state.EmployeeDetails.approverName}
                    </p>
                  </Card>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Card>
                    <p>
                      <h3 className="displayInline"> JOB START DATE: </h3>
                      <MomentTag format="MM/DD/YYYY">
                        {this.state.EmployeeDetails.startDate}
                      </MomentTag>
                    </p>
                  </Card>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Card>
                    <p>
                      {" "}
                      <h3 className="displayInline"> PROJECT: </h3>
                      {this.state.EmployeeDetails.projectName}
                    </p>
                  </Card>
                </Col>

                {/*
                  <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                
                </Col>
                  
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Card>
                    <FormItem
                                            label="Job"
                                            hasFeedback
                                        >
                                            <Select id="jobTitle" name="jobTitle" value={this.state.TimeSheetDetails.jobTitle} onChange={this.onDropdownChange}>
                                                <Option value="Java Developer">Java Developer</Option>
                                                <Option value="Full Stack">Full Stack</Option>
                                                <Option value="Data Analyst">Data Analyst</Option>
                                            </Select>
                                        </FormItem> 
                    Assigned Project
                    <div>{this.state.ProjectDetails.clientProjectName}</div>
                  </Card>
                </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} />
              */}

                <Col s={24} sm={24} md={24} lg={24} xl={24}>
                  <Card>
                    Select start date of the week
                    <FormItem {...formItemLayout}>
                      {getFieldDecorator("testNumber", {
                        initialValue: this.state.EmployeeDetails.selectWeek,
                        rules: [
                          {
                            required: true,
                            message: "Please Select Week!",
                          },
                        ],
                      })(
                        <WeekPicker
                          className="displayBlock"
                          onChange={this.onSelectWeekChange}
                          placeholder="Select week"
                        />
                      )}
                    </FormItem>
                    <Button
                      type="primary"
                      onClick={this.onSubmit}
                      className="displayBlock"
                    >
                      Submit
                    </Button>
                  </Card>
                </Col>
              </Row>
            </Form>

            <div>
              {this.state.viewTimesheet && (
                <TimeSheet
                  TimeSheetDetails={TimeSheetDetails}
                  submitData={this.saveTimesheet}
                />
              )}
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//     return {

//         isTaskCreated: state.createTask.isTaskCreated
//     };
// };
const mapStateToProps = (state) => {
  console.log(state);
  return {
    UserDetails: state.auth.user,
    ProjectDetails: state.projectDetails.result,
    EmployeeDetails: state.empList.currentEmployee,
  };
};
const WrappedRegistrationForm = Form.create()(CreateNewRequest);

export default connect(mapStateToProps)(WrappedRegistrationForm);

// <Col xs={12} sm={12} md={12} lg={12} xl={12}>
// <Card >
//     <FormItem

//         label=" Start Date"
//         hasFeedback

//     >

//         <DatePicker onChange={this.onPlacementDateChange} placeholder="Select Date" defaultValue={this.state.reqDetails.startDate} />

//         {/* <RangePicker onChange={this.onPlacementDateChange} defaultValue={this.state.reqDetails.datepicker} /> */}
//     </FormItem>

// </Card>
// </Col>
// <Col xs={12} sm={12} md={12} lg={12} xl={12}>
// <Card >
//     <FormItem

//         label=" End Date"
//         hasFeedback

//     >
//         <DatePicker onChange={this.onPlacementDateChange} placeholder="Select Date" defaultValue={this.state.reqDetails.endDate} />

//         {/* <RangePicker onChange={this.onPlacementDateChange} defaultValue={this.state.reqDetails.datepicker} /> */}
//     </FormItem>

// </Card>
// </Col>
