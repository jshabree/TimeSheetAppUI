import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Home from "../components/Home";
import TimeSheetCalander from "../components/TimeSheet_Calander";
import CreateNewRequest from "../components/CreateNewRequest";
import EmployeeList from "../components/AddEmployee/List";
import EmployeeView from "../components/AddEmployee/View";
import Project from "../components/ProjectDetails";
import ProjectView from "../components/ProjectDetails/View";
import Signup from "../components/Sign Up";
import VerifyEmail from "../components/VerifyEmail";
import EmployeeVerifyEmail from "../components/EmployeeVerifyEmail";
import Search from "../components/Search";
import AddEmployee from "../components/AddEmployee";
import MTSA from "../components/MTSA/list";
import Logout from "../components/logout/logout";
import PrivateRoute from "../components/privateRoutes";
import EditTimesheet from "../components/EditTimesheet/index";
import TimesheetList from "../components/EditTimesheet/List";
import AddClient from "../components/ClientDetails/index";
import EditClient from "../components/ClientDetails/View";
import AddVendor from "../components/AddVendor/index";
import VendorView from "../components/AddVendor/views";
import TimesheetAdmin from "../components/CreateTimesheetAdmin/index";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/signup" render={(props) => <Signup {...props} />} />
        <Route
          exact
          path="/verify-email/:id"
          render={(props) => <VerifyEmail {...props} />}
        />
        <Route
          exact
          path="/employee-verify-email/:id"
          render={(props) => <EmployeeVerifyEmail {...props} />}
        />
        <PrivateRoute
          exact
          path="/home"
          component={(props) => <Home {...props} />}
        />
        <PrivateRoute
          exact
          path="/createTimesheet"
          component={(props) => <TimesheetAdmin {...props} />}
        />

        <PrivateRoute
          exact
          path="/addClient"
          component={(props) => <AddClient {...props} />}
        />
        <PrivateRoute
          exact
          path="/Vendor"
          component={(props) => <AddVendor {...props} />}
        />
        <PrivateRoute
          exact
          path="/Vendor/:id"
          component={(props) => <VendorView {...props} />}
        />
        <PrivateRoute
          exact
          path="/client/:id"
          component={(props) => <EditClient {...props} />}
        />
        <PrivateRoute
          exact
          path="/createNewRequest"
          component={(props) => <CreateNewRequest {...props} />}
        />
        <PrivateRoute
          exact
          path="/TimeSheetCalander"
          component={(props) => <TimeSheetCalander {...props} />}
        />
        <PrivateRoute
          exact
          path="/Project"
          component={(props) => <Project {...props} />}
        />
        <PrivateRoute
          exact
          path="/Project/:id"
          component={(props) => <ProjectView {...props} />}
        />
        <PrivateRoute
          exact
          path="/Employee"
          component={(props) => <EmployeeList {...props} />}
        />
        <PrivateRoute
          exact
          path="/Employee/:id"
          component={(props) => <EmployeeView {...props} />}
        />
        <PrivateRoute
          exact
          path="/search"
          component={(props) => <Search {...props} />}
        />
        <PrivateRoute
          exact
          path="/addEmployee"
          component={(props) => <AddEmployee {...props} />}
        />
        <PrivateRoute
          exact
          path="/mTSA"
          component={(props) => <MTSA {...props} />}
        />
        <PrivateRoute
          exact
          path="/EditTimesheet/:id"
          component={(props) => <EditTimesheet {...props} />}
        />
        <PrivateRoute
          exact
          path="/TimesheetList"
          component={(props) => <TimesheetList {...props} />}
        />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
};
