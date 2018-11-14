const responseReducer = (state = emptyResponse(), action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_STARTED": {
      return { ...state, loading: true };
    }
    case "FETCH_SUCCESS": {
      const { response } = payload;
      return { ...state, surveyResponses: response, loading: false };
    }
    case "FETCH_ERROR": {
      const { error } = payload;
      return { ...emptyResponse(), error: error, loading: false };
    }
    default: {
      return state;
    }
  }
};

const emptyResponse = () => ({
  _id: undefined,
  surveyRef: "",
  userRef: "",
  fieldResponses: [],
  loading: false,
  error: null
});

export default responseReducer;
