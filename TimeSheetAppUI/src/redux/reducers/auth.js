import * as Types from "../actions/types";

const initialUserObj = {
  signUpUsersList: [],
  pending: false,
  loggedIn: false,
  isValidToken: false,
  token: "",
  isBusiness: false,
  empDetails: {},
  result: {},
  user: {
    _id: "",
    userId: "",
    email: "",
    firstName: "",
    registered: false,
    refreshToken: "",
    expiresIn: "",
    emailVerified: false,
    validSince: "",
    disabled: false,
    lastLoginAt: "",
    createdAt: "",
  },
  checkEmail: {},
  verifyEmail: {},
  message: "",
};

const handleLoginServerResponseSuccess = (state, action) => {
  console.log("REdux" + JSON.stringify(state));
  console.log("REdux action" + JSON.stringify(action));

  let newState = { ...state };
  if (action.result !== undefined && action.result.user.role === "admin") {
    newState = Object.assign({}, state, {
      loggedIn: true,
      user: Object.assign({}, action.result.user, { role: 1 }),
      message: "",
      token: action.result.token,
    });
    sessionStorage.setItem("Token", action.result.token);

    // console.log("token type of", typeof action.result.token);
    // } else if (action.result !== undefined && action.result.status === 2) {
    //   newState = Object.assign({}, state, {
    //     loggedIn: false,
    //     user: {},
    //     message: "Email verification is pending",
    //   });
    // } else if (action.result !== undefined && action.result.status === 0) {
    //   newState = Object.assign({}, state, {
    //     loggedIn: false,
    //     user: {},
    //     message: "Invalid email/password",
    //   });
  } else {
    newState = Object.assign({}, state, {
      loggedIn: true,
      user: Object.assign({}, action.result.user),
      message: "",
      token: action.result.token,
    });
  }
  console.log("STATE->" + JSON.stringify(newState));
  return { ...newState };
};
const handleLoginServerResponseError = (state, action) => {
  let newState = { ...state };
  return { ...newState };
};

export default (state = initialUserObj, action) => {
  switch (action.type) {
    case Types.LOGIN_USER:
      return Object.assign({}, state, {
        loggedIn: false,
        isValidToken: false,
        pending: true,
      });
    case Types.LOGIN_USER_SERVER_RESPONSE_ERROR:
      return handleLoginServerResponseError(state);
    case Types.LOGIN_USER_SERVER_RESPONSE_SUCCESS:
      return handleLoginServerResponseSuccess(state, action);
    case Types.CHECK_EMAIL_SUCCESS:
      let newState = { ...state };
      if (action.result !== undefined) {
        newState = Object.assign({}, state, {
          checkEmail: Object.assign({}, action.result),
        });
      }
      return newState;
    case Types.CHECK_EMAIL_ERROR:
      return { ...state };
    case Types.VERIFY_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        result: Object.assign({}, action.result),
      });
    case Types.VERIFY_EMAIL_ERROR:
      return { ...state };
    case "LOGOUT_ASYNC":
      return Object.assign({}, state, { loggedIn: false });
    case "FORGOT_PASSWORD_ASYNC":
      return {};
    default:
      return state;
  }
};
