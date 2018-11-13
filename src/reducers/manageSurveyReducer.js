import formatDate from "../services/formatDate";

const manageSurveyReducer = (state = emptySurvey(), action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_FIELD": {
      return {
        ...state,
        fields: [...state.fields, generateField(payload.fieldType)]
      };
    }
    case "REMOVE_FIELD": {
      return {
        ...state,
        fields: state.fields.filter(
          (field, index) => payload.fieldIndex !== index
        )
      };
    }
    case "ADD_OPTION": {
      const { fieldIndex, label } = payload;
      state.fields[fieldIndex].options = [
        ...state.fields[fieldIndex].options,
        label
      ];
      return { ...state };
    }
    case "REMOVE_OPTION": {
      const { fieldIndex, label } = payload;
      const { options, expectedResponse } = state.fields[fieldIndex];
      state.fields[fieldIndex].options = options.filter(
        option => option !== label
      );
      state.fields[fieldIndex].expectedResponse = expectedResponse.filter(
        response => response !== label
      );
      return { ...state };
    }
    case "SET_QUESTION": {
      const { fieldIndex, question } = payload;
      state.fields[fieldIndex].question = question;
      return { ...state };
    }
    case "SET_EXPECTED_TEXT": {
      const { fieldIndex, response } = payload;
      state.fields[fieldIndex].expectedResponse = response;
      return { ...state };
    }
    case "SET_EXPECTED_OPTION": {
      const { fieldIndex, label } = payload;
      const { expectedResponse } = state.fields[fieldIndex];
      const isExpected = expectedResponse.indexOf(label) !== -1;

      const newExpected = isExpected
        ? expectedResponse.filter(response => response !== label)
        : [...expectedResponse, label];

      state.fields[fieldIndex].expectedResponse = newExpected;
      return { ...state };
    }

    case "SET_NAME": {
      const { input } = payload;
      return { ...state, name: input };
    }
    case "SET_DESCRIPTION": {
      const { input } = payload;
      return { ...state, description: input };
    }
    case "SET_START_DATE": {
      const { input } = payload;
      return { ...state, startDate: input };
    }
    case "SET_END_DATE": {
      const { input } = payload;
      return { ...state, endDate: input };
    }
    case "CLEAR_SURVEY": {
      return { ...state, ...emptySurvey() };
    }
    case "FETCH_STARTED": {
      return { ...state, loading: true };
    }
    case "FETCH_SUCCESS": {
      const { response } = payload;
      const startDate = formatDate.forHTML(response.startDate);
      const endDate = formatDate.forHTML(response.endDate);
      return { ...state, ...response, loading: false, startDate, endDate };
    }
    case "FETCH_ERROR": {
      const { error } = payload;
      return { ...emptySurvey(), error: error, loading: false };
    }
    case "CREATE_STARTED": {
      return { ...state, loading: true };
    }
    case "CREATE_SUCCESS": {
      return { ...emptySurvey(), loading: false };
    }
    case "CREATE_ERROR": {
      const { error } = payload;
      return { ...state, error: error, loading: false };
    }
    case "UPDATE_STARTED": {
      return { ...state, loading: true };
    }
    case "UPDATE_SUCCESS": {
      return { ...emptySurvey(), loading: false };
    }
    case "UPDATE_ERROR": {
      const { error } = payload;
      return { ...state, error: error, loading: false };
    }
    case "DELETE_STARTED": {
      return { ...state, loading: true };
    }
    case "DELETE_SUCCESS": {
      return { ...emptySurvey(), loading: false };
    }
    case "DELETE_ERROR": {
      const { error } = payload;
      return { ...state, error: error, loading: false };
    }
    default: {
      return state;
    }
  }
};

const generateField = fieldType => ({
  fieldType: fieldType,
  question: "",
  options: {},
  expectedResponse: []
});
const emptySurvey = () => ({
  _id: undefined,
  name: "",
  description: "",
  authorRef: "",
  startDate: formatDate.forHTML(),
  endDate: "",
  fields: [],
  loading: false,
  error: null
});

export default manageSurveyReducer;
