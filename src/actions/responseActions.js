import { get } from "axios";

export const fetchStarted = () => ({ type: "FETCH_STARTED" });
export const fetchSuccess = response => ({
  type: "FETCH_SUCCESS",
  payload: { response }
});
export const fetchError = error => ({
  type: "FETCH_ERROR",
  payload: { error }
});

export const fetchResponses = id => async (dispatch, getState) => {
  dispatch(fetchStarted());
  try {
    const response = await get(
      `${process.env.REACT_APP_API_URL}/api/survey/${id}/response`,
      {
        auth: getState().auth
      }
    );
    if (response.status !== 200) {
      throw new Error("Fetch Response Failed");
    }
    dispatch(fetchSuccess(response.data));
  } catch (error) {
    dispatch(fetchError(error));
    throw error;
  }
};
