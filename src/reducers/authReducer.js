const authReducer = (
  state = {
    ...clearUserInfo(),
    loading: false,
    error: {}
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "AUTHENTICATE_STARTED": {
      return { ...state, loading: true };
    }
    case "AUTHENTICATE_SUCCESS": {
      return {
        ...state,
        loading: false,
        loggedIn: true,
        ...payload,
        error: {}
      };
    }
    case "AUTHENTICATE_ERROR": {
      const { error } = payload;
      return {
        ...state,
        ...clearUserInfo(),
        error: error,
        loading: false
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        ...clearUserInfo()
      };
    }
    default: {
      return state;
    }
  }
};

const clearUserInfo = () => ({
  email: "",
  username: "",
  _id: "",
  loggedIn: false,
  error: "",
  password: ""
});

export default authReducer;
