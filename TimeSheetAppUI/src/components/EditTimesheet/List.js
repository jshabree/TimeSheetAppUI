import React, { Component } from "react";
import { connect } from "react-redux";
import { timesheetList } from "../../redux/actions/Get_List";
import {
  ClockCircleOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, List, Row, Col, Menu, Card } from "antd";
import Details from "./Details";
import { Link } from "react-router-dom";
import HeaderHome from "../HeaderNav/HeaderHome";
import { deleteTimesheet } from "../../redux/actions/CreateNewRequest";
import moment from "moment";
// import Moment from "react-moment";
class TimesheetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      current: "timesheetlist",
      timesheetList: {},
      currentDetails: {},
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user.role === 1) return { isAdmin: true };
    if (props.timesheetList !== state.timesheetList) {
      return {
        timesheetList: props.timesheetList.reverse(),
      };
    }
  }

  componentDidMount() {
    // this.props.dispatch(timesheetList(this.props.user.employeeID));
    let empid = this.props.user.employeeId;
    this.props.dispatch(timesheetList(empid));
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  editTimesheet = (employeeID) => {
    this.props.history.push("/EditTimesheet/" + employeeID);
  };

  ondeleteTimesheet = (TimesheetId) => {
    this.props.dispatch(deleteTimesheet(TimesheetId));
  };

  onUpdateDetails = (item) => {
    const timesheetlist = this.state.timesheetList;
    const length = timesheetlist.length;
    const currentDetails = timesheetlist[timesheetlist.indexOf(item)];
    this.setState({ currentDetails });
  };

  render() {
    const { Header, Content } = Layout;
    const timesheetList = this.state.timesheetList;
    const currentDetails = this.state.currentDetails;
    // console.log("list", timesheetList);
    // if (timesheetList.length > 0) {
    //   let selectweek = timesheetList[4].selectWeek;
    //   let dt = moment(Number.parseInt(selectweek));
    //   let day1 = dt.startOf("week").format("DD-MMM");
    //   console.log("list", day1);
    // }
    // console.log("moment", moment(Number.parseInt(1591021878965)));
    return (
      <div>
        <Layout>
          <HeaderHome current={this.state.current} />
          <Content className="content">
            <Row gutter={24}>
              <Col span={14}>
                <List
                  style={{ width: "100%" }}
                  header={<h2>Timesheet List</h2>}
                  bordered
                  dataSource={timesheetList}
                  renderItem={(item) => (
                    <List.Item>
                      <Card
                        style={{ width: "100%" }}
                        onClick={() => this.onUpdateDetails(item)}
                      >
                        <Row>
                          <Col span={12}>
                            <h3>
                              {" "}
                              {moment(Number.parseInt(item.selectWeek))
                                .startOf("week")
                                .add(1, "days")

                                .format("DD/MMM/YYYY")
                              // .startOf("week")
                              // .format("DD-MMM")
                              }
                              {"  -  "}
                              {moment(Number.parseInt(item.selectWeek))
                                .startOf("week")
                                .add(7, "days")
                                .format("DD/MMM/YYYY")}
                            </h3>
                            Status: {item.status}
                          </Col>
                          <Col span={12}>
                            <Button
                              type="primary"
                              className="buttons"
                              // disabled={
                              //   item.submissionStatus === 2 || item.submissionStatus === 3
                              // }
                              onClick={() => this.editTimesheet(item._id)}
                            >
                              Edit
                            </Button>
                            <Button
                              className="buttons"
                              onClick={() => this.ondeleteTimesheet(item)}
                            >
                              delete
                            </Button>
                          </Col>
                        </Row>
                      </Card>

                      {/* <Button type="primary" disabled>
                    {item.submissionStatus === 1
                      ? "Saved"
                      : item.submissionStatus === 2
                        ? "Submitted"
                        : item.submissionStatus === 3
                          ? "Approved"
                          : "Rejected"}
                  </Button>*/}
                    </List.Item>
                  )}
                />
              </Col>
              <Col span={10}>
                <Details details={currentDetails} />
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("STATE" + JSON.stringify(state));
  return {
    timesheetList: state.timesheet.result,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(TimesheetList);
