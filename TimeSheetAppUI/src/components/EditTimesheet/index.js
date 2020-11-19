import React, { Component } from "react";
import { UploadOutlined } from "@ant-design/icons";
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
import InlineError from "../messages/InlineError";
import {
  updateTimesheet,
  assignedProject,
  editTimesheet,
  fileUploadData,
} from "../../redux/actions/CreateNewRequest";
import { connect } from "react-redux";
import TimeSheet from "../TimeSheet/index";
import { getEmployeeByEmail } from "../../redux/actions/Get_List";
import HeaderHome from "../HeaderNav/HeaderHome";
// const { TextArea } = Input;
// const Option = Select.Option;
const { Header, Content } = Layout;
// const Panel = Collapse.Panel;
const FormItem = Form.Item;
const MomentTag = Moment;

class EditTimesheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewTimesheet: false,
      error: "",
      current: "timesheet",
      employeeDetails: {
        //  reqId: moment().valueOf(),
        // selectWeek: null,
        // jobTitle: "Full Stack",
        // endClient: "N/A",
        // client: "Inhouse",
        // approverName: "Amar Shah",
        // startDate: "12/31/2018",
        // projectName: "Test",
        // employeeID: "1",
      },
      TimeSheetDetails: {},
      ProjectDetails: {},
      timesheetData: {},
      isAdmin: false,
      UserDetails: this.props.UserDetails,
      selectedFile: null,
      errors: {},
    };
  }

  componentDidMount() {
    // console.log(this.props.match.params);
    // let TimeSheetDetails = Object.assign(
    //   {},
    //   this.state.TimeSheetDetails,
    //   this.props.TimeSheetDetails
    // );
    this.setState({ TimeSheetDetails: this.props.TimeSheetDetails });
    this.props.dispatch(getEmployeeByEmail(this.state.UserDetails.employeeId));

    // // this.props.dispatch(assignedProject(TimeSheetDetails.employeeId));
    // this.props.dispatch(editTimesheet(this.props.match.params.id));
    // setTimeout(() => {
    //   this.props.dispatch(
    //     assignedProject(this.props.TimeSheetDetails.employeeId)
    //   );
    // }, 1000);
    // console.log(this.props.timesheetData.employeeId);
    // if (this.props.timesheetData.employeeId) {
    //   this.props.dispatch(getEmployeeById(this.props.timesheetData.employeeId));
    // }
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.TimeSheetDetails !== state.TimeSheetDetails &&
      props.EmployeeDetails !== state.employeeDetails
    ) {
      return {
        TimeSheetDetails: props.TimeSheetDetails,
        employeeDetails: props.EmployeeDetails,
      };
    }
    if (props.TimeSheetDetails !== state.TimeSheetDetails) {
      return {
        TimeSheetDetails: props.TimeSheetDetails,
      };
    }
    if (props.EmployeeDetails !== state.employeeDetails) {
      if (props.EmployeeDetails === undefined) {
        return { employeeDetails: {} };
      } else {
        return { employeeDetails: props.EmployeeDetails };
      }
    } else return null;
    // if( props.employeeDetails !== state.employeeDetails){
    //   return {employeeDetails: props.employeeDetails}
    // }
  }

  // componentWillReceiveProps(props) {
  //   // console.log("Edit timesheet");
  //   // if (props.TimeSheetDetails.role === 1) this.setState({ isAdmin: true });
  //   this.setState({
  //     // ProjectDetails: props.ProjectDetails,
  //     TimeSheetDetails: props.TimeSheetDetails,
  //     timesheetData: props.timesheetData,
  //   });
  // }

  handleClick = (e) => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  onDropdownChange = (e, i) => {
    console.log("DDL" + e);
    let employeeDetails = Object.assign({}, this.state.employeeDetails);
    employeeDetails.jobTitle = e;
    return this.setState({ employeeDetails });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.setState({ viewTimesheet: !this.state.viewTimesheet });
        let data = {};
        data.TimeSheetDetails = this.state.TimeSheetDetails;
        // data.TimeSheetDetails.employeeId = Math.floor((Math.random() * 100) + 1);
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
    let timestamp = moment(e).valueOf();
    console.log(timestamp);
    console.log(moment(timestamp));
    console.log("date" + date);
    let TimeSheetDetails = Object.assign({}, this.state.TimeSheetDetails);
    TimeSheetDetails["selectWeek"] = moment(e).valueOf();
    return this.setState({ TimeSheetDetails });
  };

  saveTimesheet = (data) => {
    // let newData = Object.assign({}, this.props.timesheetData);
    // newData = Object.assign(newData, data);
    // console.log(newData);
    // const filedata = new FormData();
    // filedata.append("file", this.state.selectedFile);
    // filedata.append("data", data);
    const errors = this.validate(this.state);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      data.file = this.state.selectedFile;
      data.status = "submitted";
      this.props.dispatch(updateTimesheet(data));
      this.props.history.push("/home");
    }
  };

  onChangeHandler = (event) => {
    let filesArray = [];

    for (var i = 0; i < event.target.files.length; i++) {
      filesArray.push(event.target.files[i]);
    }
    this.setState({
      selectedFile: filesArray,
      loaded: 0,
    });
  };

  onClickHandler = () => {
    // dbx
    //   .filesListFolder({ path: resp.id })
    //   .then(function(response) {
    //     console.log(response.entries);
    //   })
    //   .catch(function(error) {
    //     console.error(error);
    //   });
    //Download not working
    // dbx
    //       .filesDownload({ path: resp.id })
    //       .then(function(response) {
    //         console.log("download", response);
    //       })
    //       .catch(function(error) {
    //         console.error(error);
    //       });
  };

  onFileClick = () => {
    // var ACCESS_TOKEN = document.getElementById("access-token").value;
    // var SHARED_LINK = document.getElementById("shared-link").value;
    // var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });
    // dbx
    //   .sharingGetSharedLinkFile({ url: SHARED_LINK })
    //   .then(function(data) {
    //     var downloadUrl = URL.createObjectURL(data.fileBlob);
    //     var downloadButton = document.createElement("a");
    //     downloadButton.setAttribute("href", downloadUrl);
    //     downloadButton.setAttribute("download", data.name);
    //     downloadButton.setAttribute("class", "button");
    //     downloadButton.innerText = "Download: " + data.name;
    //     document.getElementById("results").appendChild(downloadButton);
    //   })
    //   .catch(function(error) {
    //     console.error(error);
    //   });
    // return false;
    // https://api.dropboxapi.com/2/file_requests/get
  };

  validate = (data) => {
    const errors = {};
    if (!data.selectedFile) errors.selectedFile = "Please select the file";
    return errors;
  };
  render() {
    const { errors } = this.state;
    const { WeekPicker } = DatePicker;
    const { getFieldDecorator } = this.props.form;
    let { employeeDetails, ProjectDetails } = this.state;
    let TimeSheetDetails = this.state.TimeSheetDetails[0];
    let selectWeek = TimeSheetDetails.selectWeek;
    console.log("selectWeek", selectWeek);
    // let TimesheetData = this.state.TimeSheetDetails[0];
    // console.log(TimesheetData);
    // const data = {
    //   // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    //   onChange: this.handleChange,
    //   multiple: true,
    // };
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
    // console.log(moment(1553422522167).utc().format('ll'));
    // console.log(moment(1553422522167).utc().isoWeek());
    // const weekpicker = DatePicker.WeekPicker;

    return (
      <div>
        <Layout>
          <HeaderHome />
          <Content className="content">
            <Form layout="inline">
              <Row>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Card>
                    <p>
                      {" "}
                      <h3 className="displayInline">END CLIENT: </h3>
                      {employeeDetails.endClient}
                    </p>
                  </Card>
                </Col>

                <Col xxs={6} sm={6} md={6} lg={6} xl={6}>
                  <Card>
                    <p>
                      {" "}
                      <h3 className="displayInline"> APPROVER(S): </h3>
                      {employeeDetails.approverName}
                    </p>
                  </Card>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Card>
                    <p>
                      <h3 className="displayInline"> JOB START DATE: </h3>
                      <MomentTag format="MM/DD/YYYY">
                        {employeeDetails.startDate}
                      </MomentTag>
                    </p>
                  </Card>
                </Col>

                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Card>
                    <p>
                      {" "}
                      <h3 className="displayInline"> PROJECT: </h3>
                      {employeeDetails.projectName}
                    </p>
                  </Card>
                </Col>

                {/*<Col xs={12} sm={12} md={12} lg={12} xl={12}>
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
                                        </FormItem>Assigned Project */}

                {/* <div>{ProjectDetails.clientProjectName}</div>
                  </Card>
                </Col>
*/}
                <Col span={12}>
                  <Card>
                    <Form.Item error={!!errors.selectedFile}>
                      <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={this.onChangeHandler}
                        multiple
                      />
                      {errors.selectedFile && (
                        <InlineError text={errors.selectedFile} />
                      )}
                    </Form.Item>

                    {
                      //<button
                      //type="button"
                      //class="btn btn-success btn-block"
                      //onClick={this.onClickHandler}
                      // >
                      // Upload
                      //</button>
                    }
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <h3 className="displayInline"> Selected Week </h3>
                    <FormItem {...formItemLayout}>
                      {getFieldDecorator("testNumber", {
                        initialValue:
                          Object.keys(TimeSheetDetails).length > 0
                            ? moment(Number.parseInt(selectWeek))
                            : moment(),
                        rules: [
                          {
                            required: true,
                            message: "Please Select Week!",
                          },
                        ],
                      })(
                        <WeekPicker
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
              {Object.keys(TimeSheetDetails).length > 0 && (
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

const mapStateToProps = (state) => {
  console.log(state);
  // let TimeSheetDetails;
  // if (state.auth.user.role === 1) {
  //   TimeSheetDetails = state.empList.result;
  // } else if (state.auth.user.role === 5) {
  //   TimeSheetDetails = state.auth.user;
  // }
  return {
    TimeSheetDetails: state.timesheet.result,
    // ProjectDetails: state.projectDetails.result,
    // employeeDetails: state.empList.result,
    timesheetData: state.timesheet.result,
    UserDetails: state.auth.user,
    EmployeeDetails: state.empList.currentEmployee,
  };
};
const WrappedRegistrationForm = Form.create()(EditTimesheet);

export default connect(mapStateToProps)(WrappedRegistrationForm);
