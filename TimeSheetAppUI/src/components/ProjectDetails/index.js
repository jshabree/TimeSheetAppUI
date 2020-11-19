import React, { Component } from "react";
import { CopyrightOutlined } from "@ant-design/icons";
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
  Switch,
} from "antd";
import { connect } from "react-redux";
import "./ProjectDetails.scss";
import { isThisTypeNode } from "typescript";
import { listClientDetails } from "../../redux/actions/ClientDetails";
import { AutoComplete } from "antd";
import HeaderHome from "../HeaderNav/HeaderHome";
import { createProjcetDetailsSubmit } from "../../redux/actions/ProjectDetails";
import Projectlist from "../ProjectDetails/list";
// import { useTranslation } from "react-i18next";
import { withNamespaces } from "react-i18next";
import { compose } from "redux";
import EmpModal from "../Search";
const { Header, Sider, Content, Footer } = Layout;
const { RangePicker } = DatePicker;

const { Panel } = Collapse;
const Options = AutoComplete.Option;
// const { t } = useTranslation();
const { Option } = Select;

class projectDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "project",
      projectDetails: {
        createdById: "",
        clientProjectId: "",
        clientProjectName: "",
        vendorId: "",
        vendorName: "",
        clientId: "",
        clientName: "",
        startDate: "",
        endDate: "",
        notes: "",
        activeTimesheetStartDate: "",
        activeTimesheetEndDate: "",
        activeTimesheetFreezeDate: "",
        isActiveTimesheet: true,
        listOfEmployees: [],
      },
      empList: [],
      clientList: {},
      isAdmin: false,
    };

    console.log(this.props);
  }

  componentDidMount() {
    this.props.dispatch(listClientDetails());
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.user.role === 1) state.isAdmin = true;
    if (nextProps.clientList !== state.clientList) {
      if (nextProps.clientList === undefined) {
        return { clientList: [] };
      } else {
        return { clientList: nextProps.clientList };
      }
    }
    if (nextProps.empList !== state.empList) {
      if (nextProps.empList === undefined) {
        return { empList: [] };
      } else {
        return { empList: nextProps.empList };
      }
    }
  }

  onChange = (e) => {
    let projectDetails = Object.assign({}, this.state.projectDetails);
    projectDetails[e.target.name] = e.target.value;
    return this.setState({ projectDetails });
  };
  onChangeId = (e) => {
    let projectDetails = Object.assign({}, this.state.projectDetails);
    projectDetails[e.target.name] = Number(e.target.value);
    return this.setState({ projectDetails });
  };

  onChangeRangePicker = (e, date) => {
    let projectDetails = Object.assign({}, this.state.projectDetails);
    projectDetails["startDate"] = date[0];
    projectDetails["endDate"] = date[1];
    return this.setState({ projectDetails });
  };

  onChangeActiveRangePicker = (e, date) => {
    let projectDetails = Object.assign({}, this.state.projectDetails);
    projectDetails["activeTimesheetStartDate"] = date[0];
    projectDetails["activeTimesheetEndDate"] = date[1];
    //   console.log(projectDetails["projectStartDate"]);

    return this.setState({ projectDetails });
  };

  onChangeFreezeDatePicker = (e, date) => {
    let projectDetails = Object.assign({}, this.state.projectDetails);
    projectDetails["activeTimesheetFreezeDate"] = date;
    return this.setState({ projectDetails });
  };

  onChanegeActivetimeSheet = (checked) => {
    let projectDetails = Object.assign({}, this.state.projectDetails);
    projectDetails["isActiveTimesheet"] = checked;

    return this.setState({ projectDetails });
  };

  getSelectedEmployees = (empData) => {
    // console.log(empData);
    let projectDetails = Object.assign({}, this.state.projectDetails);
    projectDetails.listOfEmployees = empData;
    this.setState({ projectDetails });
    // this.state.projectDetails.listOfEmployees = [];
    // empData.map(data => {
    // console.log(data);
    // if(data.check){
    // let empDetails = {};
    // empDetails.employeeId = data.employeeId;
    // empDetails.employeeName = data.employeeName;
    // empDetails.isTimesheetActive = true;
    // this.state.projectDetails.listOfEmployees.push(data);
    // }
    // });
    console.log(projectDetails);
  };

  handleEdit = (proj) => {
    this.props.history.push({
      pathname: "/Project/" + proj._id,
      state: { proj: proj },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {};
        data.projectDetails = this.state.projectDetails;
        data.projectDetails.createdById = this.props.user.userId;
        console.log("Submit Details" + JSON.stringify(data));
        this.props.dispatch(createProjcetDetailsSubmit(data));

        return this.setState({ projectDetails });
      }
    });
    this.onClear();
  };

  onClear = () => {
    this.setState({
      projectDetails: {
        createdById: "",
        clientProjectId: "",
        clientProjectName: "",
        vendorId: "",
        vendorName: "",
        clientId: "",
        clientName: "",
        startDate: "",
        endDate: "",
        notes: "",
        activeTimesheetStartDate: "",
        activeTimesheetEndDate: "",
        activeTimesheetFreezeDate: "",
        isActiveTimesheet: true,
        listOfEmployees: [],
      },
    });
  };
  handleChangeEMPLIST = (value) => {
    let arr = value.map((item) => {
      let p = item.split(" ");
      return p[0];
    });
    let projectDetails = this.state.projectDetails;
    projectDetails.listOfEmployees = arr;
    this.setState({ projectDetails });
  };

  onChangeClient = (value) => {
    console.log(`selected employee ${value}`);
    console.log(typeof value);
    let projectDetails = this.state.projectDetails;

    projectDetails.clientId = value.substring(0, value.indexOf(" "));
    projectDetails.clientName = value.substring(value.indexOf(" ") + 1);
    this.setState({ projectDetails });
  };

  render() {
    console.log("state in render", this.state.projectDetails);
    let projectDetails = this.state.projectDetails;
    const { t } = this.props;
    const { TextArea } = Input;
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
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

    const clientLists = this.state.clientList.map((item) => {
      return { value: item.clientId + " " + item.companyName };
    });

    let children = [];
    this.state.empList.map((item) =>
      children.push(
        <Option key={item._id + " " + item.firstName + " " + item.lastName}>
          {item._id + " " + item.firstName + " " + item.lastName}
        </Option>
      )
    );

    return (
      <div>
        <Layout>
          <HeaderHome />
          <Content className="content">
            <Row gutter={24} className="contentd">
              <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                <Collapse defaultActiveKey={["1"]} onChange={true}>
                  <Panel header={t("Project Details")} key="1">
                    <Row gutter={24}>
                      <Col span={12}>
                        <label for="clientProjectId">{t("PROJECT ID")}:</label>
                        <FormItem {...formItemLayout}>
                          {getFieldDecorator("clientProjectId", {
                            initialValue: projectDetails.clientProjectId,
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
                              placeholder="Enter Project ID"
                              value={projectDetails.clientProjectId}
                              onChange={this.onChangeId}
                            />
                          )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <label for="clientProjectName">
                          {t("PROJECT NAME")}:
                        </label>
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
                              value={projectDetails.clientProjectName}
                              onChange={this.onChange}
                              placeholder="Enter Project Name"
                            />
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                  </Panel>
                  <Panel header={t("Client and Employees Details")} key="2">
                    <Row gutter={24}>
                      <Col span={12}>
                        <label>{t("CLIENT")}:</label>
                        <AutoComplete
                          className="fullWidth"
                          options={clientLists}
                          onChange={this.onChangeClient}
                          placeholder="Select Client"
                          filterOption={(inputValue, option) =>
                            option.value.indexOf(inputValue) !== -1
                          }
                        />
                      </Col>
                      <Col span={12}>
                        <label> {t("EMPLOYEES")}:</label>
                        <Select
                          mode="multiple"
                          className="fullWidth"
                          placeholder="Select Employees"
                          onChange={this.handleChangeEMPLIST}
                        >
                          {children}
                        </Select>
                      </Col>
                    </Row>
                  </Panel>
                  {/** 
                  <Panel header="Vendor Details" key="3">
                    <div>
                      <Row gutter={24}>
                        <Col span={12}>
                          <label>VENDOR ID:</label>
                          <FormItem {...formItemLayout}>
                            {getFieldDecorator("vendorId", {
                              rules: [
                                {
                                  required: true,
                                  message: "Please input Vendor Id!",
                                },
                              ],
                            })(
                              <Input
                                type="text"
                                size="default"
                                name="vendorId"
                                onChange={this.onChangeId}
                                placeholder="Enter Vendor Id"
                              />
                            )}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <label>VENDOR NAME:</label>
                          <FormItem {...formItemLayout}>
                            {getFieldDecorator("vendorName", {
                              rules: [
                                {
                                  required: true,
                                  message: "Please input Vendor Name!",
                                },
                              ],
                            })(
                              <Input
                                type="text"
                                size="default"
                                name="vendorName"
                                onChange={this.onChange}
                                placeholder="Enter Vendor Name"
                              />
                            )}
                          </FormItem>
                        </Col>
                      </Row>
                    </div>
                  </Panel>
                 */}
                  <Panel header={t("TimeSheet")} key="4">
                    <div>
                      <Row>
                        <Col span={12}>
                          <label for="projectRangePicker">
                            {t("PROJECT")}:
                          </label>
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
                        </Col>
                        {/**  // <label>ACTIVE PROJECT:</label>
                        // <Col span={12}>
                        //   <FormItem {...formItemLayout}>
                        //     {getFieldDecorator("activeProjectRangePicker", {
                        //       rules: [
                        //         {
                        //           required: true,
                        //           message:
                        //             "Please Select Active Project Dates!",
                        //         },
                        //       ],
                        //     })(
                        //       <RangePicker
                        //         name="activeProjectRangePicker"
                        //         format="YYYY-MM-DD"
                        //         placeholder={["Start Time", "End Time"]}
                        //         onChange={this.onChangeActiveRangePicker}
                        //         onOk={this.onChangeActiveRanePickerSubmit}
                        //       />
                        //     )}
                        //   </FormItem>
                        // </Col>*/}
                        <Col span={12}>
                          <label for="freezeDate">{t("FREEZE DATE")}:</label>
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
                        </Col>
                        <Col span={12}>
                          <label>{t("ACTIVE TIMESHEET")}:</label>
                          <FormItem className="displayInline">
                            <Switch
                              defaultChecked
                              onChange={this.onChanegeActivetimeSheet}
                            />
                          </FormItem>
                        </Col>
                      </Row>
                    </div>
                  </Panel>
                </Collapse>
                <Row type="flex" justify="start">
                  <Col span={24}>
                    <Card>
                      <div>
                        <label for="notes" className="displayBlock">
                          {t("Notes")}:
                        </label>
                        <TextArea
                          rows={3}
                          name="notes"
                          onChange={this.onChange}
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Row type="flex" justify="center">
                  <Button
                    type="primary"
                    onClick={this.onClear}
                    className="buttonStyle"
                  >
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.onSubmit}
                    className="buttonStyle"
                  >
                    Add Project
                  </Button>
                </Row>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Projectlist handleEdit={this.handleEdit} />
              </Col>
            </Row>
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
  console.log("Project" + JSON.stringify(state.projcetDetails));
  return {
    projcetDetails: state.projectDetails,
    user: state.auth.user,
    clientList: state.clientDetails.result,
    empList: state.empList.result,
  };
}

const WrappedRegistrationForm = Form.create()(projectDetails);

export default compose(
  withNamespaces(),
  connect(mapStateToProps)
)(WrappedRegistrationForm);
