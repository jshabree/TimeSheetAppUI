import * as React from "react";
import { Component } from "react";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import {
  Collapse,
  Button,
  Tabs,
  Layout,
  Input,
  TextArea,
  InputNumber,
  message,
} from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createRequestSubmit } from "../../redux/actions/CreateNewRequest";
import { createSaveTimeSheet } from "../../redux/actions/CreateNewRequest";
import { approveReject } from "../../redux/actions/Get_List";

class timesheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeID: this.props.TimeSheetDetails.employeeID,
      selectWeek: this.props.TimeSheetDetails.selectWeek,
      isAdmin: false,
      status: "",
      workingDetails: {
        totalWeekWorkHours: 0,
        totalWeekBillableHours: 0,
        totalWeekTimeoffHours: 0,
        totalWeekHours: 0,
        comments: "",
        status: false,
        daySheet: [
          {
            day: "monday",
            workHours: 0,
            timeOffHour: 0,
            date: "Test",
            billableHours: 0,
            totalHour: 0,
            notes: "Test",
          },
          {
            day: "tuesday",
            workHours: 0,
            timeOffHour: 0,
            date: "Test",
            billableHours: 0,
            totalHour: 0,
            notes: "Test",
          },
          {
            day: "wednesday",
            workHours: 0,
            timeOffHour: 0,
            date: "Test",
            billableHours: 0,
            totalHour: 0,
            notes: "Test",
          },
          {
            day: "thursday",
            workHours: 0,
            timeOffHour: 0,
            date: "Test",
            billableHours: 0,
            totalHour: 0,
            notes: "Test",
          },
          {
            day: "friday",
            workHours: 0,
            timeOffHour: 0,
            date: "Test",
            billableHours: 0,
            totalHour: 0,
            notes: "Test",
          },
          {
            day: "saturday",
            workHours: 0,
            timeOffHour: 0,
            date: "Test",
            billableHours: 0,
            totalHour: 0,
            notes: "Test",
          },
          {
            day: "sunday",
            workHours: 0,
            timeOffHour: 0,
            date: "Test",
            billableHours: 0,
            totalHour: 0,
            notes: "Test",
          },
        ],
      },
    };
    this.baseState = this.state;
  }

  componentDidMount() {
    console.log(this.props);
    console.log("timesheet mounted");
    if (this.props.isAdmin === 1) {
      this.setState({ isAdmin: true });
    }
    if (this.props.TimeSheetDetails.workingDetails) {
      this.setState({
        workingDetails: this.props.TimeSheetDetails.workingDetails,
      });
    }
  }

  handlenum1Change = (evt, date) => {
    console.log("selected date is : " + date);
    const dayArray = {
      monday: 0,
      tuesday: 1,
      wednesday: 2,
      thursday: 3,
      friday: 4,
      saturday: 5,
      sunday: 6,
    };
    let workingDetails = Object.assign({}, this.state.workingDetails);
    // workingDetails.timeSheetId = Math.floor((Math.random() * 100) + 2);

    let day = workingDetails.daySheet[dayArray[evt.target.name]];

    day.workHours = Number(evt.target.value);
    day.date = date;
    // workingDetails.totalWeekWorkHours = Number(workingDetails.totalWeekWorkHours) + Number(evt.target.value);
    // workingDetails.totalWeekBillableHours = workingDetails.totalWeekWorkHours;
    // workingDetails.totalWeekHours = Number(workingDetails.totalWeekWorkHours) + Number(workingDetails.totalWeekTimeoffHours);
    // day.billableHours = Number(evt.target.value);
    day.totalHour = Number(day.timeOffHour) + Number(evt.target.value);

    this.setState({ workingDetails });

    let newDetails = Object.assign({}, this.state.workingDetails);

    let pday = newDetails.daySheet[dayArray[evt.target.name]];
    let twwh = 0;
    let twbh = 0;
    let twh = 0;
    let p = this.state.workingDetails.totalWeekTimeOffHours;
    this.state.workingDetails.daySheet.map((data) => {
      twwh += Number(data.workHours);
      twbh = twwh;
      twh = Number(twwh) + Number(p);
    });

    newDetails.totalWeekWorkHours = twwh;
    //newDetails.totalWeekBillableHours = twbh;
    newDetails.totalWeekHours = twh;

    this.setState({ workingDetails: newDetails });
  };

  handlenum2Change = (evt) => {
    const dayArray = {
      monday: 0,
      tuesday: 1,
      wednesday: 2,
      thursday: 3,
      friday: 4,
      saturday: 5,
      sunday: 6,
    };

    let workingDetails = Object.assign({}, this.state.workingDetails);

    let day = workingDetails.daySheet[dayArray[evt.target.name]];
    day.timeOffHour = Number(evt.target.value);
    // workingDetails.totalWeekTimeoffHours = Number(workingDetails.totalWeekTimeoffHours) + Number(evt.target.value);
    day.totalHour = Number(day.workHours) + Number(evt.target.value);
    this.setState({ workingDetails });

    let newDetails = Object.assign({}, this.state.workingDetails);

    let pday = newDetails.daySheet[dayArray[evt.target.name]];
    let twth = 0;
    let twh = 0;
    this.state.workingDetails.daySheet.map((data) => {
      twth += Number(data.timeOffHour);
      twh = Number(this.state.workingDetails.totalWeekWorkHours) + Number(twth);
    });

    newDetails.totalWeekTimeoffHours = twth;
    newDetails.totalWeekHours = twh;

    this.setState({ workingDetails: newDetails });
  };

  handlenum3Change = (evt) => {
    // console.log("selected date is : " + date);
    const dayArray = {
      monday: 0,
      tuesday: 1,
      wednesday: 2,
      thursday: 3,
      friday: 4,
      saturday: 5,
      sunday: 6,
    };
    let workingDetails = Object.assign({}, this.state.workingDetails);
    let day = workingDetails.daySheet[dayArray[evt.target.name]];
    // day.workHours = Number(evt.target.value);
    day.billableHours = Number(evt.target.value);
    let twbh = 0;
    this.state.workingDetails.daySheet.map((data) => {
      twbh += data.billableHours;
    });
    workingDetails.totalWeekBillableHours = twbh;

    this.setState({ workingDetails });
    let newDetails = Object.assign({}, this.state.workingDetails);

    let pday = newDetails.daySheet[dayArray[evt.target.name]];
    let twwh = 0;
    let twh = 0;
    // this.state.workingDetails.daySheet.map((data) => {
    //   twwh += Number(data.workHours);
    // twbh = data.billableHours;
    //   twh =
    //     Number(twwh) + Number(this.state.workingDetails.totalWeekTimeoffHours);
    // });

    // newDetails.totalWeekWorkHours = twwh;
    // newDetails.totalWeekBillableHours = twbh;
    // newDetails.totalWeekHours = twh;

    // this.setState({ workingDetails: newDetails });
  };

  handleNotes = (e) => {
    let workingDetails = Object.assign({}, this.state.workingDetails);
    workingDetails[e.target.name] = e.target.value;
    return this.setState({ workingDetails });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.TimeSheetDetails._id);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let data = {};
        //data.workinghours = this.state.workinghours;
        data.workingdetails = this.state;
        data.workingdetails._id = this.props.TimeSheetDetails._id;
        if (this.state.isAdmin) {
          data.workingdetails.submissionStatus = 3;
        } else {
          data.workingdetails.submissionStatus = 2;
        }
        console.log(data.workingdetails);
        console.log("Submit click");
        return this.props.submitData(data.workingdetails);
      }
    });
  };

  onSubmitAdmin = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let data = {};
        //data.workinghours = this.state.workinghours;
        data.workingdetails = this.state;
        console.log(data.workingdetails);
        console.log("onSubmitAdmin click");
        return this.props.TimeSheetDataAdmin(data.workingdetails);
      }
    });
  };

  onSave = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let data = {};
        // data.workinghours = this.state.workinghours;
        data.workingdetails = this.state;
        data.workingdetails.submissionStatus = 1;
        console.log(data.workingdetails);
        return this.props.submitData(data.workingdetails);
      }
    });
  };

  onReset = () => {
    this.setState(this.baseState);
  };

  onApproveOrReject = (timesheetId, submissionStatus) => {
    this.props.dispatch(
      approveReject({ _id: timesheetId, submissionStatus: submissionStatus })
    );
  };

  // handleSubmit = (e) => {
  //     e.preventDefault();
  //     this.props.form.validateFieldsAndScroll((err, values) => {
  //         if (!err) {
  //             console.log('Received values of form: ', values);
  //         }
  //     });
  // }

  render() {
    const { getFieldDecorator } = this.props.form;
    //const { Workingdetails, errors } = this.state;
    const { TextArea } = Input;
    const FormItem = Form.Item;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    console.log(this.props.TimeSheetDetails);
    let dynamicAdmin, dynamicUser;
    if (this.state.isAdmin) {
      dynamicAdmin = true;
      dynamicUser = false;
    } else {
      dynamicAdmin = false;
      dynamicUser = true;
    }

    // console.log("" + JSON.stringify(this.props.auth));
    // console.log("Employee" + employeeId);
    let dt = moment(Number.parseInt(this.props.TimeSheetDetails.selectWeek));
    let day1 = dt.startOf("week").format("DD-MMM");
    let day2 = dt.add(1, "days").format("DD-MMM");
    let day3 = dt.add(1, "days").format("DD-MMM");
    let day4 = dt.add(1, "days").format("DD-MMM");
    let day5 = dt.add(1, "days").format("DD-MMM");
    let day6 = dt.add(1, "days").format("DD-MMM");
    let day7 = dt.add(1, "days").format("DD-MMM");
    const days = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"];
    const items = days.map((n) => {
      const obj = { totalHr: "0", billableHr: "0" };
      return obj;
    });

    // console.log(items)
    let mondayWorkHours;
    let tuesdayWorkHours;
    let wednesdayWorkHours;
    let thursdayWorkHours;
    let fridayWorkHours;
    let saturdayWorkHours;
    let sundayWorkHours;

    let mondayTimeOfHour;
    let tuesdayTimeOfHour;
    let wednesdayTimeOfHour;
    let thursdayTimeOfHour;
    let fridayTimeOfHour;
    let saturdayTimeOfHour;
    let sundayTimeOfHour;

    let mondayBillableHours;
    let tuesdayBillableHours;
    let wednesdayBillableHours;
    let thursdayBillableHours;
    let fridayBillableHours;
    let saturdayBillableHours;
    let sundayBillableHours;

    let mondayTotalHours;
    let tuesdayTotalHours;
    let wednesdayTotalHours;
    let thursdayTotalHours;
    let fridayTotalHours;
    let saturdayTotalHours;
    let sundayTotalHours;

    let totalWeekHours;
    let totalWeekWorkHours;
    let totalWeekTimeoffHours;
    let workingDetailsComments;
    let totalWeekBillableHours;

    if (this.state.workingDetails) {
      mondayWorkHours = this.state.workingDetails.daySheet[0].workHours;
      tuesdayWorkHours = this.state.workingDetails.daySheet[1].workHours;
      wednesdayWorkHours = this.state.workingDetails.daySheet[2].workHours;
      thursdayWorkHours = this.state.workingDetails.daySheet[3].workHours;
      fridayWorkHours = this.state.workingDetails.daySheet[4].workHours;
      saturdayWorkHours = this.state.workingDetails.daySheet[5].workHours;
      sundayWorkHours = this.state.workingDetails.daySheet[6].workHours;

      mondayTimeOfHour = this.state.workingDetails.daySheet[0].timeOffHour;
      tuesdayTimeOfHour = this.state.workingDetails.daySheet[1].timeOffHour;
      wednesdayTimeOfHour = this.state.workingDetails.daySheet[2].timeOffHour;
      thursdayTimeOfHour = this.state.workingDetails.daySheet[3].timeOffHour;
      fridayTimeOfHour = this.state.workingDetails.daySheet[4].timeOffHour;
      saturdayTimeOfHour = this.state.workingDetails.daySheet[5].timeOffHour;
      sundayTimeOfHour = this.state.workingDetails.daySheet[6].timeOffHour;

      mondayBillableHours = (
        <FormItem>
          <input
            type="text"
            value={this.state.workingDetails.daySheet[0].billableHours}
            className="tabledataHandW"
            name="monday"
            onChange={this.handlenum3Change}
            readOnly={dynamicUser}
          />
        </FormItem>
      );
      tuesdayBillableHours = (
        <FormItem>
          <input
            type="text"
            value={this.state.workingDetails.daySheet[1].billableHours}
            name="tuesday"
            onChange={this.handlenum3Change}
            readOnly={dynamicUser}
            className="tabledataHandW"
          />
        </FormItem>
      );
      wednesdayBillableHours = (
        <FormItem>
          <input
            type="text"
            value={this.state.workingDetails.daySheet[2].billableHours}
            name="wednesday"
            onChange={this.handlenum3Change}
            readOnly={dynamicUser}
            className="tabledataHandW"
          />
        </FormItem>
      );
      thursdayBillableHours = (
        <FormItem>
          <input
            type="text"
            value={this.state.workingDetails.daySheet[3].billableHours}
            name="thursday"
            onChange={this.handlenum3Change}
            readOnly={dynamicUser}
            className="tabledataHandW"
          />
        </FormItem>
      );
      fridayBillableHours = (
        <FormItem>
          <input
            type="text"
            value={this.state.workingDetails.daySheet[4].billableHours}
            name="friday"
            onChange={this.handlenum3Change}
            readOnly={dynamicUser}
            className="tabledataHandW"
          />
        </FormItem>
      );
      saturdayBillableHours = (
        <FormItem>
          <input
            type="text"
            value={this.state.workingDetails.daySheet[5].billableHours}
            name="saturday"
            onChange={this.handlenum3Change}
            readOnly={dynamicUser}
            className="tabledataHandW"
          />
        </FormItem>
      );
      sundayBillableHours = (
        <FormItem>
          <input
            type="text"
            value={this.state.workingDetails.daySheet[6].billableHours}
            name="sunday"
            onChange={this.handlenum3Change}
            readOnly={dynamicUser}
            className="tabledataHandW"
          />
        </FormItem>
      );

      mondayTotalHours = (
        <FormItem>
          <input
            type="text"
            value={
              parseInt(this.state.workingDetails.daySheet[0].workHours) +
              parseInt(this.state.workingDetails.daySheet[0].timeOffHour)
            }
            readOnly
            className="tabledataHandW"
          />
        </FormItem>
      );
      tuesdayTotalHours = (
        <FormItem>
          <input
            type="text"
            value={
              parseInt(this.state.workingDetails.daySheet[1].workHours) +
              parseInt(this.state.workingDetails.daySheet[1].timeOffHour)
            }
            readOnly
            className="tabledataHandW"
          />
        </FormItem>
      );
      wednesdayTotalHours = (
        <FormItem>
          <input
            type="text"
            value={
              parseInt(this.state.workingDetails.daySheet[2].workHours) +
              parseInt(this.state.workingDetails.daySheet[2].timeOffHour)
            }
            readOnly
            className="tabledataHandW"
          />
        </FormItem>
      );
      thursdayTotalHours = (
        <FormItem>
          <input
            type="text"
            value={
              parseInt(this.state.workingDetails.daySheet[3].workHours) +
              parseInt(this.state.workingDetails.daySheet[3].timeOffHour)
            }
            readOnly
            className="tabledataHandW"
          />
        </FormItem>
      );
      fridayTotalHours = (
        <FormItem>
          <input
            type="text"
            value={
              parseInt(this.state.workingDetails.daySheet[4].workHours) +
              parseInt(this.state.workingDetails.daySheet[4].timeOffHour)
            }
            readOnly
            className="tabledataHandW"
          />
        </FormItem>
      );
      saturdayTotalHours = (
        <FormItem>
          <input
            type="text"
            value={
              parseInt(this.state.workingDetails.daySheet[5].workHours) +
              parseInt(this.state.workingDetails.daySheet[5].timeOffHour)
            }
            readOnly
            className="tabledataHandW"
          />
        </FormItem>
      );
      sundayTotalHours = (
        <FormItem>
          <input
            type="text"
            value={
              parseInt(this.state.workingDetails.daySheet[6].workHours) +
              parseInt(this.state.workingDetails.daySheet[6].timeOffHour)
            }
            readOnly
            className="tabledataHandW"
          />
        </FormItem>
      );

      totalWeekWorkHours = (
        <FormItem>
          <input
            type="text"
            size="large"
            value={this.state.workingDetails.totalWeekWorkHours}
            readOnly
            className="tabledataHandW"
          />
        </FormItem>
      );

      totalWeekBillableHours = (
        <FormItem>
          <input
            type="text"
            size="large"
            value={this.state.workingDetails.totalWeekBillableHours}
            readOnly
            className="tabledataHandW"
          />
        </FormItem>
      );

      totalWeekHours = (
        <FormItem>
          <input
            type="text"
            size="large"
            value={this.state.workingDetails.totalWeekHours}
            readOnly
            className="tabledataHandW"
          />
        </FormItem>
      );

      totalWeekTimeoffHours = (
        <FormItem>
          <input
            type="text"
            value={this.state.workingDetails.totalWeekTimeoffHours}
            readOnly
            className="tabledataHandW"
          />
        </FormItem>
      );

      workingDetailsComments = (
        <FormItem>
          <TextArea
            rows={4}
            name="comments"
            value={this.state.workingDetails.comments}
            onChange={this.handleNotes}
          />
        </FormItem>
      );
    } else {
      mondayBillableHours = (
        <FormItem>
          <input type="text" readOnly className="tabledataHandW" />
        </FormItem>
      );
      tuesdayBillableHours = (
        <FormItem>
          <input type="text" readOnly className="tabledataHandW" />
        </FormItem>
      );
      wednesdayBillableHours = (
        <FormItem>
          <input type="text" readOnly className="tabledataHandW" />
        </FormItem>
      );
      thursdayBillableHours = (
        <FormItem>
          <input type="text" readOnly className="tabledataHandW" />
        </FormItem>
      );
      fridayBillableHours = (
        <FormItem>
          <input type="text" readOnly className="tabledataHandW" />
        </FormItem>
      );
      saturdayBillableHours = (
        <FormItem>
          <input type="text" readOnly className="tabledataHandW" />
        </FormItem>
      );
      sundayBillableHours = (
        <FormItem>
          <input type="text" readOnly className="tabledataHandW" />
        </FormItem>
      );

      mondayTotalHours = (
        <FormItem>
          <input type="text" readOnly className="tabledataHandW" />
        </FormItem>
      );
      tuesdayTotalHours = (
        <FormItem>
          <input type="text" readOnly className="tabledataHandW" />
        </FormItem>
      );
      wednesdayTotalHours = (
        <FormItem>
          <input type="text" readOnly className="tabledataHandW" />
        </FormItem>
      );
      thursdayTotalHours = (
        <FormItem>
          <input type="text" readOnly className="tabledataHandW" />
        </FormItem>
      );
      fridayTotalHours = (
        <FormItem>
          <input type="text" readOnly className="tabledataHandW" />
        </FormItem>
      );
      saturdayTotalHours = (
        <FormItem>
          <input type="text" readOnly className="tabledataHandW" />
        </FormItem>
      );
      sundayTotalHours = (
        <FormItem>
          <input type="text" readOnly className="tabledataHandW" />
        </FormItem>
      );

      totalWeekWorkHours = (
        <FormItem>
          <input type="text" size="large" readOnly className="tabledataHandW" />
        </FormItem>
      );

      totalWeekHours = (
        <FormItem>
          <input type="text" size="large" readOnly className="tabledataHandW" />
        </FormItem>
      );

      totalWeekTimeoffHours = (
        <FormItem>
          <input type="text" readOnly className="tabledataHandW" />
        </FormItem>
      );

      workingDetailsComments = (
        <FormItem>
          <TextArea rows={4} name="comments" onChange={this.handleNotes} />
        </FormItem>
      );
    }

    let saveButton;
    let submitButton;
    let resetButton;
    let submitAndApproveButton;
    let approveButton;
    let rejectButton;

    if (this.state.isAdmin) {
      resetButton = (
        <FormItem>
          <Button type="primary" onClick={this.onReset}>
            Reset
          </Button>
        </FormItem>
      );
      submitButton = (
        <FormItem>
          <Button type="primary" onClick={this.onSubmitAdmin}>
            Submit
          </Button>
        </FormItem>
      );
    } else {
      saveButton = (
        <FormItem>
          <Button type="primary" onClick={this.onSave}>
            Save
          </Button>
        </FormItem>
      );
      resetButton = (
        <FormItem>
          <Button type="primary" onClick={this.onReset}>
            Reset
          </Button>
        </FormItem>
      );
      submitButton = (
        <FormItem>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      );
    }

    return (
      <Form onSubmit={this.onSubmit} className="calenderForm">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Week</th>
              <th>
                Mon{" "}
                <FormItem>
                  <input
                    type="label"
                    value={day1}
                    readOnly
                    className="tabledataHandW"
                  />{" "}
                </FormItem>
              </th>
              <th>
                Tue{" "}
                <FormItem>
                  <input
                    type="label"
                    value={day2}
                    readOnly
                    className="tabledataHandW"
                  />
                </FormItem>
              </th>
              <th>
                Wed{" "}
                <FormItem>
                  <input
                    type="label"
                    value={day3}
                    readOnly
                    className="tabledataHandW"
                  />
                </FormItem>
              </th>
              <th>
                Thur{" "}
                <FormItem>
                  <input
                    type="label"
                    value={day4}
                    readOnly
                    className="tabledataHandW"
                  />
                </FormItem>
              </th>
              <th>
                Fri{" "}
                <FormItem>
                  <input
                    type="label"
                    value={day5}
                    readOnly
                    className="tabledataHandW"
                  />
                </FormItem>
              </th>
              <th>
                Sat{" "}
                <FormItem>
                  <input
                    type="label"
                    value={day6}
                    readOnly
                    className="tabledataHandW"
                  />
                </FormItem>
              </th>
              <th>
                Sun{" "}
                <FormItem>
                  <input
                    type="label"
                    value={day7}
                    readOnly
                    className="tabledataHandW"
                  />
                </FormItem>
              </th>
              <th>
                <b>TotalHr</b>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>Hour Claim</b>
              </td>
              <td>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator("monday", {
                    getValueFromEvent: (e) => {
                      const convertedValue = Number(e.currentTarget.value);
                      if (isNaN(convertedValue)) {
                        return Number(this.props.form.getFieldValue("monday"));
                      } else {
                        return convertedValue;
                      }
                    },
                    initialValue: parseInt(mondayWorkHours),

                    rules: [
                      {
                        required: true,
                        message: "Please input your Hours!",
                      },
                      {
                        type: "number",
                        min: 0,
                        max: 24,
                        message: " Input Hours < 24",
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Enter Hr"
                      name="monday"
                      id="hMon"
                      readOnly={dynamicAdmin}
                      className="tabledataHandW"
                      onChange={(e) => this.handlenum1Change(e, day1)}
                    />
                  )}
                </FormItem>
              </td>
              <td>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator("tuesday", {
                    getValueFromEvent: (e) => {
                      const convertedValue = Number(e.currentTarget.value);
                      if (isNaN(convertedValue)) {
                        return Number(this.props.form.getFieldValue("tuesday"));
                      } else {
                        return convertedValue;
                      }
                    },
                    initialValue: parseInt(tuesdayWorkHours),

                    rules: [
                      {
                        required: true,
                        message: "Please input your Hours!",
                      },
                      {
                        type: "number",
                        min: 0,
                        max: 24,
                        message: " Input Hours < 24",
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Enter Hr"
                      name="tuesday"
                      id="hTue"
                      readOnly={dynamicAdmin}
                      className="tabledataHandW"
                      onChange={(e) => this.handlenum1Change(e, day2)}
                    />
                  )}
                </FormItem>
              </td>
              <td>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator("wednesday", {
                    getValueFromEvent: (e) => {
                      const convertedValue = Number(e.currentTarget.value);
                      if (isNaN(convertedValue)) {
                        return Number(
                          this.props.form.getFieldValue("wednesday")
                        );
                      } else {
                        return convertedValue;
                      }
                    },
                    initialValue: parseInt(wednesdayWorkHours),

                    rules: [
                      {
                        required: true,
                        message: "Please input your Hours!",
                      },
                      {
                        type: "number",
                        min: 0,
                        max: 24,
                        message: " Input Hours < 24",
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Enter Hr"
                      name="wednesday"
                      id="hWed"
                      readOnly={dynamicAdmin}
                      className="tabledataHandW"
                      onChange={(e) => this.handlenum1Change(e, day3)}
                    />
                  )}
                </FormItem>
              </td>
              <td>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator("thursday", {
                    getValueFromEvent: (e) => {
                      const convertedValue = Number(e.currentTarget.value);
                      if (isNaN(convertedValue)) {
                        return Number(
                          this.props.form.getFieldValue("thursday")
                        );
                      } else {
                        return convertedValue;
                      }
                    },
                    initialValue: parseInt(thursdayWorkHours),

                    rules: [
                      {
                        required: true,
                        message: "Please input your Hours!",
                      },
                      {
                        type: "number",
                        min: 0,
                        max: 24,
                        message: " Input Hours < 24",
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Enter Hr"
                      name="thursday"
                      id="hThur"
                      readOnly={dynamicAdmin}
                      className="tabledataHandW"
                      onChange={(e) => this.handlenum1Change(e, day4)}
                    />
                  )}
                </FormItem>
              </td>
              <td>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator("friday", {
                    getValueFromEvent: (e) => {
                      const convertedValue = Number(e.currentTarget.value);
                      if (isNaN(convertedValue)) {
                        return Number(this.props.form.getFieldValue("friday"));
                      } else {
                        return convertedValue;
                      }
                    },
                    initialValue: parseInt(fridayWorkHours),

                    rules: [
                      {
                        required: true,
                        message: "Please input your Hours!",
                      },
                      {
                        type: "number",
                        min: 0,
                        max: 24,
                        message: " Input Hours < 24",
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Enter Hr"
                      name="friday"
                      id="hFri"
                      readOnly={dynamicAdmin}
                      className="tabledataHandW"
                      onChange={(e) => this.handlenum1Change(e, day5)}
                    />
                  )}
                </FormItem>
              </td>
              <td>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator("saturday", {
                    getValueFromEvent: (e) => {
                      const convertedValue = Number(e.currentTarget.value);
                      if (isNaN(convertedValue)) {
                        return Number(
                          this.props.form.getFieldValue("saturday")
                        );
                      } else {
                        return convertedValue;
                      }
                    },
                    initialValue: parseInt(saturdayWorkHours),

                    rules: [
                      {
                        required: true,
                        message: "Please input your Hours!",
                      },
                      {
                        type: "number",
                        min: 0,
                        max: 24,
                        message: " Input Hours < 24",
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Enter Hr"
                      name="saturday"
                      id="hSat"
                      readOnly={dynamicAdmin}
                      className="tabledataHandW"
                      onChange={(e) => this.handlenum1Change(e, day6)}
                    />
                  )}
                </FormItem>
              </td>
              <td>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator("sunday", {
                    getValueFromEvent: (e) => {
                      const convertedValue = Number(e.currentTarget.value);
                      if (isNaN(convertedValue)) {
                        return Number(this.props.form.getFieldValue("sunday"));
                      } else {
                        return convertedValue;
                      }
                    },
                    initialValue: parseInt(sundayWorkHours),

                    rules: [
                      {
                        required: true,
                        message: "Please input your Hours!",
                      },
                      {
                        type: "number",
                        min: 0,
                        max: 24,
                        message: " Input Hours < 24",
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Enter Hr"
                      name="sunday"
                      id="hSun"
                      readOnly={dynamicAdmin}
                      className="tabledataHandW"
                      onChange={(e) => this.handlenum1Change(e, day7)}
                    />
                  )}
                </FormItem>
              </td>
              <td>{totalWeekWorkHours}</td>
            </tr>
            <tr>
              <td>
                <b>Time Off</b>
              </td>
              <td>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator("timeOffMonday", {
                    getValueFromEvent: (e) => {
                      const convertedValue = Number(e.currentTarget.value);
                      if (isNaN(convertedValue)) {
                        return Number(
                          this.props.form.getFieldValue("timeOffMonday")
                        );
                      } else {
                        return convertedValue;
                      }
                    },
                    initialValue: parseInt(mondayTimeOfHour),

                    rules: [
                      {
                        required: true,
                        message: "Please input your TimeOff Hours!",
                      },
                      {
                        type: "number",
                        min: 0,
                        max: 24,
                        message: " Input Hours < 24",
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Enter Time Off"
                      name="monday"
                      id="hMon"
                      readOnly={dynamicAdmin}
                      className="tabledataHandW"
                      onChange={this.handlenum2Change}
                    />
                  )}
                </FormItem>
              </td>
              <td>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator("timeOfftuesday", {
                    getValueFromEvent: (e) => {
                      const convertedValue = Number(e.currentTarget.value);
                      if (isNaN(convertedValue)) {
                        return Number(
                          this.props.form.getFieldValue("timeOfftuesday")
                        );
                      } else {
                        return convertedValue;
                      }
                    },
                    initialValue: parseInt(tuesdayTimeOfHour),

                    rules: [
                      {
                        required: true,
                        message: "Please input your TimeOff Hours!",
                      },
                      {
                        type: "number",
                        min: 0,
                        max: 24,
                        message: " Input Hours < 24",
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Enter Time Off"
                      name="tuesday"
                      id="hMon"
                      readOnly={dynamicAdmin}
                      className="tabledataHandW"
                      onChange={this.handlenum2Change}
                    />
                  )}
                </FormItem>
              </td>
              <td>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator("timeOffwednesday", {
                    getValueFromEvent: (e) => {
                      const convertedValue = Number(e.currentTarget.value);
                      if (isNaN(convertedValue)) {
                        return Number(
                          this.props.form.getFieldValue("timeOffwednesday")
                        );
                      } else {
                        return convertedValue;
                      }
                    },
                    initialValue: parseInt(wednesdayTimeOfHour),

                    rules: [
                      {
                        required: true,
                        message: "Please input your TimeOff Hours!",
                      },
                      {
                        type: "number",
                        min: 0,
                        max: 24,
                        message: " Input Hours < 24",
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Enter Time Off"
                      name="wednesday"
                      id="hMon"
                      readOnly={dynamicAdmin}
                      className="tabledataHandW"
                      onChange={this.handlenum2Change}
                    />
                  )}
                </FormItem>
              </td>
              <td>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator("timeOffthursday", {
                    getValueFromEvent: (e) => {
                      const convertedValue = Number(e.currentTarget.value);
                      if (isNaN(convertedValue)) {
                        return Number(
                          this.props.form.getFieldValue("timeOffthursday")
                        );
                      } else {
                        return convertedValue;
                      }
                    },
                    initialValue: parseInt(thursdayTimeOfHour),

                    rules: [
                      {
                        required: true,
                        message: "Please input your TimeOff Hours!",
                      },
                      {
                        type: "number",
                        min: 0,
                        max: 24,
                        message: " Input Hours < 24",
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Enter Time Off"
                      name="thursday"
                      id="hMon"
                      readOnly={dynamicAdmin}
                      className="tabledataHandW"
                      onChange={this.handlenum2Change}
                    />
                  )}
                </FormItem>
              </td>
              <td>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator("timeOfffriday", {
                    getValueFromEvent: (e) => {
                      const convertedValue = Number(e.currentTarget.value);
                      if (isNaN(convertedValue)) {
                        return Number(
                          this.props.form.getFieldValue("timeOfffriday")
                        );
                      } else {
                        return convertedValue;
                      }
                    },
                    initialValue: parseInt(fridayTimeOfHour),

                    rules: [
                      {
                        required: true,
                        message: "Please input your TimeOff Hours!",
                      },
                      {
                        type: "number",
                        min: 0,
                        max: 24,
                        message: " Input Hours < 24",
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Enter Time Off"
                      name="friday"
                      id="hMon"
                      readOnly={dynamicAdmin}
                      className="tabledataHandW"
                      onChange={this.handlenum2Change}
                    />
                  )}
                </FormItem>
              </td>
              <td>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator("timeOffsaturday", {
                    getValueFromEvent: (e) => {
                      const convertedValue = Number(e.currentTarget.value);
                      if (isNaN(convertedValue)) {
                        return Number(
                          this.props.form.getFieldValue("timeOffsaturday")
                        );
                      } else {
                        return convertedValue;
                      }
                    },
                    initialValue: parseInt(saturdayTimeOfHour),

                    rules: [
                      {
                        required: true,
                        message: "Please input your TimeOff Hours!",
                      },
                      {
                        type: "number",
                        min: 0,
                        max: 24,
                        message: " Input Hours < 24",
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Enter Time Off"
                      name="saturday"
                      id="hMon"
                      readOnly={dynamicAdmin}
                      className="tabledataHandW"
                      onChange={this.handlenum2Change}
                    />
                  )}
                </FormItem>
              </td>
              <td>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator("timeOffsunday", {
                    getValueFromEvent: (e) => {
                      const convertedValue = Number(e.currentTarget.value);
                      if (isNaN(convertedValue)) {
                        return Number(
                          this.props.form.getFieldValue("timeOffsunday")
                        );
                      } else {
                        return convertedValue;
                      }
                    },
                    initialValue: parseInt(sundayTimeOfHour),

                    rules: [
                      {
                        required: true,
                        message: "Please input your TimeOff Hours!",
                      },
                      {
                        type: "number",
                        min: 0,
                        max: 24,
                        message: " Input Hours < 24",
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Enter Time Off"
                      name="sunday"
                      id="hMon"
                      readOnly={dynamicAdmin}
                      className="tabledataHandW"
                      onChange={this.handlenum2Change}
                    />
                  )}
                </FormItem>
              </td>
              <td>{totalWeekTimeoffHours}</td>
            </tr>
            <tr>
              <td>
                <b>Total Bill</b>
              </td>
              <td> {mondayBillableHours} </td>
              <td> {tuesdayBillableHours} </td>
              <td> {wednesdayBillableHours} </td>
              <td> {thursdayBillableHours} </td>
              <td> {fridayBillableHours} </td>
              <td> {saturdayBillableHours} </td>
              <td> {sundayBillableHours} </td>
              <td> {totalWeekBillableHours} </td>
            </tr>
            <tr>
              <td>
                <b>Total Hours</b>
              </td>
              <td> {mondayTotalHours} </td>
              <td> {tuesdayTotalHours} </td>
              <td> {wednesdayTotalHours} </td>
              <td> {thursdayTotalHours} </td>
              <td> {fridayTotalHours} </td>
              <td> {saturdayTotalHours} </td>
              <td> {sundayTotalHours} </td>
              <td> {totalWeekHours} </td>
            </tr>
            <tr>
              <td />
            </tr>
            <tr>
              <td>Notes</td>
              <td width="400" colSpan="10">
                {workingDetailsComments}
              </td>
            </tr>
            <tr>
              <td colSpan="3" />
              <td> {saveButton} </td>
              <td> {submitButton} </td>
              <td> {resetButton} </td>
              <td> {submitAndApproveButton} </td>
              <td> {approveButton} </td>
              <td> {rejectButton} </td>
            </tr>
          </tbody>
        </table>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    timesheet: state.timesheet,
    isAdmin: state.auth.user.role,
  };
}
const WrappedRegistrationForm = Form.create()(timesheet);

export default connect(mapStateToProps)(WrappedRegistrationForm);

//export default timesheet;
