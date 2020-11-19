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
  Modal,
  Menu,
  Card,
} from "antd";
import { listVendorDetails } from "../../redux/actions/Vendor_list";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import { compose } from "redux";
import {
  deleteVendor,
  deleteVendorSucess,
} from "../../redux/actions/Vendor_list";
const Search = Input.Search;

class VendorList extends Component {
  state = {
    vendList: [],
    searchVendors: [],
  };
  componentDidMount() {
    this.props.dispatch(listVendorDetails());
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.vendList !== prevState.vendList) {
      console.log(
        "receiving the props in GetDerivedStateFromProps() ",
        newProps.vendList
      );
      if (newProps.vendList === undefined) {
        return { vendList: [] };
      } else {
        return {
          vendList: newProps.vendList,
          searchVendors: newProps.vendList,
        };
      }
    } else return null;
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.vendList !== prevProps.vendList) {
      console.log(
        "receiving the props in ComponentDidUpdate() ",
        this.props.vendList
      );
      if (this.props.vendList === undefined) {
        this.setState({ vendList: [] });
      } else {
        this.setState({
          vendList: this.props.vendList,
          searchVendors: this.props.vendList,
        });
      }
    }
  }
  handleDelete(vend) {
    this.props.dispatch(deleteVendor(vend._id));
    console.log("DEL" + vend._id);
  }
  handleEdit(vend) {
    console.log("Edit Click");
    this.props.handleEdit(vend);
  }

  info = (item) => {
    const { t } = this.props;
    console.log(item);
    Modal.info({
      content: (
        <div>
          <p>
            <h3>{t("Vendor Details")}</h3>
          </p>
          <p>
            <b>{t("First Name")}:</b> {item.firstName}
          </p>
          <p>
            <b>{t("Last Name")}:</b> {item.lastName}
          </p>
          <p>
            <b>{t("Vendor ID")}:</b> {item.vendorID}
          </p>
          <p>
            <b>{t("phone Number")}:</b> {item.phoneNumber}
          </p>
          <p>
            <b>{t("Primary Email")}:</b> {item.primaryEmail}
          </p>
          <p>
            <b>{t("Secondary Email")}:</b> {item.secondaryEmail}
          </p>
          <p>
            <b>{t("Manager Name")}:</b> {item.managerName}
          </p>
          <p>
            <b>{t("Approver Name")}:</b>
            {item.approverName}
          </p>
        </div>
      ),
      onOk() {},
    });
  };

  onSearchVendor = (value) => {
    let filteredValue = this.state.vendList.filter(
      (item) => item.firstName.toLowerCase().includes(value) === true
    );
    this.setState({ searchVendors: filteredValue });
  };

  render() {
    const data = Array.from(this.state.vendList);
    const { t } = this.props;
    const filteredData = Array.from(this.state.searchVendors);
    console.log("data in render", data);

    return (
      <div>
        <Row>
          <Card>
            <Search
              placeholder={t("Search Vendor")}
              onSearch={(value) => this.onSearchVendor(value)}
              style={{ width: "100%" }}
            />
            <List
              style={{ marginTop: "15px" }}
              pagination="true"
              size="large"
              header={
                <div>
                  <b>{t("List of Vendors")}</b>
                </div>
              }
              bordered
              dataSource={filteredData}
              renderItem={(item) => (
                <Row>
                  <List.Item style={{ width: "100%" }}>
                    <Col span={12}>
                      <u
                        onClick={() => this.info(item)}
                        onKeyDown={() => this.info(item)}
                        role="link"
                        tabIndex="0"
                      >
                        {item.firstName} {item.lastName}
                      </u>
                    </Col>
                    <Col span={12}>
                      <input
                        type="button"
                        value={t("Remove")}
                        className="buttons"
                        onClick={() => this.handleDelete(item)}
                      />
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
    state.vendorList.result
  );
  return {
    vendList: state.vendorList.result,
  };
};
export default compose(withNamespaces(), connect(mapStateToProps))(VendorList);
