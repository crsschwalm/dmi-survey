import axios, { get, put, post } from "axios";

export const setName = input => ({ type: "SET_NAME", payload: { input } });
export const setDescription = input => ({
  type: "SET_DESCRIPTION",
  payload: { input }
});
export const setStartDate = input => ({
  type: "SET_START_DATE",
  payload: { input }
});
export const setEndDate = input => ({
  type: "SET_END_DATE",
  payload: { input }
});
export const clearSurvey = () => ({ type: "CLEAR_SURVEY" });

export const fetchStarted = () => ({ type: "FETCH_STARTED" });
export const fetchSuccess = response => ({
  type: "FETCH_SUCCESS",
  payload: { response }
});
export const fetchError = error => ({
  type: "FETCH_ERROR",
  payload: { error }
});

export const createStarted = () => ({ type: "CREATE_STARTED" });
export const createSuccess = response => ({
  type: "CREATE_SUCCESS",
  payload: { response }
});
export const createError = error => ({
  type: "CREATE_ERROR",
  payload: { error }
});

export const updateStarted = () => ({ type: "UPDATE_STARTED" });
export const updateSuccess = response => ({
  type: "UPDATE_SUCCESS",
  payload: { response }
});
export const updateError = error => ({
  type: "UPDATE_ERROR",
  payload: { error }
});

export const deleteStarted = () => ({ type: "DELETE_STARTED" });
export const deleteSuccess = response => ({
  type: "DELETE_SUCCESS",
  payload: { response }
});
export const deleteError = error => ({
  type: "DELETE_ERROR",
  payload: { error }
});

export const fetchSurvey = id => async (dispatch, getState) => {
  dispatch(fetchStarted());
  try {
    const response = await get(
      `${process.env.REACT_APP_API_URL}/api/survey/${id}?show-answers=true`,
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
    throw error;
  }
};

export const deleteSurvey = () => async (dispatch, getState) => {
  dispatch(deleteStarted());
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/survey/${getState().manageSurvey
        ._id}`,
      { auth: getState().auth }
    );
    if (response.status !== 200) {
      throw new Error("Delete Survey Failed");
    }
    dispatch(deleteSuccess());
  } catch (error) {
    dispatch(deleteError());
    throw error;
  }
};

export const createSurvey = () => async (dispatch, getState) => {
  dispatch(createStarted());
  try {
    const response = await post(
      `${process.env.REACT_APP_API_URL}/api/survey`,
      {
        ...getState().manageSurvey,
        authorRef: getState().auth._id
      },
      {
        auth: getState().auth
      }
    );
    if (response.status !== 200) {
      throw new Error("Create Survey Failed");
    }
    dispatch(createSuccess());
  } catch (error) {
    dispatch(createError(error));
    throw error;
  }
};

export const updateSurvey = () => async (dispatch, getState) => {
  dispatch(updateStarted());
  try {
    const response = await put(
      `${process.env.REACT_APP_API_URL}/api/survey/${getState().manageSurvey
        ._id}`,
      getState().manageSurvey,
      {
        auth: getState().auth
      }
    );
    if (response.status !== 200) {
      throw new Error("Update Survey Failed");
    }
    dispatch(updateSuccess());
  } catch (error) {
    dispatch(updateError(error));
    throw error;
  }
};
