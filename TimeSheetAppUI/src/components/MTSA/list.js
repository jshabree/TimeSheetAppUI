import React, { Component } from "react";
import { connect } from "react-redux";
import "@ant-design/compatible/assets/index.css";
import { Layout } from "antd";
import { CopyrightOutlined } from "@ant-design/icons";
import { getTimesheet } from "../../redux/actions/Get_List";
import { listEmployee } from "../../redux/actions/Employee_list";
import HeaderHome from "../HeaderNav/HeaderHome";
import { updateStatusTimesheet } from "../../redux/actions/CreateNewRequest";
import { Tabs } from "antd";
import TimesheetUser from "./TimesheetUser";

const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;
const style = {
  height: 100,
  width: 200,
  textAlign: "center",
  padding: "5px",
  margin: "10px",
  background: "#ececec",
};

class MTSA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "Manager Approval",
      timesheetDetails: {},
      EmployeeDetails: {},
      loading: false,
      isAdmin: false,
      current: "Manager Approval",
    };
  }

  componentDidMount() {
    this.props.dispatch(listEmployee());
    this.props.dispatch(getTimesheet());
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user.role === 1) state.isAdmin = true;

    if (props.EmployeeDetails === undefined) {
      return { EmployeeDetails: {} };
    }
    if (props.TimeSheetDetails === undefined) {
      return {
        TimeSheetDetails: {},
      };
    }
    if (
      props.TimeSheetDetails !== state.TimeSheetDetails &&
      props.EmployeeDetails !== state.EmployeeDetails
    ) {
      return {
        TimeSheetDetails: props.TimeSheetDetails,
        EmployeeDetails: props.EmployeeDetails,
      };
    }
    if (props.TimeSheetDetails !== state.TimeSheetDetails) {
      return {
        TimeSheetDetails: props.TimeSheetDetails,
      };
    }
    if (props.EmployeeDetails !== state.EmployeeDetails) {
      return { EmployeeDetails: props.EmployeeDetails };
    }
    return null;
  }

  handleClick = (e) => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  handleApprove = (item) => {
    let data = {};
    data._id = item._id;
    data.status = "approved";
    this.props.dispatch(updateStatusTimesheet(data));
  };
  handleReject = (item) => {
    let data = {};
    data._id = item._id;
    data.status = "rejected";
    this.props.dispatch(updateStatusTimesheet(data));
  };

  render() {
    let WholeDetails = this.state.TimeSheetDetails.reduce((prev, cv) => {
      let record = this.state.EmployeeDetails.find(
        (emp) => emp.employeeId === cv.employeeID
      );
      let object = Object.assign({}, record, cv);
      prev.push(object);
      return prev;
    }, []);

    console.log("WholeDetails", WholeDetails);

    let pendingList, approvedList, rejectedList;

    pendingList = WholeDetails.reverse().filter(
      (item) => item.status === "submitted"
    );
    approvedList = WholeDetails.reverse().filter(
      (item) => item.status === "approved"
    );
    rejectedList = WholeDetails.reverse().filter(
      (item) => item.status === "rejected"
    );

    return (
      <Layout>
        <HeaderHome current={this.state.current} />
        <Content
          style={{
            margin: " 100px 40px 40px 40px",
            background: "#fff",
            minHeight: 450,
          }}
        >
          <Tabs type="card">
            <TabPane tab="Pending TimeSheets" key="1">
              {pendingList.map((item, index) => (
                <TimesheetUser
                  key={index}
                  item={item}
                  handleApproveT={this.handleApprove}
                  handleRejectT={this.handleReject}
                />
              ))}
            </TabPane>
            <TabPane tab="Approved TimeSheets" key="2">
              {approvedList.map((item, index) => (
                <TimesheetUser key={index} item={item} />
              ))}
            </TabPane>
            <TabPane tab="Declined TimeSheets" key="3">
              {rejectedList.map((item, index) => (
                <TimesheetUser key={index} item={item} />
              ))}
            </TabPane>
          </Tabs>
        </Content>
        <Footer>
          <center>
            <CopyrightOutlined />
            Reliable Software 2018
          </center>
        </Footer>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  console.log("STATE" + JSON.stringify(state));
  return {
    EmployeeDetails: state.empList.result,
    TimeSheetDetails: state.timesheet.result,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(MTSA);
