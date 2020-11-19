import React, { Component } from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
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
  Modal,
  Menu,
  Card,
} from "antd";
import { listClientDetails } from "../../redux/actions/ClientDetails";
import { connect } from "react-redux";
import {
  deleteClient,
  deleteClientSucess,
} from "../../redux/actions/ClientDetails";
import { withNamespaces } from "react-i18next";
import { compose } from "redux";

const Search = Input.Search;

class list extends Component {
  state = {
    clientList: [],
  };
  componentDidMount() {
        // this.setState({ this.props.products: Array.from(this.props.empList) });
    this.props.dispatch(listClientDetails());
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.clientList !== prevState.clientList) {
      console.log(
        "receiving the props in GetDerivedStateFromProps() ",
        newProps.clientList
      );
      if (newProps.clientList === undefined) {
        return { clientList: [] };
      } else {
        return { clientList: newProps.clientList };
      }
    } else return null;
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.clientList !== prevProps.clientList) {
      console.log(
        "receiving the props in ComponentDidUpdate() ",
        this.props.clientList
      );
      if (this.props.clientList === undefined) {
        this.setState({ clientList: [] });
      } else {
        this.setState({ clientList: this.props.clientList });
      }
      // this.props.dispatch(listClientDetails())
      this.setState({ data: this.props.clientList });
    }
  }
  handleDelete(client) {
    this.props.dispatch(deleteClient(client._id));
    console.log("DEL" + client._id);
  }
  handleEdit(client) {
    console.log("Edit Click");
    this.props.handleEdit(client);
  }

  info = (item) => {
    const { t } = this.props;
    console.log(item);
    Modal.info({
      content: (
        <div>
        <p><h3>{t("Client Details")}</h3></p>
          <p>
            <b>{t("Company Name")}:</b> {item.companyName}
          </p>
          <p>
            <b>{t("Client ID")}:</b> {item.clientId}
          </p>
          <p>
            <b>{t("Phone Number")}:</b> {item.phoneNumber}
          </p>
          <p>
            <b>{t("Primary Email")}:</b> {item.primaryEmail}
          </p>
          <p>
            <b>{t("Secondary Email")}:</b> {item.secondaryEmail}
          </p>
          <p>
            <b>{t("Address")}:</b> {item.address}
          </p>
          <p>
            <b>{t("Manager Name")}:</b> {item.managerName}
          </p>
          <p>
            <b>{t("Approver Name")}:</b>{item.approverName}
          </p>
        </div>
      ),
      onOk() {},
    });
  };

  render() {
    //const data = Array.from(this.props.clientList);
    const { t } = this.props;
    const data = Array.from(this.state.clientList);
    console.log("data in render", data);
    // const data = ['ads', 'dda']

    return (
      <div>
        <Row>
          <Card>
            <Search
              placeholder={t("Search Client")}
              onSearch={(value) => console.log(value)}
              style={{ width: "100%" }}
            />
            <List
              style={{ marginTop: "15px" }}
              pagination="true"
              size="large"
              header={
                <div>
                  <b>{t("List of Clients")}</b>
                </div>
              }
              bordered
              dataSource={data}
              renderItem={(item) => (
                <Row>
                  <List.Item>
                    <Col span={12}>
                    <u onClick={() => this.info(item)}>
                    {item.companyName}
                    </u>
                    </Col>
                    <Col span={6}>
                      <input
                        type="button"
                        value={t("Remove")}
                        className="buttons"
                        onClick={() => this.handleDelete(item)}
                      />
                      </Col>
                      <Col span={6}>
                      <input
                        type="button"
                        value={t("Edit")}
                        className="buttons"
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
    state.clientDetails.result
  );
  return {
    clientList: state.clientDetails.result,
  };
};
export default compose(
    withNamespaces(),connect(mapStateToProps))(list);
