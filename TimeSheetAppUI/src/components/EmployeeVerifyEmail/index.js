import React, { Component } from "react";
import { connect } from 'react-redux';
import { Layout, Row, Col } from 'antd';
import { verifyEmail } from "../../redux/actions/home";

// const { Header, Content, Footer } = Layout;

class EmployeeVerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: "employee-verify-email/:id",
            message:""
        }
    }

    componentDidMount () {
        this.props.dispatch(verifyEmail(this.props.match.params.id, "employee"));
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.emailStatus.status === 1) {
            this.setState({"message": "Email verified successfully, your credentials will be sent to the email"});
        } else if(nextProps.emailStatus.status === 2) {
            this.setState({"message": "Email already verified"});
        } else if(nextProps.emailStatus.status === 3) {
            this.setState({"message": "Invalid link"});
        }else {
            this.setState({"message": "Unable to verify"});
        }
    }

    render(){
        const { message } = this.state;
        console.log(this.props.location.pathname);
        return(
            // <div>
            //     <Layout>
            //         <Content>
            //             <Row>
            //                 <Col>
            //                     Id is: {this.props.match.params.id}
            //                 </Col>
            //             </Row>
            //         </Content>
            //     </Layout>
            // </div>
            <center>
                <div>
                    <img
                        src="https://rsrit.com/wp-content/uploads/2017/12/logo_dark.png"
                        width="200px"
                        height="60px"
                        alt="Rsrit-logo"
                    />
                    <br />
                </div>
                <div>
                    <p>{message}</p>
                </div>
            </center>
            
        );
    }

}

const mapStateToProps = state => {
    console.log("Signup" + JSON.stringify(state));
    return {
        emailStatus: state.auth.result
    };
};

export default connect(mapStateToProps)(EmployeeVerifyEmail);