import * as Types from "./types";

export const createRequestSubmit = (timesheet) => {
  return {
    type: Types.CREATE_TIMESHEET,
    timesheet,
  };
};

export const createWorkingHourTimeSheet = (submitTimeSheet) => {
  return {
    type: Types.CREATE_TIMESHEET_WORKINGHOUR,
    submitTimeSheet,
  };
};

export const createSaveTimeSheet = (submitTimeSheet) => {
  return {
    type: Types.CREATE_TIMESHEET_SAVE_WORKINGHOUR,
    submitTimeSheet,
  };
};

export const assignedProject = (employeeId) => {
  return {
    type: Types.ASSIGNED_PROJECT,
    employeeId,
  };
};

export const editTimesheet = (_id) => {
  return {
    type: Types.EDIT_TIMESHEET,
    _id,
  };
};

export const updateTimesheet = (timesheet) => {
  return {
    type: Types.UPDATE_TIMESHEET,
    timesheet,
  };
};

export const deleteTimesheet = (timesheetid) => {
  return {
    type: Types.DELETE_TIMESHEET,
    timesheetid,
  };
};

export const updateStatusTimesheet = (timesheet) => {
  return {
    type: Types.TIMESHEET_STATUS,
    timesheet,
  };
};

export const fileUploadData = (timesheet) => {
  return {
    type: Types.FILEUPLOAD_TIMESHEET,
    timesheet,
  };
};
