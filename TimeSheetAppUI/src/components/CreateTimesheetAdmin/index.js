import React, { useState, useEffect } from "react";
import { Button, Layout, Row, Col, DatePicker, Card, Select, Tag } from "antd";
import TimeSheet from "../TimeSheet/index";
import { useSelector, useDispatch } from "react-redux";
import HeaderHome from "../HeaderNav/HeaderHome";
import { Form } from "@ant-design/compatible";
import Moment from "react-moment";
import { Checkbox } from "antd";
import moment from "moment";
import { createRequestSubmit } from "../../redux/actions/CreateNewRequest";
import { listProjectDetails } from "../../redux/actions/ProjectDetails";
import CheckedListComp from "./checkedlist";
// import { useHistory } from "react-router";

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
export default function index(props) {
  const empList = useSelector((state) => state.empList.result);
  const projList = useSelector((state) => state.projectDetails.result);
  const [TimesheetEmployeeList, setTimesheetEmployeeList] = useState([]);
  const [empListforSubmission, setempListforSubmission] = useState([]);
  const [
    projectEmpListforSubmission,
    setprojectEmpListforSubmission,
  ] = useState([]);
  const [viewTimesheet, setviewTimesheet] = useState(false);
  const [TimeSheetDetails, setTimeSheetDetails] = useState({});

  const [plainOptions, setplainOptions] = useState([]);
  const [checkedList, setcheckedList] = useState([]);
  const [indeterminate, setindeterminate] = useState(true);
  const [checkAll, setcheckAll] = useState(false);
  // const history = useHistory();

  let displayemployeeList = [],
    displayprojectList = [];
  const [show, setshow] = useState(false);
  const key = "TimesheetAdmin";
  const CheckboxGroup = Checkbox.Group;
  const dispatch = useDispatch();

  const { Option } = Select;
  const FormItem = Form.Item;
  const { WeekPicker } = DatePicker;
  const MomentTag = Moment;
  const { Content } = Layout;

  useEffect(() => {
    dispatch(listProjectDetails());
  }, []);

  projList.map((item) =>
    displayprojectList.push(
      <Option key={item.clientProjectId + " " + item.clientProjectName}>
        {item.clientProjectId + " " + item.clientProjectName}
      </Option>
    )
  );

  empList.map((item) =>
    displayemployeeList.push(
      <Option
        key={item.employeeId + " " + item.firstName + " " + item.lastName}
      >
        {item.employeeId + " " + item.firstName + " " + item.lastName}
      </Option>
    )
  );

  let handleChangeEMPLIST = (value) => {
    let arr = value.map((item) => {
      let p = item.split(" ");
      return p[0];
    });
    setempListforSubmission(arr);
    // let values = Array.from(new Set([...TimesheetEmployeeList, ...arr]));
    // setTimesheetEmployeeList(values);
  };

  let handleChangeProjectEMPLIST = (value) => {
    let arr = value.map((item) => {
      let p = item.split(" ");
      let project = {};
      project.projectId = Number(p[0]);
      project.projectName = p[1];
      return project;
    });

    let z = arr.reduce((acc, cv) => {
      let records = findProject(cv);
      acc.push(...records[0].listOfEmployees);
      return acc;
    }, []);
    setprojectEmpListforSubmission(z);

    // let values = Array.from(new Set([...TimesheetEmployeeList, ...z]));
    // setTimesheetEmployeeList(values);
  };

  let findProject = (item) => {
    return projList.filter(
      (record) =>
        record.clientProjectId === item.projectId &&
        record.clientProjectName === item.projectName
    );
  };

  let submitTimeSheet = () => {
    let values = Array.from(
      new Set([...projectEmpListforSubmission, ...empListforSubmission])
    );
    console.log("this is values", values);

    setshow(true);
    setTimesheetEmployeeList(values);
    setcheckedList(values);
    setplainOptions(values);
  };

  let onSubmit = () => {
    setviewTimesheet(true);
  };
  let onSelectWeekChange = (e, date) => {
    console.log("select week change", e);
    console.log("date" + date);
    console.log("TimeSheetDetails", TimeSheetDetails);
    let TimeSheetDetailss = TimeSheetDetails;
    console.log(moment(e).valueOf());
    TimeSheetDetailss.selectWeek = moment(e).valueOf();
    console.log("select week", TimeSheetDetailss.selectWeek);
    setTimeSheetDetails(TimeSheetDetailss);
  };

  let saveTimesheet = (data) => {
    data.employeeID = checkedList;
    data.status = "pending";
    console.log("data in save timesheet", data);
    // data.projectId = this.props.ProjectDetails.projectId;
    // data.listOfEmployees = this.state.UserDetails.email;
    dispatch(createRequestSubmit(data));
    props.history.push("/home");
  };

  let onCheckAllChange = (e) => {
    setcheckedList(e.target.checked ? plainOptions : []);
    setindeterminate(false);
    setcheckAll(e.target.checked);
  };

  let onChange = (checkedListd) => {
    let changedVal = checkedListd;
    console.log("checkedList", checkedListd);
    setcheckedList(checkedListd);
    setindeterminate(
      !!checkedListd.length && checkedListd.length < plainOptions.length
    );
    setcheckAll(checkedListd.length === plainOptions.length);
  };

  console.log("TimesheetEmployeeList", TimesheetEmployeeList);
  console.log("checkedListd", checkedList);

  return (
    <div>
      <Layout>
        <HeaderHome current={key} />
        <Content className="content">
          <Form layout="inline">
            <Card>
              <Row gutter={24}>
                <Col span={14}>
                  <label>
                    {" "}
                    EMPLOYEES:
                    <Select
                      mode="multiple"
                      style={{ width: "80%", display: "block", margin: "5px" }}
                      placeholder="Select Employees"
                      onChange={handleChangeEMPLIST}
                    >
                      {displayemployeeList}
                    </Select>
                  </label>
                  <label>
                    {" "}
                    PROJECTS:
                    <Select
                      mode="multiple"
                      style={{ width: "80%", display: "block", margin: "5px" }}
                      placeholder="Select projects"
                      onChange={handleChangeProjectEMPLIST}
                    >
                      {displayprojectList}
                    </Select>
                  </label>
                  <Button onClick={submitTimeSheet}>View List</Button>
                </Col>
                <Col span={10}>
                  <label>
                    {" "}
                    List of Employees recives the Tmesheet:
                    {show ? (
                      // <CheckedListComp
                      //   TimesheetEmployeeList={TimesheetEmployeeList}
                      //   checkedList={oncheckedList}
                      // />

                      <div>
                        <div className="site-checkbox-all-wrapper">
                          <Checkbox
                            indeterminate={indeterminate}
                            onChange={onCheckAllChange}
                            checked={checkAll}
                          >
                            Check all
                          </Checkbox>
                        </div>
                        <br />
                        <CheckboxGroup
                          options={plainOptions}
                          value={checkedList}
                          onChange={onChange}
                        />
                      </div>
                    ) : null}
                  </label>
                </Col>
                <Row>
                  <Col>
                    <Card>
                      Select start date of the week
                      <FormItem {...formItemLayout}>
                        {
                          <WeekPicker
                            className="displayBlock"
                            onChange={onSelectWeekChange}
                            placeholder="Select week"
                          />
                        }
                      </FormItem>
                      <Button
                        type="primary"
                        onClick={onSubmit}
                        className="displayBlock"
                      >
                        Submit
                      </Button>
                    </Card>
                  </Col>
                </Row>
              </Row>
            </Card>
          </Form>

          <div>
            {viewTimesheet && (
              <TimeSheet
                TimeSheetDetails={TimeSheetDetails}
                TimeSheetDataAdmin={saveTimesheet}
              />
            )}
          </div>
        </Content>
      </Layout>
    </div>
  );
}
