import * as Type from "../actions/types";
const initialUserObj = {
  result: [],
};

const handleClientList = (state, action) => {
  console.log("ListClient" + JSON.stringify(action));
  let newState = { ...state };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, { result: action.result });
  }

  return { ...newState };
};

const handleCreateClient = (state, action) => {
  let newState = { ...state };
  if (action.result !== undefined) {
    let r = state.result;
    r.push(action.result);
    newState = Object.assign({}, state, { result: r });
  }
  return { ...newState };
};

const handleDeleteRequest = (state, action) => {
  let newState = { ...state };
  let filteredState = state.result.filter(
    (eachCli) => eachCli._id !== action.newData._id
  ); 
  // console.log("DELETE" + JSON.stringify(state.result));
  // console.log("Reducer DELETE" + JSON.stringify(action._id));
  // console.log("sds" + newState);
  newState = Object.assign({}, state, { result: filteredState });
  return { ...newState };
};

const handleUpdateClient = (state, action) => {
  let newState = {
    ...state
  };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      result: action.result
    });
  }
  return {
    ...newState
  };
};

export default (state = initialUserObj, action = {}) => {
  switch (action.type) {
    case Type.CREATE_CLIENT:
      return { ...state };
    case Type.CREATE_CLIENT_DETAILS_SERVER_RESPONSE_SUCCESS:
      return handleCreateClient(state, action);
    case Type.UPDATE_CLIENT_SUCCESS:
      return handleUpdateClient(state, action);
    case Type.CREATE_CLIENT_DETAILS_SERVER_RESPONSE_ERROR:
      return { ...state };
    case Type.DELETE_CLIENT_SUCCESS:
      return handleDeleteRequest(state, action);
    case Type.LIST_CLIENT_DETAILS_SERVER_RESPONSE_SUCCESS:
      return handleClientList(state, action);
    default:
      return { ...state };
  }
};
