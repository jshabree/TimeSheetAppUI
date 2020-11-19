import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Layout, Menu, Input, Button, Select, Checkbox } from "antd";
import { loginUser } from "../../redux/actions/auth";
import InlineError from "../messages/InlineError";
import ForgotPassword from "../forgotPassword";
import { isObjectLiteralElementLike } from "typescript";
import HeaderMain from "../HeaderMain";
import Loader from "../../loader/loader";

const FormItem = Form.Item;
const { Header } = Layout;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
        isBusiness: true,
        role: "3",
      },
      loading: false,
      user: {},
      errors: {
        message: "",
      },
    };
  }

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    state.errors.message = "";
    if (props.isLoggedIn) {
      if (props.user.role === 1) {
        props.history.push("/home");
        return { loading: false };
      } else {
        props.history.push("/createNewRequest");
        return { loading: false };
      }
    } else {
    }
    if (props.user !== state.user) {
      console.log("derived state", props.user);
      return { user: props.user };
    }

    return null;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.dispatch(loginUser(values.email, values.password));
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;

    return (
      <div className="login-form">
        <Form>
          <div className="rsrit-img">
            <img
              src="https://rsrit.com/wp-content/uploads/2017/12/logo_dark.png"
              width="200px"
              height="60px"
              alt="Rsrit-logo"
            />
            <br />
          </div>
          <FormItem>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please input your email!" }],
            })(
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Email"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" },
              ],
            })(
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          {this.state.errors.message && (
            <InlineError text={this.state.errors.message} />
          )}
          <FormItem>
            <div className="remember-me">
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={this.handleSubmit}
            >
              {loading ? <Loader /> : "Log in"}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.loggedIn,
    user: state.auth.user,
    message: state.auth.message,
  };
};
const WrappedNormalLoginForm = Form.create()(Login);

export default connect(mapStateToProps)(WrappedNormalLoginForm);
