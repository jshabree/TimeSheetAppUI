import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Modal, List, Checkbox, Input, Menu, Button, Col, Layout } from "antd";
import { Link } from "react-router-dom";
import InlineError from "../messages/InlineError";
import { getEmp, searchEmp } from "../../redux/actions/Get_List";
import { isEmptyBindingElement } from "typescript";

const { Header, Content } = Layout;

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: "mail",
            data: {
                firstName: "",
                lastName: "",
                primaryEmail: ""

            },
            loading: false,
            visible: false,
            errors: {},
            employeesList:this.props.searchList,
            listOfEmployees:this.props.listOfEmployees
        };


        this.onChange = this.onChange.bind(this);
    }
    
    UNSAFE_componentWillReceiveProps(props) {
        this.setState({employeesList: props.searchList});
        if(this.state.listOfEmployees !== props.listOfEmployees) {
            this.setState({listOfEmployees: props.listOfEmployees});
        }
    }

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onCheck = (e, index) => {
        // const th = this;
        // console.log(`checked = ${e.target.checked}`);
        // console.log(e.target.checked+"----"+ index);
        // console.log(this.state.employeesList);
        // console.log(e.target.value.employeeId);
        // let tmpItem = {...tmpList[index],isChecked: e.target.checked};
        // employeesList[index].isChecked = e.target.checked;
        // console.log(employeesList[index]);
        // this.setState({employeesList});
        // console.log(this.state.employeesList);
        let empDetails = {};
        empDetails.employeeId = e.target.value.employeeId;
        empDetails.employeeName = e.target.value.firstName;
        empDetails.isTimesheetActive = true;
        if(e.target.checked){
            console.log("true");
            e.target.value.check = true;
            // this.state.listOfEmployees.push(empDetails);
            this.setState({listOfEmployees: [...this.state.listOfEmployees, empDetails]}, function() {
                console.log(this.state.listOfEmployees);
            });
        } else {
            console.log("false");
            console.log(this.state.listOfEmployees);
            let filteredList =  this.state.listOfEmployees.filter(emp => emp.employeeId !== e.target.value.employeeId);
            console.log(filteredList);
            this.setState({listOfEmployees: filteredList}, function() {
                console.log(this.state.listOfEmployees);
            });
            // this.state.listOfEmployees = filteredList;
            // console.log(this.state.listOfEmployees);
            // e.target.value.check = false;
        }
        // console.log(e.target.value);
    }

    handleClick = e => {
        // console.log("click ", e);
        this.setState({
            current: e.key
        });
    };

    handleOk = e => {
        this.setState({
            visible: false
        });
        console.log(this.state.listOfEmployees);
        // let selEmpList = Array.from(this.props.searchList);
        // console.log(selEmpList);
        // const selEmployees = selEmpList.filter(item => {
        //     console.log(item.check);
        //     if (item.check) {
        //         return item;
        //     }
        // });
        this.props.selectedEmps(this.state.listOfEmployees);
        // console.log("selected employees list" + JSON.stringify(selEmployees));
    };

    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible: false,
            listOfEmployees: this.props.listOfEmployees
        },function() {
            console.log(this.state.listOfEmployees);
        });
        
    };

    validate = data => {
        const errors = {};
        if (!data.firstName) errors.firstName = "Can't be empty";
        return errors;
    };

    onShow = e => {
        
        // console.log(this.props.listOfEmployees);
        this.setState({
            visible: true,
            listOfEmployees: this.props.listOfEmployees
        }, function() {
            console.log(this.state.listOfEmployees);
        });
        
        const { firstName, lastName, primaryEmail } = this.state.data;
        this.props.dispatch(
            getEmp({
                firstName: firstName,
                lastName: lastName,
                primaryEmail: primaryEmail,

            })
        );
        // console.log(this.state.employeesList);
        
    };

    onFilter = e => {
        const errors = this.validate(this.state.data);
        this.setState({
            visible: true,
            errors
        });
        if (Object.keys(errors).length === 0) {
            const { firstName, lastName, primaryEmail } = this.state.data;
            this.props.dispatch(
                searchEmp({
                    firstName: firstName,
                    lastName: lastName,
                    primaryEmail: primaryEmail
                })
            );
        }
    };

    checkEmployee = (empId) => {

        let checked = false;
        if(this.props.listOfEmployees && this.props.listOfEmployees.length !==0){
             this.props.listOfEmployees.map(data => {
                
                if(data.employeeId === empId) {
                    // console.log(data.employeeId+"==="+empId);
                    checked = true;
                }
            })
        }
        return checked;
    }

    render() {
        const { errors, employeesList, data } = this.state;
        
        return (
            <div>
                <Button type="primary" onClick={this.onShow}>
                    Add Employee{" "}
                </Button>
                <Modal
                    title="Employee Details"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Card title="Search Employee">
                        <Form>
                            <Col span={18}>
                                <Form.Item error={!!errors.firstName}>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        value={data.firstName}
                                        onChange={this.onChange}
                                        placeholder="Enter Name"
                                    />
                                    {errors.firstName && <InlineError text={errors.firstName} />}
                                </Form.Item>
                                <Button type="primary" onClick={this.onFilter}>
                                    Filter{" "}
                                </Button>

                                <Content
                                    style={{
                                        margin: "24px 16px",
                                        padding: 24,
                                        background: "#fff",
                                        minHeight: 100
                                    }}
                                >
                                    <List
                                        bordered
                                        dataSource={employeesList}
                                        renderItem={(item, index) => (
                                            <List.Item>
                                                <Checkbox defaultChecked = {this.checkEmployee(item.employeeId)} onChange={(e) => this.onCheck(e, index)} value={item}  />
                                                {item.firstName}
                                                {"    ||    "}
                                                {item.lastName}
                                                {"    ||    "}
                                                {item.primaryEmail}
                                            </List.Item>
                                        )}
                                    />
                                </Content>
                            </Col>
                        </Form>
                    </Card>
                </Modal>
            </div>
        );
    }
}
function mapStateToProps(state) {
    //console.log("STATE" + JSON.stringify(state.empList.result));
    return {
        searchList: state.searchList.result
    };
}
export default connect(mapStateToProps)(Search);