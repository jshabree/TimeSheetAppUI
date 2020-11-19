import * as Type from "../actions/types";
const initialUserObj = {
  result: [],
};

const handleProjectList = (state, action) => {
  console.log("ListProject" + JSON.stringify(action));
  let newState = { ...state };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, { result: action.result });
  }

  return { ...newState };
};

const handleCreateProject = (state, action) => {
  //console.log("CreateProkect" + JSON.stringify(action.result));
  let newState = { ...state };
  if (action.result !== undefined) {
    let r = state.result;
    r.push(action.result);
    // newState = Object.assign({}, state, action.result, {result : });
    newState = Object.assign({}, state, { result: r });
  }
  return { ...newState };
};

const handleDeleteRequest = (state, action) => {
  let newState = { ...state };
  let filteredState = state.result.filter(
    (eachProj) => eachProj._id !== action.newData._id
  ); // Use filter method to remoreove the item that has been deleted from the st
  console.log("DELETE" + JSON.stringify(state.result));
  console.log("REducer DELETE" + JSON.stringify(action._id));
  console.log("sds" + newState);
  newState = Object.assign({}, state, { result: filteredState });
  return { ...newState };
};

export default (state = initialUserObj, action = {}) => {
  switch (action.type) {
    case Type.CREATE_PROJECT:
      return { ...state }; //{ ...state, projectDetails: action.projectDetails };
    case Type.CREATE_PROJECT_DETAILS_SERVER_RESPONSE_SUCESS:
      return handleCreateProject(state, action);
    // return { ...state };
    case Type.CREATE_PROJECT_DETAILS_SERVER_RESPONSE_ERROR:
      return { ...state };
    // case Type.UPDATE_PROJECT_SUCCESS:
    //   return handleProjectList(state, action);
    case Type.DELETE_PROJECT_SUCESS:
      return handleDeleteRequest(state, action);
    case Type.LIST_PROJECT_DETAILS_SERVER_RESPONSE_SUCESS:
      return handleProjectList(state, action);
    // case Type.EDIT_PROJECT_GET_DETAILS_SUCESS:
    //   return handleProjectList(state, action);
    // case Type.EDIT_PROJECT_GET_DETAILS_ERROR:
    //   return { ...state };
    // case Type.ASSIGNED_PROJECT_ERROR:
    //   return { ...state };
    // case Type.ASSIGNED_PROJECT_SUCCESS:
    //   return handleProjectList(state, action);
    default:
      return { ...state };
  }
};
