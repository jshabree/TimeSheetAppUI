import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, Button, Select, Checkbox } from "antd";
import { forgotPassword } from "../../redux/actions/auth";
import InlineError from "../messages/InlineError";

const FormItem = Form.Item;
const Option = Select.Option;

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        // defining the state to the component
        this.state = {
            data: {
                email: ""
            },
            loading: false,
            visible: false,
            errors: {
                message:""
            }
        };
    }

    componentDidMount() { }

    static getDerivedStateFromProps(props, state) {
        // console.log(props);
        state.errors.message = "";
        if (props.isLoggedIn) {            
            props.history.push("/home");
        } else {
            state.errors.message = props.message;
        }
        return null;
    }

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                this.setState({
                    visible: false
                });
                this.props.dispatch(
                    forgotPassword(values.email)
                );
            }

            try {
                // this.props.history.push("/home");
            } catch (e) {
                alert(e.message);
            }
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    onShow = e => {
        this.setState({
            visible: true
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <a onClick={this.onShow}>
                    Forgot Password{" "}
                </a>
            <Modal
                title="Forgot Password"
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
            <center>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator("email", {
                            rules: [
                                { required: true, message: "Please input your email!" }
                            ]
                        })(
                            <Input
                                prefix={
                                    <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                                }
                                placeholder="Email"
                            />
                        )}
                    </FormItem>
                    {this.state.errors.message && <InlineError text={this.state.errors.message} />}
                    {/* <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Submit
                        </Button>
                    </FormItem> */}
                </Form>
            </center>
            </Modal>
            </div>
        );
    }
}

ForgotPassword.propTypes = {};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.loggedIn,
        message:state.auth.message
    };
};

const WrappedNormalLoginForm = Form.create()(ForgotPassword);

export default connect(mapStateToProps)(WrappedNormalLoginForm);
