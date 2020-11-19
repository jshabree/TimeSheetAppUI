import * as Type from "../actions/types";

const initialObj = {
  result: [],
};

function handleTimesheetData(state, action) {
  let newState = { ...state };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, { result: action.result });
  }
  return { ...newState };
}

function deleteTimesheet(state, action) {
  let newState = { ...state };
  let filteredState = state.result.filter(
    (eachProj) => eachProj._id !== action.newData._id
  ); // Use filter method to remoreove the item that has been deleted from the st
  newState = Object.assign({}, state, { result: filteredState });
  return { ...newState };
}

function handleStatus(state, action) {
  let newState = { ...state };
  let filteredState = state.result.filter((eachProj) => {
    if (eachProj._id !== action.result._id) {
      return eachProj;
    }
    if (eachProj._id === action.result._id) {
      eachProj.status = action.result.status;
      return eachProj;
    }
  });
  newState = Object.assign({}, state, { result: filteredState });
  return { ...newState };
}

export default (state = initialObj, action) => {
  switch (action.type) {
    case Type.CREATE_TIMESHEET:
      // return Object.assign({}, state);
      return { ...state, timesheet: action.timesheet };
    case Type.CREATE_TIMESHEET_WORKINGHOUR:
      return { ...state };
    case Type.CREATE_TIMESHEET_SAVE_WORKINGHOUR:
      return { ...state };
    case Type.TIMESHEET_LIST_ERROR:
      return { ...state };
    case Type.TIMESHEET_LIST_SUCCESS:
      return handleTimesheetData(state, action);
    case Type.APPROVE_TIMESHEET_ERROR:
      return { ...state };
    case Type.APPROVE_TIMESHEET_SUCCESS:
      return handleTimesheetData(state, action);
    case Type.EDIT_TIMESHEET:
      return Object.assign({}, state, { result: {} });
    case Type.EDIT_TIMESHEET_SUCCESS:
      return handleTimesheetData(state, action);
    case Type.EDIT_TIMESHEET_ERROR:
      return { ...state };
    case Type.DELETE_TIMESHEET_SUCCESS:
      return deleteTimesheet(state, action);
    case Type.DELETE_TIMESHEET_ERROR:
      return { ...state };
    case Type.TIMESHEET_STATUS_SUCCESS:
      return handleStatus(state, action);
    case Type.FILEUPLOAD_TIMESHEET_SUCCESS:
      return state;
    case Type.FILEUPLOAD_TIMESHEET_ERROR:
      return state;
    default:
      return { ...state };
  }
};
