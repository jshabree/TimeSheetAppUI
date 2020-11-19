import React, { Component } from "react";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import {
  Collapse,
  Button,
  Tabs,
  Layout,
  Input,
  TextArea,
  List,
  Divider,
  Row,
  Col,
  Menu,
  Card,
  Modal,
  Space,
} from "antd";
import moment from "moment";
import "./ProjectDetails.scss";
import { listProjectDetails } from "../../redux/actions/ProjectDetails";
import { withNamespaces } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  deleteProject,
  deleteProjectSucess,
} from "../../redux/actions/ProjectDetails";
const Search = Input.Search;

class list extends Component {
  state = {
    projList: [],
    empList: [],
    searchedProjects: [],
  };
  componentDidMount() {
    //     this.setState({ this.props.products: Array.from(this.props.empList) })
    this.props.dispatch(listProjectDetails());
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.projList !== prevState.projList) {
      if (newProps.projList === undefined) {
        return { projList: [] };
      } else {
        return {
          projList: newProps.projList,
          searchedProjects: newProps.projList,
        };
      }
    }
    if (newProps.empList !== prevState.empList) {
      if (newProps.empList === undefined) {
        return { empList: [] };
      } else {
        return { empList: newProps.empList };
      }
    } else return null;
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.projList !== prevProps.projList) {
      if (this.props.projList === undefined) {
        this.setState({ projList: [], searchedProjects: [] });
      } else {
        this.setState({
          projList: this.props.projList,
          searchedProjects: this.props.projList,
        });
      }
    }
  }
  handleDelete(proj) {
    this.props.dispatch(deleteProject(proj._id));
    console.log("DEL" + proj._id);
  }
  handleEdit(proj) {
    console.log("Edit Click");
    this.props.handleEdit(proj);
  }
  info = (item) => {
    console.log(item);
    let empList = this.state.empList.reduce((acc, cv) => {
      if (item.listOfEmployees.indexOf(cv._id) !== -1) acc.push(cv);
      return acc;
    }, []);
    const empNames = empList.map(
      (item) => `${item.firstName} ${item.lastName}`
    );
    console.log("empList", empNames);
    Modal.info({
      // title: `${item.clientProjectId} ${item.clientProjectName} Details`,
      title: ``,
      content: (
        <div>
          <p>
            <b>Project ID:</b> {item.clientProjectId}
          </p>
          <p>
            <b>Project Name:</b> {item.clientProjectName}
          </p>
          <p>
            <b>Client ID:</b> {item.clientId}
          </p>
          <p>
            <b>Client Name:</b> {item.clientName}
          </p>
          <p>
            <b>List of employees:</b>
            {empNames}
          </p>
          <p>
            <b>Timesheet Start date:</b>
            {moment(item.startDate).format("MMMM Do YYYY")}
          </p>
          <p>
            <b>Timesheet End date:</b>
            {moment(item.endDate).format("MMMM Do YYYY")}
          </p>
          <p>
            <b>Freeze date:</b>{" "}
            {moment(item.activeTimeSheetFreezeDate).format("MMMM Do YYYY")}
          </p>
          <p>
            <b>Notes: </b>
            {item.notes}
          </p>
        </div>
      ),
      onOk() {},
    });
  };

  onSearchProject = (value) => {
    let filteredValue = this.state.projList.filter(
      (item) => item.clientProjectName.toLowerCase().includes(value) === true
    );
    this.setState({ searchedProjects: filteredValue });
  };

  render() {
    //const data = Array.from(this.props.projList);
    const data = Array.from(this.state.projList);
    console.log("data in render", data);
    const filteredData = Array.from(this.state.searchedProjects);
    // const data = ['ads', 'dda']
    const { t } = this.props;

    return (
      <div>
        <Row>
          <Card className="fullWidth">
            <Search
              placeholder="Search project"
              onSearch={(value) => this.onSearchProject(value)}
            />
            <List
              className="Projectlist"
              pagination="true"
              size="large"
              header={
                <div>
                  <b>{t("List of Project")}</b>
                </div>
              }
              bordered
              dataSource={filteredData}
              renderItem={(item) => (
                <Row>
                  <List.Item className="fullWidth">
                    <Col span={10}>
                      <u
                        onClick={() => this.info(item)}
                        onKeyDown={() => this.info(item)}
                        role="link"
                        tabIndex="0"
                      >
                        {item.clientProjectName}
                      </u>
                    </Col>
                    <Col span={14}>
                      <DeleteOutlined
                        className="iconsPS"
                        onClick={() => this.handleDelete(item)}
                      />
                      <EditOutlined
                        className="iconsPS"
                        onClick={() => this.handleEdit(item)}
                      />
                    </Col>
                  </List.Item>
                </Row>
              )}
            />
          </Card>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(
    "receiving the props in mapStatetoProps",
    state.projectDetails.result
  );
  return {
    projList: state.projectDetails.result,
    empList: state.empList.result,
  };
};
export default compose(withNamespaces(), connect(mapStateToProps))(list);
