import React, { Component } from "react";
import { connect } from "react-redux";

import {
  ClockCircleOutlined,
  CopyrightOutlined,
  LogoutOutlined,
  MailOutlined,
  ProjectOutlined,
} from "@ant-design/icons";

import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";

import { Menu, List, Button, Layout, Row, Col, Card, Badge } from "antd";
import { Link } from "react-router-dom";
import {
  getPro,
  getEmpInfo,
  getTimesheet,
  approveReject,
} from "../../redux/actions/Get_List";
import Moment from "react-moment";
import { listEmployee } from "../../redux/actions/Employee_list";
const { Header, Content, Footer } = Layout;

class MTSA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "Manager Approval",
      data: {
        clientProjectName: "",
        startDate: "",
        endDate: "",
        listOfEmployees: [{ employeeId: "", employeeName: "" }],
        activeTimesheetStartDate: "",
        activeTimesheetEndDate: "",
        notes: "",
        projectId: "",
        clientProjectId: "",
        vendorId: "",
        vendorName: "",
      },
      prodata: {},
      size1: 0,
      empdata: {},
      size2: 0,
      timesheetDetails: {
        workingDetails: {
          totalWeekWorkHours: 0,
          totalWeekBillableHours: 0,
          totalWeekTimeoffHours: 0,
          totalWeekHours: 0,
          comments: "",
        },
      },
      loading: false,
      isAdmin: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(listEmployee());
    this.props.dispatch(getTimesheet());

    this.onShow();
  }
  static getDerivedStateFromProps(props, state) {
    if (props.user.role === 1) state.isAdmin = true;

    if (props.EmployeeDetails === undefined) {
      return { prodata: {} };
    }
    if (props.TimeSheetDetails === undefined) {
      return {
        timesheetDetails: {},
      };
    }
    if (
      props.TimeSheetDetails !== state.timesheetDetails &&
      props.EmployeeDetails !== state.prodata
    ) {
      return {
        timesheetDetails: props.TimeSheetDetails,
        prodata: props.EmployeeDetails,
      };
    }
    if (props.TimeSheetDetails !== state.timesheetDetails) {
      return {
        timesheetDetails: props.TimeSheetDetails,
      };
    }
    if (props.EmployeeDetails !== state.prodata) {
      return { prodata: props.EmployeeDetails };
    } else return null;
    // if( props.employeeDetails !== state.employeeDetails){
    //   return {employeeDetails: props.employeeDetails}
    // }
  }

  //   componentWillReceiveProps(props) {
  //     console.log("props received :" + props.timesheetDetails);
  //     if (props.timesheetDetails !== null) {
  //       let timesheetDetails = Object.assign(
  //         this.state.timesheetDetails,
  //         props.timesheetDetails
  //       );
  //       this.setState({ timesheetDetails: timesheetDetails });
  //     } else {
  //       this.setState({ size2: 0, empdata: {} });
  //     }
  //     if (this.props.user.role === 1) this.setState({ isAdmin: true });
  //   }

  onChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({
      current: e.key,
    });
  };

  onShow = (e) => {
    const { clientProjectName, startDate, endDate } = this.state.data;
    this.props.dispatch(
      getPro({
        clientProjectName: clientProjectName,
        startDate: startDate,
        endDate: endDate,
      })
    );
    this.props.history.push("/mTSA");
  };
  onList = (pdata) => {
    console.log(pdata);

    // this.setState({ prodata: pdata, size1: 8 });
    // const {
    //     listOfEmployees: [{ employeeId, employeeName }],
    //     activeTimesheetStartDate,
    //     activeTimesheetEndDate,
    //     notes
    // } = this.state.data;
    // this.props.dispatch(
    //     getEmpInfo({
    //         listOfEmployees: [
    //             {
    //                 employeeId: employeeId,
    //                 employeeName: employeeName
    //             }
    //         ],
    //         activeTimesheetStartDate: activeTimesheetStartDate,
    //         activeTimesheetEndDate: activeTimesheetEndDate,
    //         notes: notes
    //     })
    // );
    // size1 = 8;
    // this.props.history.push("/mTSA");
  };

  onDetails = (edata) => {
    console.log(edata);
    this.setState({ empdata: edata, size2: 8 });
    this.props.dispatch(
      getTimesheet({
        projectId: this.state.prodata.projectId,
        employeeId: edata.employeeId,
      })
    );
    // const {
    //     listOfEmployees: [{ employeeId }],
    //     projectId,
    //     clientProjectId,
    //     vendorId,
    //     vendorName
    // } = this.state.data;
    // this.props.dispatch(
    //     getEmpInfo({
    //         listOfEmployees: [{ employeeId: employeeId }],
    //         projectId: projectId,
    //         clientProjectId: clientProjectId,
    //         vendorId: vendorId,
    //         vendorName: vendorName
    //     })
    // );
    // size2 = 8;
    // this.props.history.push("/mTSA");
  };

  approveReject = (timesheetId, submissionStatus) => {
    this.props.dispatch(
      approveReject({ _id: timesheetId, submissionStatus: submissionStatus })
    );
  };

  editTimesheet = (employeeId) => {
    // console.log("/EditTimesheet/"+employeeId);
    this.props.history.push("/EditTimesheet/" + employeeId);
  };

  render() {
    const data1 = Array.from(this.props.empList);
    const {
      data,
      timesheetDetails,
      prodata,
      size1,
      empdata,
      size2,
    } = this.state;
    console.log(this.state);

    return (
      <div>
        <Layout>
          <Content>
            <Col span={8}>
              <Card title="Project List" span={4}>
                <Form span={4}>
                  <List
                    bordered
                    dataSource={data1}
                    renderItem={(item) => (
                      <List.Item>
                        <Card
                          onClick={() => {
                            this.onList(item);
                          }}
                        >
                          {/* <Badge count={item.listOfEmployees.length} /> */}
                          <b>
                            {"Project Name: "}
                            {item.clientProjectName}
                          </b>
                          <br />
                          {"Date: "}
                          <Moment format="MM/DD/YYYY">{item.startDate}</Moment>
                          {" - "}
                          <Moment format="MM/DD/YYYY">{item.endDate}</Moment>
                          <br />
                        </Card>
                      </List.Item>
                    )}
                  />
                </Form>
              </Card>
            </Col>

            <Col xs={size1} sm={size1} md={size1} lg={size1} xl={size1}>
              <Card title="Employee List" span={4}>
                <Form span={4}>
                  <List
                    bordered
                    dataSource={prodata}
                    renderItem={(item2) => (
                      <List.Item>
                        <Card
                          onClick={() => {
                            this.onDetails(item2);
                          }}
                        >
                          {"Employee ID: "}
                          <Badge count={item2._id} />
                          <br />
                          {"Employee Name: "}
                          {item2.firstName} {item2.lastName}
                          <br />
                          {"Timesheet Date: "}
                          <Moment format="MM/DD/YYYY">
                            {prodata.startDate}
                          </Moment>
                          {/*" - " <Moment format="MM/DD/YYYY">
                          {prodata.activeTimesheetEndDate}
                        </Moment> */}
                        </Card>
                      </List.Item>
                    )}
                  />
                </Form>
              </Card>
            </Col>
            <Col xs={size2} sm={size2} md={size2} lg={size2} xl={size2}>
              <Card title="Employee Details" span={4}>
                <Form span={4}>
                  {/* <List
                                        bordered
                                        dataSource={data1}
                                        renderItem={item2 => (
                                            <List.Item> */}
                  <Card>
                    {"Employee Id: "}
                    <Badge count={empdata.employeeId} />
                    <br />
                    {"Project Name: "}
                    <Badge count={prodata.projectName} />
                    <br />
                    {/*{"Client Id: "}
                    {prodata.clientId}
                                        <br />*/}
                    {"Client Name: "}
                    {prodata.endClient}
                    <br />
                    {/* {"Vendor Id: "}
                    {prodata.vendorId}
                    <br />
                    {"Vendor Name: "}
                    {prodata.vendorName}
                                    <br />*/}
                    {"Total week work hours: "}
                    {timesheetDetails.workingDetails.totalWeekWorkHours}
                    <br />
                    {"Total week billable hours: "}
                    {timesheetDetails.workingDetails.totalWeekBillableHours}
                    <br />
                    {"Total week timeoff hours: "}
                    {timesheetDetails.workingDetails.totalWeekTimeOffHours}
                    <br />
                    {"Total week hours: "}
                    {timesheetDetails.workingDetails.totalWeekHours}
                    <br />
                    {"Comments: "}
                    {timesheetDetails.workingDetails.comments}
                    <br />
                    <Button
                      type="primary"
                      disabled={timesheetDetails.submissionStatus === 3}
                      onClick={() => {
                        this.approveReject(timesheetDetails._id, 3);
                      }}
                    >
                      Approve
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      type="primary"
                      disabled={timesheetDetails.submissionStatus === 4}
                      onClick={() => {
                        this.approveReject(timesheetDetails._id, 4);
                      }}
                    >
                      Reject
                    </Button>
                    <br />
                    <Button
                      type="primary"
                      onClick={() => {
                        this.editTimesheet(timesheetDetails._id);
                      }}
                    >
                      Edit
                    </Button>
                    <br />
                    {timesheetDetails.submissionStatus === 3
                      ? "Approved"
                      : timesheetDetails.submissionStatus === 4
                        ? "Rejected"
                        : ""}
                  </Card>
                  {/* </List.Item>
                                        )}
                                    /> */}
                </Form>
              </Card>{" "}
            </Col>
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
  console.log("STATE" + JSON.stringify(state));
  return {
    empList: state.empList.result,
    timesheetDetails: state.timesheet.result,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(MTSA);
