import {
  takeEvery,
  call,
  put,
  select,
  take,
  fork,
  all,
  takeLatest,
} from "redux-saga/effects";
import * as Types from "../actions/types";
import axios from "axios";
import { GetDataFromServer, deleteService } from "../service";
import { Dropbox } from "dropbox";

// const baseUrl = "http://localhost:5000";
// const baseUrl2 = "http://localhost:5000";
// const aws = "http://localhost:5000";
const baseUrl = "https://timesheetnodeservices.herokuapp.com";
const baseUrl2 = "https://timesheetnodeservices.herokuapp.com";
const aws = "https://timesheetnodeservices.herokuapp.com";

// // // const aws = 'http://localhost:5066';
// const baseUrl = "https://eapplication-timesheet-service.herokuapp.com";
// const baseUrl2 = "https://eapplication-timesheet-service.herokuapp.com";
// const aws = "https://eapplication-timesheet-service.herokuapp.com";

// const baseUrl = "https://fierce-sands-39074.herokuapp.com/";
// const baseUrl2 = "https://fierce-sands-39074.herokuapp.com/";
// const aws = "https://fierce-sands-39074.herokuapp.com/";
function* fetchLoginUser(action) {
  try {
    console.log("saga");
    console.log("Action->" + JSON.stringify(action));
    let formBody = {};
    formBody.email = action.email;
    formBody.password = action.password;
    // formBody.age = "34"
    //const reqMethod = "POST";
    const reqMethod = "GET";
    //const loginUrl = baseUrl + "/login";
    const loginUrl = baseUrl + "/userSignup/loginuser";

    const response = yield call(GetDataFromServer, loginUrl, "POST", formBody);

    const result = yield response.json();
    console.log("ADS" + result.workingdetails);
    console.log("Result ->" + JSON.stringify(result));
    console.log("Result Json" + result);
    if (result.error) {
      yield put({
        type: "LOGIN_USER_SERVER_REPONSE_ERROR",
        error: result.error,
      });
    } else {
      yield put({
        type: Types.LOGIN_USER_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* fetchTimeSheet(action) {
  console.log("TimeSheet create Action->" + JSON.stringify(action));
  try {
    // console.log("Action->" + JSON.stringify(action));
    let formBody = {};
    // formBody.selectWeek = action.selectWeek; //action.provider;
    // formBody.jobTitle = action.jobTitle;
    // formBody.approver = action.approver;
    // formBody.client = action.client;
    // formBody.endDate = action.endDate;
    // formBody.projectId = action.projectId;
    formBody = action.timesheet;
    //const reqMethod = "POST";
    const reqMethod = "POST";
    const loginUrl = baseUrl + "/TimeSheet";
    const response = yield call(GetDataFromServer, loginUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json Login " + result);
    if (result.error) {
      yield put({
        type: Types.CREATE_TIMESHEET_FAILURE,
        error: result.error,
      });
    } else {
      yield put({ type: Types.CREATE_TIMESHEET_SUCCESS, result });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* editTimesheet(action) {
  console.log(action);
  try {
    const reqMethod = "POST";
    let formBody = {};
    formBody._id = action._id;
    const loginUrl = baseUrl + "/view-timesheet";
    const response = yield call(
      GetDataFromServer,
      loginUrl,
      reqMethod,
      formBody
    );
    const result = yield response.json();
    console.log("Result Json" + result);
    if (result.error) {
      yield put({
        type: Types.EDIT_TIMESHEET_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.EDIT_TIMESHEET_SUCCESS,
        result,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// This code work for saving the file in local systems.
// function* updateTimesheet(action) {
//   console.log("TimeSheet update Action->" + JSON.stringify(action));
//   try {
//     const filedata = new FormData();
//     filedata.append("file", action.timesheet.file);
//     const loginUrl = baseUrl + "/TimeSheet/upload/";
//     let result;
//     axios
//       .post(loginUrl, filedata, {
//         // receive two    parameter endpoint url ,form data
//       })
//       .then((res) => {
//         // then print response status
//         let formBody = {};
//         formBody = action.timesheet;
//         formBody._id = action.timesheet._id;
//         formBody.filepath = res.data.path;
//         const loginUrll = baseUrl + "/TimeSheet/" + formBody._id;
//         axios.patch(loginUrll, formBody, {}).then((ress) => (result = ress));
//       });
//     if (result.error) {
//       yield put({
//         type: Types.UPDATE_TIMESHEET_ERROR,
//         error: result.error,
//       });
//     }
//   } catch (error) {
//     // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
//     console.log(error);
//   }
// }

function* updateTimesheet(action) {
  console.log("TimeSheet update Action->" + JSON.stringify(action));
  try {
    let resp = [];
    const file = action.timesheet.file;
    var dbx = new Dropbox({
      accessToken:
        "gpKFCMi2jEAAAAAAAAAAEvNRpzyQFo5SnZmcJxmu1J5-1m9RCygr_T_l_YVJbgQ8",
    });

    for (let i = 0; i < file.length; i++) {
      yield dbx
        .filesUpload({ path: "/" + file[i].name, contents: file[i] })
        .then(
          (response) => resp.push(response)
          // var results = document.getElementById('results');
          // results.appendChild(document.createTextNode('File uploaded!'));
        )
        .catch(function(error) {
          console.error(error);
        });
    }

    // console.log("Action->" + JSON.stringify(action));
    let formBody = {};
    formBody = action.timesheet;
    formBody._id = action.timesheet._id;
    formBody.filedetails = resp;
    console.log("formBody after resp", formBody);
    //const reqMethod = "POST";
    const loginUrl = baseUrl + "/TimeSheet/" + formBody._id;
    const response = yield call(GetDataFromServer, loginUrl, "PATCH", formBody);
    const result = yield response.json();
    console.log("Result Json" + result);
    if (result.error) {
      yield put({
        type: "LOGIN_USER_SERVER_REPONSE_ERROR",
        error: result.error,
      });
    } else {
      yield put({
        type: Types.LOGIN_USER_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* deleteTimesheetDetails(action) {
  console.log("DELETE ACTIO" + JSON.stringify(action));
  try {
    // Ensure that your API returns the data of the updated todo
    let formBody = {};
    formBody._id = action.timesheetid._id;
    const deleteApi = baseUrl + "/TimeSheet/:" + formBody._id;
    const newData = yield call(
      deleteService,
      formBody,
      deleteApi
      //baseUrl
    ); // Refer sample to api calls in remote.js file
    newData._id = action.timesheetid._id;
    yield put({ type: Types.DELETE_TIMESHEET_SUCCESS, newData }); // pass in the id you updated and the newData returned from the API
    /// Other things can go here depending on what you want
  } catch (e) {
    console.log("SAGA ERROR");
  }
}

function* fetchTimeSheetCalander(action) {
  console.log("Submit Action->" + JSON.stringify(action));
  try {
    let formBody = {};
    formBody.workingdetails = action.submitTimeSheet.workingdetails;
    const reqMethod = "POST";
    const loginUrl = baseUrl + "/create-timesheet";
    const response = yield call(GetDataFromServer, loginUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json" + result);
    if (result.error) {
      yield put({
        type: "LOGIN_USER_SERVER_REPONSE_ERROR",
        error: result.error,
      });
    } else {
      yield put({
        type: Types.LOGIN_USER_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* fetchSaveTimeSheetCalander(action) {
  console.log("Save Time Sheet Action->" + JSON.stringify(action));
  try {
    let formBody = {};
    formBody.workingdetails = action.submitTimeSheet.workingdetails;
    const reqMethod = "POST";
    const loginUrl = baseUrl + "/create-timesheet";
    const response = yield call(GetDataFromServer, loginUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json" + result);
    if (result.error) {
      yield put({
        type: "LOGIN_USER_SERVER_REPONSE_ERROR",
        error: result.error,
      });
    } else {
      yield put({
        type: Types.LOGIN_USER_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* getTimesheetDetails(action) {
  // console.log("Time sheet details->" + JSON.stringify(action));
  try {
    let formBody = {};
    // formBody = action.data;
    const url = aws + "/TimeSheet/";
    const response = yield call(GetDataFromServer, url, "", formBody);
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.TIMESHEET_LIST_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.TIMESHEET_LIST_SUCCESS,
        result,
      });
    }
  } catch (e) {
    yield put({
      type: Types.TIMESHEET_LIST_SUCCESS,
      result: null,
    });
  }
}

function* getEmpTimesheetlist(action) {
  console.log("get emp timesheetlist->" + JSON.stringify(action));
  try {
    let formBody = {};
    formBody.employeeID = action.employeeID;
    const url = aws + "/TimeSheet/" + formBody.employeeID;
    const response = yield call(GetDataFromServer, url, "", formBody);
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.TIMESHEET_LIST_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.TIMESHEET_LIST_SUCCESS,
        result,
      });
    }
  } catch (e) {
    yield put({
      type: Types.TIMESHEET_LIST_SUCCESS,
      result: null,
    });
  }
}

function* approveTimesheet(action) {
  // console.log("approve timesheet details->" + JSON.stringify(action));
  let formBody = {};
  formBody = action.data;
  const url = aws + "/approve-reject-timesheet";
  const response = yield call(GetDataFromServer, url, "POST", formBody);
  const result = yield response.json();
  if (result.error) {
    yield put({
      type: Types.APPROVE_TIMESHEET_ERROR,
      error: result.error,
    });
  } else {
    yield put({
      type: Types.APPROVE_TIMESHEET_SUCCESS,
      result,
    });
  }
}

function* fetchListOfEmployee() {
  let formBody = {};
  const reqMethod = "GET";

  const loginUrl = baseUrl + "/employee";

  const response = yield call(GetDataFromServer, loginUrl, "", "");

  const result = yield response.json();
  console.log("Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({
      type: Types.LIST_EMPLOYEE_DETAILS_SERVER__RESPONSE_ERROR,
      result,
    });
  } else {
    yield put({
      type: Types.LIST_EMPLOYEE_DETAILS_SERVER_RESPONSE_SUCESS,
      result,
    });
  }
}

function* fetchCreateProjectDetails(action) {
  try {
    let formBody = {};
    formBody = action.projectDetails.projectDetails;
    // yield put({
    //   type: Types.LIST_PROJECT_DETAILS_SERVER_RESPONSE_SUCESS,
    //   formBody,
    // });
    // let formBody = {};
    // const reqMethod = "POST";
    // const loginUrl = baseUrl + '/view';
    // const response = yield call(GetDataFromServer, loginUrl, '', '');

    // const result = yield response.json();
    // console.log("Result->" + JSON.stringify(result));
    // if (result.error) {
    //   yield put({ type: Types.CREATE_PROJECT_DETAILS_SERVER_RESPONSE_ERROR, result });
    // } else {
    //   yield put({ type: Types.CREATE_PROJECT_DETAILS_SERVER_RESPONSE_SUCESS, result });
    // }

    const reqMethod = "POST";
    // const loginUrl = baseUrl + '/project/create';
    const loginUrl = baseUrl + "/projects";
    const response = yield call(GetDataFromServer, loginUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json" + JSON.stringify(result));
    if (result.error) {
      yield put({
        type: Types.CREATE_PROJECT_DETAILS_SERVER_RESPONSE_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.CREATE_PROJECT_DETAILS_SERVER_RESPONSE_SUCESS,
        result,
      });
      console.log("PROJECT DETAILS" + JSON.stringify(result));
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* checkEmail(action) {
  console.log("check email Submit Action->" + JSON.stringify(action));
  let formBody = {};
  formBody.email = action.email;

  const checkEmailUrl = aws + "/check-email";
  const response = yield call(
    GetDataFromServer,
    checkEmailUrl,
    "POST",
    formBody
  );
  const result = yield response.json();
  console.log("Result Json" + JSON.stringify(result));
  if (result.error) {
    yield put({
      type: "CHECK_EMAIL_ERROR",
      error: result.error,
    });
  } else {
    yield put({
      type: Types.CHECK_EMAIL_SUCCESS,
      result,
    });
  }
}

function* verifyEmail(action) {
  console.log("verify email Submit Action->" + JSON.stringify(action));
  let formBody = {};
  formBody._id = action._id;

  let verifyEmailUrl = "";
  if (action.verificationtype === "admin") {
    verifyEmailUrl = aws + "/verify-email";
  } else if (action.verificationtype === "employee") {
    verifyEmailUrl = aws + "/employee-verify-email";
  }

  const response = yield call(
    GetDataFromServer,
    verifyEmailUrl,
    "POST",
    formBody
  );

  const result = yield response.json();
  if (result.error) {
    yield put({
      type: Types.VERIFY_EMAIL_ERROR,
      error: result.error,
    });
  } else {
    yield put({
      type: Types.VERIFY_EMAIL_SUCCESS,
      result,
    });
  }
}

function* signUpUser(action) {
  try {
    console.log("Submit Action->" + JSON.stringify(action));
    let formBody = {};
    formBody.user = action.user;

    const signUpUrl = baseUrl2 + "/userSignup/post";
    const response = yield call(
      GetDataFromServer,
      signUpUrl,
      "POST",
      formBody.user
    );
    const result = yield response.json();
    console.log("Result Json" + result);
    if (result.error) {
      yield put({
        type: "SIGNUP_USER_SERVER_RESPONSE_ERROR",
        error: result.error,
      });
    } else {
      yield put({
        type: Types.SIGNUP_USER_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* saveEmployee(action) {
  try {
    console.log("Submit Action->" + JSON.stringify(action));
    let formBody = {};
    formBody.user = action.user;

    //const reqMethod = "POST";
    const AddEmpUrl = baseUrl2 + "/employee";

    const response = yield call(
      GetDataFromServer,
      AddEmpUrl,
      "POST",
      formBody.user
    );
    const result = yield response.json();
    console.log("Result Json" + result);
    if (result.error) {
      yield put({
        type: "EMPLOYEE_SAVE_DATABASE_SERVER_RESPONSE_ERROR",
        error: result.error,
      });
    } else {
      yield put({
        type: Types.EMPLOYEE_SAVE_DATABASE_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* updateEmployee(action) {
  try {
    console.log("Submit Action->" + JSON.stringify(action));
    let formBody = {};
    formBody.user = action.user;

    const UpdateEmpUrl = aws + "/Employee/" + formBody.user._id;
    const response = yield call(
      GetDataFromServer,
      UpdateEmpUrl,
      "PATCH",

      formBody.user
    );
    const result = yield response.json();
    console.log("Result Json" + result);
    if (result.error) {
      yield put({
        type: Types.UPDATE_EMPLOYEE_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.UPDATE_EMPLOYEE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteEmployee(action) {
  console.log("Get Action->" + JSON.stringify(action));
  let formBody = {};
  formBody._id = action._id;

  const deleteApi = aws + "/employee/" + formBody._id;

  try {
    let newData = yield call(deleteService, formBody, deleteApi);
    console.log(newData);
    newData._id = action._id;
    yield put({
      type: Types.DELETE_EMPLOYEE_SUCCESS,
      newData,
    });
  } catch (e) {
    console.log(e);
  }
}

// function* editEmployee(action) {
//   console.log("edit emp Get Action->" + JSON.stringify(action));
//   let formBody = {};
//   formBody._id = action._id;
//   const editEmpApi = aws + "/employee/" + formBody._id;
//   const response = yield call(GetDataFromServer, editEmpApi, "POST", formBody);
//   const result = yield response.json();
//   console.log("edit employee Result->" + JSON.stringify(result));
//   if (result.error) {
//     yield put({
//       type: Types.EDIT_EMPLOYEE_ERROR,
//       result,
//     });
//   } else {
//     yield put({
//       type: Types.EDIT_EMPLOYEE_SUCCESS,
//       result,
//     });
//   }
// }

function* getEmployeeById(action) {
  console.log("edit emp Get Action->" + JSON.stringify(action));
  let formBody = {};
  formBody.employeeId = action.employeeId;
  const editEmpApi = aws + "/get-employee-by-id";
  const response = yield call(GetDataFromServer, editEmpApi, "POST", formBody);
  const result = yield response.json();
  console.log("edit employee Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({
      type: Types.EDIT_EMPLOYEE_ERROR,
      result,
    });
  } else {
    yield put({
      type: Types.EDIT_EMPLOYEE_SUCCESS,
      result,
    });
  }
}

function* getEmployeeByEmail(action) {
  console.log("edit emp Get Action->" + JSON.stringify(action));
  let formBody = {};
  formBody.employeeID = action.employeeID;
  const editEmpApi = aws + "/Employee/email/" + formBody.employeeID;
  const response = yield call(GetDataFromServer, editEmpApi, "");
  const result = yield response.json();
  console.log("edit employee Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({
      type: Types.EDIT_EMPLOYEE_ERROR,
      result,
    });
  } else {
    yield put({
      type: Types.GET_EMPLOYEE_BY_EMAIL_SUCCESS,
      result,
    });
  }
}

function* getEmployee(action) {
  console.log("Get Action->" + JSON.stringify(action));

  const url = baseUrl2 + "/employee";

  const response = yield call(GetDataFromServer, url, "", "");

  const result = yield response.json();

  console.log("Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({
      type: Types.GET_EMPLOYEE_LIST_ERROR_RESPONSE,
      result,
    });
  } else {
    yield put({
      type: Types.GET_EMPLOYEE_LIST_SUCCESS_RESPONSE,
      result,
    });
  }
}

function* searchEmployee(action) {
  console.log("Search Action->" + JSON.stringify(action));

  let firstName = {};
  firstName = action.result.firstName;

  const reqMethod = "GET";
  const loginUrl = baseUrl2 + `/employee/search/${firstName}`;

  const response = yield call(GetDataFromServer, loginUrl, "", "");

  const result = yield response.json();

  console.log("Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({
      type: Types.SEARCH_EMP_ERROR,
      result,
    });
  } else {
    yield put({
      type: Types.SEARCH_EMP_SUCCESS,
      result,
    });
  }
}

function* saveProjectDetails(action) {
  try {
    console.log(
      "CREATE PROJECT Action->" +
        JSON.stringify(action.projectDetails.projectDetails)
    );

    let formBody = {};
    formBody = action.projectDetails.projectDetails;
    console.log("FormBody" + JSON.stringify(formBody));

    const reqMethod = "POST";
    // const loginUrl = baseUrl + '/project/create';
    const loginUrl = aws + "/create-project";
    const response = yield call(GetDataFromServer, loginUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json" + JSON.stringify(result));
    if (result.error) {
      yield put({
        type: Types.CREATE_PROJECT_DETAILS_SERVER_RESPONSE_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.CREATE_PROJECT_DETAILS_SERVER_RESPONSE_SUCESS,
        result,
      });
      console.log("PROJECT DETAILS" + JSON.stringify(result));
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

// function* editProject(action) {
//   console.log("edit pro Get Action->" + JSON.stringify(action));
//   let formBody = {};
//   formBody._id = action._id;
//   const editEmpApi = aws + "/get-project";
//   const response = yield call(GetDataFromServer, editEmpApi, "POST", formBody);
//   const result = yield response.json();
//   console.log("edit project Result->" + JSON.stringify(result));
//   if (result.error) {
//     yield put({ type: Types.EDIT_PROJECT_GET_DETAILS_ERROR, result });
//   } else {
//     yield put({ type: Types.EDIT_PROJECT_GET_DETAILS_SUCESS, result });
//   }
// }

function* updateProject(action) {
  try {
    console.log("Submit Action->" + JSON.stringify(action));
    let formBody = {};
    formBody.projectDetails = action.projectDetails;
    let userid = action.projectDetails.userId;
    console.log("Submit projdetails->" + JSON.stringify(action.projectDetails));

    const UpdateEmpUrl = aws + "/projects/:" + userid;
    const response = yield call(
      GetDataFromServer,
      UpdateEmpUrl,
      "PATCH",
      formBody.projectDetails
    );
    const result = yield response.json();
    console.log("Result Json" + JSON.stringify(result));
    if (result.error) {
      yield put({
        type: Types.UPDATE_PROJECT_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.UPDATE_PROJECT_SUCCESS,
        result,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* assignedProject(action) {
  console.log("assigned project Action->" + JSON.stringify(action));
  let formBody = {};
  formBody.employeeId = action.employeeId;

  const url = aws + "/get-assigned-project";

  const response = yield call(GetDataFromServer, url, "POST", formBody);
  const result = yield response.json();
  if (result.error) {
    yield put({
      type: Types.ASSIGNED_PROJECT_ERROR,
      result,
    });
  } else {
    yield put({
      type: Types.ASSIGNED_PROJECT_SUCCESS,
      result,
    });
  }
}

function* fetchListOfProjectDetails() {
  let formBody = {};
  const reqMethod = "GET";

  const loginUrl = aws + "/projects";

  const response = yield call(GetDataFromServer, loginUrl, "", "");

  const result = yield response.json();

  if (result.error) {
    yield put({
      type: Types.LIST_PROJECT_DETAILS_SERVER_RESPONSE_ERROR,
      result,
    });
  } else {
    yield put({
      type: Types.LIST_PROJECT_DETAILS_SERVER_RESPONSE_SUCESS,
      result,
    });
  }
}

function* deleteProjectDetails(action) {
  console.log("DELETE ACTIO" + JSON.stringify(action));
  try {
    // Ensure that your API returns the data of the updated todo
    let formBody = {};
    formBody._id = action._id;

    const deleteApi = baseUrl + "/projects/:" + formBody._id;

    const newData = yield call(
      deleteService,
      formBody,
      deleteApi
      //baseUrl
    ); // Refer sample to api calls in remote.js file
    yield put({
      type: Types.DELETE_PROJECT_SUCESS,
      newData,
    }); // pass in the id you updated and the newData returned from the API
    /// Other things can go here depending on what you want
  } catch (e) {
    console.log("SAGA ERROR");
  }
}

function* createClientDetails(action) {
  try {
    console.log(
      "CREATE CLIENT Action->" + JSON.stringify(action.clientDetails)
    );

    let formBody = {};
    formBody = action.clientDetails;
    console.log("FormBody" + JSON.stringify(formBody));

    const reqMethod = "POST";
    // const loginUrl = baseUrl + '/client/create';
    const loginUrl = aws + "/client/";
    const response = yield call(GetDataFromServer, loginUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json" + JSON.stringify(result));
    if (result.error) {
      yield put({
        type: Types.CREATE_CLIENT_DETAILS_SERVER_RESPONSE_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.CREATE_CLIENT_DETAILS_SERVER_RESPONSE_SUCCESS,
        result,
      });
      console.log("CLIENT DETAILS" + JSON.stringify(result));
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* updateClient(action) {
  try {
    console.log("Submit Action->" + JSON.stringify(action));
    let formBody = {};
    formBody.clientDetails = action.clientDetails;
    let userid = action.clientDetails._id;
    console.log(
      "Submit clientdetails->" + JSON.stringify(action.clientDetails)
    );

    const UpdateEmpUrl = aws + "/client/:" + userid;
    const response = yield call(
      GetDataFromServer,
      UpdateEmpUrl,
      "PATCH",

      formBody.clientDetails
    );
    const result = yield response.json();
    console.log("Result Json" + JSON.stringify(result));
    if (result.error) {
      yield put({
        type: Types.UPDATE_CLIENT_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.UPDATE_CLIENT_SUCCESS,
        result,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getListOfClientDetails() {
  const loginUrl = aws + "/client/";

  const response = yield call(GetDataFromServer, loginUrl, "", "");

  const result = yield response.json();

  if (result.error) {
    yield put({
      type: Types.LIST_CLIENT_DETAILS_SERVER_RESPONSE_ERROR,
      result,
    });
  } else {
    yield put({
      type: Types.LIST_CLIENT_DETAILS_SERVER_RESPONSE_SUCCESS,
      result,
    });
  }
}
function* deleteClientDetails(action) {
  console.log("DELETE ACTION" + JSON.stringify(action));
  try {
    // Ensure that your API returns the data of the updated todo
    let formBody = {};
    formBody._id = action._id;
    const deleteApi = baseUrl + "/client/:" + formBody._id;
    const newData = yield call(
      deleteService,
      formBody,
      deleteApi
      //baseUrl
    ); // Refer sample to api calls in remote.js file
    yield put({ type: Types.DELETE_CLIENT_SUCCESS, newData }); // pass in the id you updated and the newData returned from the API
    /// Other things can go here depending on what you want
  } catch (e) {
    console.log("SAGA ERROR");
  }
}

function* listProjects(action) {
  console.log("Get Action->" + JSON.stringify(action));

  const reqMethod = "GET";
  const loginUrl = "http://localhost:5066/get-all-projects";

  const response = yield call(
    GetDataFromServer,
    loginUrl,
    //baseUrl,
    "",
    ""
  );

  const result = yield response.json();

  console.log("Result->" + JSON.stringify(result));
  if (result.error) {
    yield put({
      type: Types.GET_EMPLOYEE_LIST_ERROR_RESPONSE,
      result,
    });
  } else {
    yield put({
      type: Types.GET_EMPLOYEE_LIST_SUCCESS_RESPONSE,
      result,
    });
  }
}

function* addVendorToDb(action) {
  try {
    // console.log(
    //   "CREATE VENDOR Action->" +
    //     JSON.stringify(action.projectDetails.projectDetails)
    // );

    let formBody = {};
    formBody = action.user;
    console.log("FormBody" + JSON.stringify(formBody));

    const reqMethod = "POST";
    // const loginUrl = baseUrl + '/project/create';
    const loginUrl = aws + "/vendor";
    const response = yield call(GetDataFromServer, loginUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json" + JSON.stringify(result));
    if (result.error) {
      yield put({
        type: Types.VENDOR_SAVE_DATABASE_SERVER_RESPONSE_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.VENDOR_SAVE_DATABASE_SERVER_RESPONSE_SUCCESS,
        result,
      });
      console.log("VENDOR DETAILS" + JSON.stringify(result));
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* fetchListOfVendorDetails() {
  let formBody = {};
  const reqMethod = "GET";

  const loginUrl = aws + "/Vendor";

  const response = yield call(GetDataFromServer, loginUrl, "", "");

  const result = yield response.json();

  if (result.error) {
    yield put({
      type: Types.LIST_VENDOR_DETAILS_SERVER_RESPONSE_ERROR,
      result,
    });
  } else {
    yield put({
      type: Types.LIST_VENDOR_DETAILS_SERVER_RESPONSE_SUCESS,
      result,
    });
  }
}

function* deleteVendorDetails(action) {
  console.log("DELETE ACTIO" + JSON.stringify(action));
  try {
    // Ensure that your API returns the data of the updated todo
    let formBody = {};
    formBody._id = action._id;
    const deleteApi = baseUrl + "/Vendor/:" + formBody._id;
    const newData = yield call(
      deleteService,
      formBody,
      deleteApi
      //baseUrl
    ); // Refer sample to api calls in remote.js file
    newData._id = action._id;
    yield put({ type: Types.DELETE_VENDOR_SUCESS, newData }); // pass in the id you updated and the newData returned from the API
    /// Other things can go here depending on what you want
  } catch (e) {
    console.log("SAGA ERROR");
  }
}

function* updateVendor(action) {
  try {
    console.log("Submit Action->" + JSON.stringify(action));
    let formBody = {};
    formBody.vendorDetails = action.vendorDetails;
    let vendid = action.vendorDetails._id;
    console.log("Submit venddetails->" + JSON.stringify(action.vendorDetails));

    const UpdateVendUrl = aws + "/Vendor/:" + vendid;
    const response = yield call(
      GetDataFromServer,
      UpdateVendUrl,
      "PATCH",

      formBody.vendorDetails
    );
    const result = yield response.json();
    console.log("Result Json" + JSON.stringify(result));
    if (result.error) {
      yield put({
        type: Types.UPDATE_VENDOR_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.UPDATE_VENDOR_SUCCESS,
        result,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* logoutUser() {
  yield put({ type: "LOGOUT_ASYNC" });
}

function* forgotPassword(action) {
  console.log("Get Action->" + JSON.stringify(action));

  let formBody = {};
  formBody.email = action.email;
  const reqMethod = "POST";
  const forgotPasswordUrl = "http://localhost:5066/forgot-password";
  const response = yield call(
    GetDataFromServer,

    forgotPasswordUrl,
    //baseUrl,
    reqMethod,
    formBody
  );
  const result = yield response.json();

  console.log("Result->" + JSON.stringify(result));

  if (!result.error) {
    yield put({ type: "FORGOT_PASSWORD_ASYNC", payload: action.payload });
  }
}

function* handleStatus(action) {
  try {
    let formBody = {};
    formBody = action.timesheet;
    formBody._id = action.timesheet._id;
    const loginUrl = baseUrl + "/TimeSheet/Status/" + formBody._id;
    const response = yield call(GetDataFromServer, loginUrl, "PATCH", formBody);
    const result = yield response.json();
    console.log("Result Json" + result);
    if (result.error) {
      yield put({
        type: Types.TIMESHEET_STATUS_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.TIMESHEET_STATUS_SUCCESS,
        result,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* fileUploadTimesheet(action) {
  try {
    let formBody = {};
    formBody = action.timesheet;
    console.log("formbody", formBody);
    const loginUrl = baseUrl + "/TimeSheet/upload/";
    const response = yield call(GetDataFromServer, loginUrl, "POST", formBody);
    const result = yield response.json();
    console.log("Result Json" + result);
    if (result.error) {
      yield put({
        type: Types.FILEUPLOAD_TIMESHEET_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.FILEUPLOAD_TIMESHEET_SUCCESS,
        result,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}
export default function* rootSaga(params) {
  yield takeLatest(Types.LOGIN_USER, fetchLoginUser);
  yield takeLatest(Types.LOGOUT, logoutUser);
  yield takeLatest(Types.FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(Types.CREATE_TIMESHEET, fetchTimeSheet);
  yield takeLatest(Types.EDIT_TIMESHEET, editTimesheet);
  yield takeLatest(Types.UPDATE_TIMESHEET, updateTimesheet);
  yield takeLatest(Types.DELETE_TIMESHEET, deleteTimesheetDetails);

  // yield takeLatest(Types.CREATE_TIMESHEET_WORKINGHOUR, fetchTimeSheetCalander);
  yield takeLatest(
    Types.CREATE_TIMESHEET_SAVE_WORKINGHOUR,
    fetchSaveTimeSheetCalander
  );
  yield takeLatest(Types.TIMESHEET_LIST, getTimesheetDetails);
  yield takeLatest(Types.EMP_TIMESHEET_LIST, getEmpTimesheetlist);
  yield takeLatest(Types.APPROVE_TIMESHEET, approveTimesheet);
  yield takeLatest(Types.LIST_EMPLOYEE_DETAILS, fetchListOfEmployee);
  yield takeLatest(Types.CREATE_PROJECT, fetchCreateProjectDetails);
  // yield takeEvery(Types.EDIT_PROJECT_GET_DETAILS, editProject);
  yield takeEvery(Types.SIGNUP_USER, signUpUser);
  yield takeEvery(Types.CHECK_EMAIL, checkEmail);
  yield takeEvery(Types.VERIFY_EMAIL, verifyEmail);
  yield takeEvery(Types.EMPLOYEE_SAVE_DATABASE, saveEmployee);
  yield takeEvery(Types.UPDATE_EMPLOYEE, updateEmployee);
  yield takeLatest(Types.DELETE_EMPLOYEE, deleteEmployee);
  //yield takeEvery(Types.EDIT_EMPLOYEE, editEmployee);
  yield takeEvery(Types.GET_EMPLOYEE_BY_ID, getEmployeeById);
  yield takeEvery(Types.GET_EMPLOYEE_BY_EMAIL, getEmployeeByEmail);

  yield takeEvery(Types.GET_EMPLOYEE_LIST, getEmployee);
  yield takeEvery(Types.SEARCH_EMP, searchEmployee);
  // yield takeEvery(Types.CREATE_PROJECT, saveProjectDetails);
  yield takeEvery(Types.UPDATE_PROJECT, updateProject);
  yield takeEvery(Types.ASSIGNED_PROJECT, assignedProject);
  yield takeLatest(Types.LIST_PROJECT_DETAILS, fetchListOfProjectDetails);
  yield takeLatest(Types.DELETE_PROJECT, deleteProjectDetails);
  yield takeEvery(Types.PROJECT_LIST, listProjects);
  yield takeLatest(Types.VENDOR_SAVE_DATABASE, addVendorToDb);
  yield takeEvery(Types.UPDATE_CLIENT, updateClient);
  yield takeLatest(Types.LIST_CLIENT_DETAILS, getListOfClientDetails);
  yield takeLatest(Types.DELETE_CLIENT, deleteClientDetails);
  yield takeEvery(Types.CREATE_CLIENT, createClientDetails);
  yield takeEvery(Types.TIMESHEET_STATUS, handleStatus);
  yield takeLatest(Types.LIST_VENDOR_DETAILS, fetchListOfVendorDetails);
  yield takeLatest(Types.DELETE_VENDOR, deleteVendorDetails);
  yield takeEvery(Types.UPDATE_VENDOR, updateVendor);
  yield takeEvery(Types.FILEUPLOAD_TIMESHEET, fileUploadTimesheet);

  console.log("ROOT SAGA");
}
