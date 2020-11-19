import React, { Component } from "react";
import { connect } from "react-redux";
import Validator from "validator";
import { ClockCircleOutlined, CopyrightOutlined, HomeOutlined, LogoutOutlined, ProjectOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Menu, Layout, Row, Input, Button, Card, Col } from "antd";
import InlineError from "../messages/InlineError";
import { clientDetailsSubmit, addClient } from "../../redux/actions/ClientDetails";
import {checkEmail} from "../../redux/actions/home";
import { Link } from "react-router-dom";
import Clientlist from "../ClientDetails/list";
import { withNamespaces } from "react-i18next";
import { compose } from "redux";
import HeaderHome from "../HeaderNav/HeaderHome";

const { Header, Content, Footer } = Layout;

class clientDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                companyName: "",
                clientId: "",
                phoneNumber: "",
                primaryEmail: "",
                secondaryEmail: "",
                address: "",
                managerName: "",
                approverName: ""
            },
            loading: false,
            errors: {},
            current: 'client',
            isAdmin: false
        };
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.user.role === 1) state.isAdmin = true;

        return null;
    }

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    checkEmail = e => {
        if(this.state.data.primaryEmail === "") {
            this.setState({"errors": {"primaryEmail":""}});
            console.log(this.state);
        }
        if (Validator.isEmail(this.state.data.primaryEmail)){
            this.props.dispatch(checkEmail(this.state.data.primaryEmail));
        }
    }
    handleEdit = (cli) => {
        this.props.history.push({
            pathname: "/client/" + cli._id,
            state: {
                cli: cli
            },
        });
    };
    onSubmit = e => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            const {
                companyName,
                clientId,
                phoneNumber,
                primaryEmail,
                secondaryEmail,
                address,
                managerName,
                approverName
            } = this.state.data;
            this.props.dispatch(
                addClient({
                    companyName: companyName,
                    clientId: clientId,
                    phoneNumber: phoneNumber,
                    primaryEmail: primaryEmail,
                    SecondaryEmail: secondaryEmail,
                    address: address,
                    managerName: managerName,
                    approverName: approverName
                })
            );

        }
    };

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.primaryEmail))
            errors.primaryEmail = "Invalid Email";
        if (!Validator.isEmail(data.secondaryEmail))
                errors.secondaryEmail = "Invalid Email";
        if (!data.companyName) errors.companyName = "Can't be empty";
        if (!data.clientId) errors.clientId = "Can't be empty";
        if (!data.phoneNumber) errors.phoneNumber = "Please Enter Number";
        if (!data.approverName) errors.approverName = "Can't be empty";
        if (!data.address) errors.address = "Can't be empty";
        if (!data.managerName) errors.managerName = "Can't be empty";
        return errors;
    };

    render() {
        const { data, errors } = this.state;
        const { t } = this.props;
        const { TextArea } = Input;
        const FormItem = Form.Item;

        let timeSheetMenu;
        let projectMenu;
        let managerTimeSheetApproval;
        
        if(!this.state.isAdmin) {
            timeSheetMenu = <Menu.Item key="timesheet">
                    <Link to={{ pathname: "/createNewRequest" }}><ClockCircleOutlined />TimeSheet</Link>
                </Menu.Item>
        }
        if(this.state.isAdmin) {
            projectMenu = <Menu.Item key="project">
                <Link to={{ pathname: "/Project" }}><ProjectOutlined />Project</Link>
            </Menu.Item>
        }
        if(this.state.isAdmin) {
            managerTimeSheetApproval = <Menu.Item key="Manager Approval">
                <Link to={{ pathname: "/mTSA" }}>
                    <ClockCircleOutlined />
                    Manager TimeSheet Approval
                </Link>
            </Menu.Item>
        }
        
        return (
            <div>
            <Layout>
                < HeaderHome / >
                <Content className="content">
                    <Row gutter={24}>
                    <Col span={16}>
                    <Form>
                    <Card>
                        <h2>{t("Client Details")}</h2>
                    </Card>
                  
                    <Row type="flex" justify="start">
                        <Col span={8}>
                        <Card>
                            <label>{t("Company Name")}</label>
                            <Form.Item error={!!errors.companyName}>
                            
                                <Input
                                    id="companyName"
                                    type="text"
                                    size="default"
                                    name="companyName"
                                    value={data.companyName}
                                    onChange={this.onChange}
                                    placeholder="Enter Name"
                                />
                                {errors.companyName && <InlineError text={errors.companyName} />}
                            </Form.Item>
                            </Card>
                        </Col>
                        <Col span={8}>
                        <Card>
                            <label>{t("Client ID")}</label>
                            <Form.Item error={!!errors.clientId}> 
                                <Input
                                    id = "clientId"
                                    type="text"
                                    size="default"
                                    name = "clientId"
                                    value={data.clientId}
                                    onChange={this.onChange}
                                    placeholder="Enter ID"
                                />
                                {errors.clientId && <InlineError text={errors.clientId} />}
                            </Form.Item>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                            <label>{t("Phone Number")}</label>
                            <Form.Item error={!!errors.phoneNumber}>
                                <Input
                                    id="phoneNumber"
                                    size="default"
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="10 Digits Phone number"
                                    value={data.phoneNumber}
                                    onChange={this.onChange}
                                />
                                {errors.phoneNumber && (
                                    <InlineError text={errors.phoneNumber} />
                                )}
                            </Form.Item>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                            <label>{t("Primary Email")}</label>
                            <Form.Item error={!!errors.primaryEmail}>
                                <Input
                                    id="primaryEmail"
                                    type="email"
                                    size="default"
                                    name="primaryEmail"
                                    value={data.primaryEmail}
                                    onChange={this.onChange}
                                    onBlur={this.checkEmail}
                                    placeholder="email@rsrit.com"
                                />
                                {errors.primaryEmail && <InlineError text={errors.primaryEmail} />}
                            </Form.Item>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                            <label>{t("Secondary Email")}</label>
                            <Form.Item error={!!errors.secondaryEmail}>
                                <Input
                                    id="secondaryEmail"
                                    size="default"
                                    type="email"
                                    name="secondaryEmail"
                                    value={data.secondaryEmail}
                                    onChange={this.onChange}
                                    placeholder="email@gmail.com"
                                />
                                {errors.secondaryEmail && <InlineError text={errors.secondaryEmail} />}
                            </Form.Item>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                            <label>{t("Address")}</label>
                            <Form.Item error={!!errors.address}>
                                <Input
                                    id="address"
                                    type="text"
                                    size="default"
                                    name="address"
                                    value={data.address}
                                    onChange={this.onChange}
                                    placeholder="Enter Current Address"
                                />
                                {errors.address && <InlineError text={errors.address} />}
                            </Form.Item>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                            <label>{t("Manager Name")}</label>
                            <Form.Item error={!!errors.managerName}>
                                <Input
                                    id="managerName"
                                    type="text"
                                    size="default"
                                    name="managerName"
                                    value={data.managerName}
                                    onChange={this.onChange}
                                    placeholder="Person who manages the Employee"
                                />
                                {errors.managerName && <InlineError text={errors.managerName} />}
                            </Form.Item>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                            <label>{t("Approver Name")}</label>
                            <Form.Item error={!!errors.phoneNumber}>
                                <Input
                                    id="approverName"
                                    type="text"
                                    size="default"
                                    name="approverName"
                                    value={data.approverName}
                                    onChange={this.onChange}
                                    placeholder="Person who approved the Employee"
                                />
                                {errors.approverName && <InlineError text={errors.approverName} />}
                            </Form.Item>
                            </Card>
                            </Col>
                            </Row>
                      <Button type="primary" style={{ marginLeft: "2em" }}>
                        {t("Clear")}
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={this.onSubmit}
                        style={{ marginLeft: "2em" }}
                      >
                        {t("Add Client")}
                      </Button>
                      </Form>
                      </Col>
                        <Col span={8}>
                            <Clientlist handleEdit={this.handleEdit} />
                        </Col>
                        </Row>
                        </Content>
                        </Layout>
                        <Footer>
                        <center>
                            <CopyrightOutlined />
                            Reliable Software 2018
                        </center>
                        </Footer>
                        </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("Client" + JSON.stringify(state.addClient));
    return {
        addClient: state.clientDetails,
        user: state.auth.user
    };
}

const WrappedRegistrationForm = Form.create()(clientDetails);

export default compose(
  withNamespaces(),connect(mapStateToProps))(WrappedRegistrationForm);