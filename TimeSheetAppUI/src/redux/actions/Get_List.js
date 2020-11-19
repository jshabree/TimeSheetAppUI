import * as Types from "./types";

export const getEmp = (result) => ({
  type: Types.GET_EMPLOYEE_LIST,
  result,
});

export const searchEmp = (result) => ({
  type: Types.SEARCH_EMP,
  result,
});

export const selectedEmp = (selectedEmp) => ({
  type: Types.GET_EMPLOYEE_SELECTED_LIST,
  selectedEmp,
});

export const getPro = (result) => ({
  type: Types.PROJECT_LIST,
  result,
});

export const getEmpInfo = (result) => ({
  type: Types.PROJECT_LIST,
  result,
});

export const getTimesheet = (data) => ({
  type: Types.TIMESHEET_LIST,
  data,
});

export const approveReject = (data) => ({
  type: Types.APPROVE_TIMESHEET,
  data,
});

export const timesheetList = (employeeID) => {
  return {
    type: Types.EMP_TIMESHEET_LIST,
    employeeID,
  };
};

//you will get the value based on Id not by email as name suggest
export const getEmployeeByEmail = (employeeID) => {
  return {
    type: Types.GET_EMPLOYEE_BY_EMAIL,
    employeeID,
  };
};
