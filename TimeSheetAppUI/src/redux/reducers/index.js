import { combineReducers } from "redux";
import timesheet from "./CreateNewRequest";
import auth from "./auth";
import empList from "./Employee_list";
import searchList from "./Get_List";
import projectDetails from "./ProjectDetails";
import clientDetails from "./ClientDetails";
import vendorList from "./Vendor_list";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// cont rootReducer = combineReducers({auth})

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "timesheet",
    "empList",
    "projectDetails",
    "searchList",
    "vendorList",
  ],
};
const rootReducer = combineReducers({
  auth,
  timesheet,
  empList,
  projectDetails,
  clientDetails,
  searchList,
  vendorList,
});

export default persistReducer(persistConfig, rootReducer);
