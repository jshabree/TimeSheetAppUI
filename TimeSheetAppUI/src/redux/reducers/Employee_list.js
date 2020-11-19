import * as Types from "../actions/types";

const initialUserObj = {
  result: [],
};

const handleEmployeeListError = (state, action) => {
  let newState = {
    ...state,
  };
  return {
    ...newState,
  };
};

const handleEmployeeList = (state, action) => {
  console.log("Redux" + JSON.stringify(action));
  let newState = {
    ...state,
  };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      result: JSON.parse(JSON.stringify(action.result)),
    });
    console.log("New" + JSON.stringify(newState));
  }
  return {
    ...newState,
  };
};

const handleEmployeeDetailsByEmail = (state, action) => {
  console.log("Redux" + JSON.stringify(action));
  let newState = {
    ...state,
  };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      currentEmployee: JSON.parse(JSON.stringify(action.result[0])),
    });
    console.log("New" + JSON.stringify(newState));
  }
  return {
    ...newState,
  };
};
export default (state = initialUserObj, action = {}) => {
  switch (action.type) {
    case Types.LIST_EMPLOYEE_DETAILS:
      return {
        ...state,
      };
    case Types.LIST_EMPLOYEE_DETAILS_SERVER_RESPONSE_SUCESS:
      return handleEmployeeList(state, action);
    case Types.LIST_EMPLOYEE_DETAILS_SERVER__RESPONSE_ERROR:
      return handleEmployeeListError(state);
    case Types.DELETE_EMPLOYEE_SUCCESS:
      const newState = state.result.filter(
        (eachProj) => eachProj._id !== action.newData._id
      );
      console.log("DELETE employee" + JSON.stringify(state.result));
      console.log("REducer DELETE employee" + JSON.stringify(action._id));
      console.log("sdemployee state" + newState);
      return {
        newState,
      };
    // case Types.EDIT_EMPLOYEE_SUCCESS:
    //     console.log("edit employee" + JSON.stringify(action.result));
    //     return handleEmployeeList(state, action);
    // case Types.EDIT_EMPLOYEE_ERROR:
    //     return handleEmployeeListError(state);
    case Types.UPDATE_EMPLOYEE_SUCCESS:
      return handleEmployeeList(state, action);
    case Types.GET_EMPLOYEE_BY_EMAIL_SUCCESS:
      return handleEmployeeDetailsByEmail(state, action);
    default:
      return state;
  }
};
