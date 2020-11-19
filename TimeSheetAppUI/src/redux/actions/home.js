import * as Types from "./types";

export const signupUser = (user) => ({
  type: Types.SIGNUP_USER,
  user,
});

export const checkEmail = (email) => ({
  type: Types.CHECK_EMAIL,
  email,
});

export const verifyEmail = (_id, verificationtype) => ({
  type: Types.VERIFY_EMAIL,
  _id,
  verificationtype,
});

export const addEmployee = (user) => ({
  type: Types.EMPLOYEE_SAVE_DATABASE,
  user,
});

export const addClient = (user) => ({
  type: Types.CLIENT_SAVE_DATABASE,
  user,
});

export const editEmployee = (_id) => ({
  type: Types.EDIT_EMPLOYEE,
  _id,
});

export const getEmployeeById = (employeeId) => ({
  type: Types.GET_EMPLOYEE_BY_ID,
  employeeId,
});

export const updateEmployee = (user) => ({
  type: Types.UPDATE_EMPLOYEE,
  user,
});

export const deleteEmployee = (_id) => ({
  type: Types.DELETE_EMPLOYEE,
  _id,
});
