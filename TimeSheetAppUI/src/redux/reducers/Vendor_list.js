import * as Types from "../actions/types";

const initialUserObj = {
  result: [],
};

const handleCreateVendor = (state, action) => {
  let newState = { ...state };
  if (action.result !== undefined) {
    let r = state.result;
    r.push(action.result);
    newState = Object.assign({}, state, { result: r });
  }
  return { ...newState };
};

const handleVendorList = (state, action) => {
  console.log("ListVendor" + JSON.stringify(action));
  let newState = { ...state };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, { result: action.result });
  }

  return { ...newState };
};

// const handleUpdateVendor = (state, action) => {
//   let newState = { ...state };
//   let filteredState = state.result.filter(
//     (eachVend) => eachVend._id !== action.newData._id
//   ); // Use filter method to remoreove the item that has been deleted from the st
//   console.log("DELETE" + JSON.stringify(state.result));
//   console.log("REducer DELETE" + JSON.stringify(action._id));
//   console.log("sds" + newState);
//   filteredState.push(action.newData);
//   newState = Object.assign({}, state, { result: filteredState });
//   return { ...newState };
// };

const handleDeleteRequest = (state, action) => {
  let newState = { ...state };
  let filteredState = state.result.filter(
    (eachVend) => eachVend._id !== action.newData._id
  ); // Use filter method to remoreove the item that has been deleted from the st
  console.log("DELETE" + JSON.stringify(state.result));
  console.log("REducer DELETE" + JSON.stringify(action._id));
  console.log("sds" + newState);
  newState = Object.assign({}, state, { result: filteredState });
  return { ...newState };
};

export default (state = initialUserObj, action = {}) => {
  switch (action.type) {
    case Types.VENDOR_SAVE_DATABASE:
      return state;
    case Types.VENDOR_SAVE_DATABASE_SERVER_RESPONSE_SUCCESS:
      return handleCreateVendor(state, action);
    case Types.VENDOR_SAVE_DATABASE_SERVER_RESPONSE_ERROR:
      return { ...state };
    case Types.DELETE_VENDOR_SUCESS:
      return handleDeleteRequest(state, action);
    case Types.LIST_VENDOR_DETAILS_SERVER_RESPONSE_SUCESS:
      return handleVendorList(state, action);
    // case Types.UPDATE_VENDOR:
    //   return handleUpdateVendor(state, action);
    default:
      return state;
  }
};
