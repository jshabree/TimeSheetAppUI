import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Validator from "validator";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Layout, Menu, Input, Row, Col, Button, Card } from "antd";
import InlineError from "../messages/InlineError";
import { signupUser, checkEmail } from "../../redux/actions/home";
import { InfoModal } from "../InfoModal/index";
import { Modal } from "antd";
import HeaderMain from "../HeaderMain";

const { Header } = Layout;
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      loading: false,
      errors: {},
      validEmail: false,
      alertModalValue: false,
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //     console.log("props "+JSON.stringify(props));
  //     console.log("state "+JSON.stringify(state));

  //     return null;
  // }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.checkEmail.status === 1) {
      this.setState({
        errors: Object.assign(
          {},
          {
            email: "Email already exists",
          }
        ),
      });
    } else if (nextProps.checkEmail.status === 0) {
      this.setState({
        errors: Object.assign(
          {},
          {
            email: "",
          }
        ),
      });
    } else if (nextProps.checkEmail.status === 2) {
      this.setState({
        errors: Object.assign(
          {},
          {
            email: "Unable to verify email",
          }
        ),
      });
    }
  }

  onChange = (e) =>
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    });

  checkEmail = (e) => {
    if (this.state.data.email === "") {
      this.props.checkEmail.status = 0;
    }
    if (Validator.isEmail(this.state.data.email)) {
      // this.props.dispatch(checkEmail(this.state.data.email));
    }
  };

  onSubmit = (e) => {
    const errors = this.validate(this.state.data);
    if (Object.keys(errors).length === 0) {
      const {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        confirmPassword,
      } = this.state.data;
      this.props.dispatch(
        signupUser({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        })
      );

      this.props.history.push("/login");

      this.setState({
        errors,
        alertModalValue: true,
      });
    } else {
      this.setState({
        errors,
        alertModalValue: false,
      });
    }
  };

  validate = (data) => {
    const errors = {};
    // if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
    if (!data.password) errors.password = "Can't be empty";
    if (!data.firstName) errors.firstName = "Can't be empty";
    if (!data.lastName) errors.lastName = "Can't be empty";
    if (!data.phoneNumber) errors.phoneNumber = "Please Enter Number";
    if (data.password !== data.confirmPassword)
      errors.confirmPassword = "Write the same password";
    return errors;
  };

  render() {
    const { data, errors, alertModalValue } = this.state;
    let history = this.props.history;
    // let messageToUser =
    //   "We have sent a verification email to your Email ID provided, Can you verify your email before proceeding with login";

    return (
      <div>
        <center style={{ width: "100%", height: "100%", background: "#fff" }}>
          <Card
            title="CREATE ACCOUNT"
            style={{
              width: "400px",
              height: "100%",
              marginTop: "50px",
              background: "#f2f2f2",
              fontWeight: "bolder",
            }}
          >
            <Form>
              <Row>
                <Col>
                  <Form.Item error={!!errors.firstName}>
                    <Input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={data.firstName}
                      onChange={this.onChange}
                      placeholder="First Name"
                    />{" "}
                    {errors.firstName && (
                      <InlineError text={errors.firstName} />
                    )}{" "}
                  </Form.Item>{" "}
                  <Form.Item error={!!errors.lastName}>
                    <Input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={data.lastName}
                      onChange={this.onChange}
                      placeholder="Last Name"
                    />{" "}
                    {errors.lastName && <InlineError text={errors.lastName} />}{" "}
                  </Form.Item>{" "}
                  <Form.Item error={!!errors.phoneNumber}>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="10 Digits Phone number"
                      value={data.phoneNumber}
                      onChange={this.onChange}
                    />{" "}
                    {errors.phoneNumber && (
                      <InlineError text={errors.phoneNumber} />
                    )}{" "}
                  </Form.Item>{" "}
                  <Form.Item error={!!errors.email}>
                    <Input
                      id="email"
                      type="text"
                      name="email"
                      value={data.email}
                      onChange={this.onChange}
                      onBlur={this.checkEmail}
                      placeholder="email@rsrit.com"
                    />{" "}
                    {errors.email && <InlineError text={errors.email} />}{" "}
                  </Form.Item>{" "}
                  <Form.Item error={!!errors.password}>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={data.password}
                      onChange={this.onChange}
                      placeholder="Password (Make it Secure)"
                    />{" "}
                    {errors.password && <InlineError text={errors.password} />}{" "}
                  </Form.Item>{" "}
                  <Form.Item error={!!errors.confirmPassword}>
                    <Input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      value={data.confirmPassword}
                      onChange={this.onChange}
                      placeholder="Same as Password"
                    />{" "}
                    {errors.confirmPassword && (
                      <InlineError text={errors.confirmPassword} />
                    )}{" "}
                  </Form.Item>
                  <Button type="primary" onClick={this.onSubmit}>
                    Submit{" "}
                  </Button>
                  <b> or</b> <Link to="/login"> Login </Link>{" "}
                </Col>{" "}
              </Row>{" "}
            </Form>{" "}
          </Card>
        </center>
        {
          // { alertModalValue
          //   ? // <InfoModal
          //     //   history={this.props.history}
          //     //   message={messageToUser}
          //     //   redirectTo="/login"
          //     // />
          //     Modal.info({
          //       title: "Email verification",
          //       content: (
          //         <div>
          //           <p> {messageToUser} </p>{" "}
          //         </div>
          //       ),
          //       onOk() {
          //         history.push("/login");
          //       },
          //     })
          //   : ""}{" "}
        }
      </div>
    );
  }
}

Signup.propTypes = {};

const mapStateToProps = (state) => {
  console.log("Signup" + JSON.stringify(state));
  return {
    userObject: state.auth.user,
    checkEmail: state.auth.checkEmail,
  };
};

export default connect(mapStateToProps)(Signup);
