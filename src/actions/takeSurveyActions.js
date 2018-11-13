import { get, post } from "axios";

export const clearResponses = () => ({ type: "CLEAR_RESPONSES" });
export const setResponse = (fieldId, response) => ({
  type: "SET_RESPONSE",
  payload: { fieldId, response }
});
export const handleUserCheck = (index, key) => ({
  type: "HANDLE_USER_CHECK",
  payload: { index, key }
});

export const fetchStarted = () => ({ type: "FETCH_STARTED" });
export const fetchSuccess = response => ({
  type: "FETCH_SUCCESS",
  payload: { response }
});
export const fetchError = error => ({
  type: "FETCH_ERROR",
  payload: { error }
});

export const submitStarted = () => ({ type: "SUBMIT_STARTED" });
export const submitSuccess = response => ({
  type: "SUBMIT_SUCCESS",
  payload: { response }
});
export const submitError = error => ({
  type: "SUBMIT_ERROR",
  payload: { error }
});

export const fetchSurvey = id => async (dispatch, getState) => {
  dispatch(fetchStarted());
  try {
    const response = await get(
      `${process.env.REACT_APP_API_URL}/api/survey/${id}`,
      {
        auth: getState().auth
      }
    );
    if (response.status !== 200) {
      throw new Error("Fetch Survey Failed");
    }
    dispatch(fetchSuccess(response.data));
  } catch (error) {
    dispatch(fetchError(error));
  }
};

export const submitResponse = () => async (dispatch, getState) => {
  dispatch(submitStarted());
  try {
    const response = await post(
      `${process.env.REACT_APP_API_URL}/api/response`,
      {
        surveyRef: getState().takeSurvey._id,
        userRef: getState().auth._id,
        fieldResponses: getState().takeSurvey.responses
      },
      {
        auth: getState().auth
      }
    );
    if (response.status !== 200) {
      throw new Error("Save Survey Failed");
    }
    dispatch(submitSuccess(response.data));
  } catch (error) {
    dispatch(submitError(error));
  }
};
