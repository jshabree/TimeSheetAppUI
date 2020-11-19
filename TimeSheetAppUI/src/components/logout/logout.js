import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/auth";

class Logout extends Component {
    constructor(props) {
        super(props);
        // defining the state to the component
        this.state = {
        };
    }

    componentDidMount() {
        this.props.dispatch(logoutUser());
    }

    static getDerivedStateFromProps(props, state) {
        if(!props.isLoggedIn) {
            props.history.push("/login");
        }
        return null;
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

Logout.propTypes = {};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.loggedIn
    };
};

export default connect(mapStateToProps)(Logout);