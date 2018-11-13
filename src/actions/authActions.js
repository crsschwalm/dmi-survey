import { post } from "axios";
const USER_API_URL = `${process.env.REACT_APP_API_URL}/api/user`;

export const authenticateStarted = () => ({ type: "AUTHENTICATE_STARTED" });
export const authenticateSuccess = response => ({
  type: "AUTHENTICATE_SUCCESS",
  payload: response
});
export const authenticateError = error => ({
  type: "AUTHENTICATE_ERROR",
  payload: { error }
});

export const logout = () => ({ type: "LOGOUT" });

export const register = userInfo => async dispatch =>
  await authenticate({ url: `${USER_API_URL}`, data: userInfo }, dispatch);

export const login = userInfo => async dispatch =>
  await authenticate(
    { url: `${USER_API_URL}/authenticate`, data: userInfo },
    dispatch
  );

const authenticate = async (request, dispatch) => {
  dispatch(authenticateStarted());
  try {
    const response = await post(request.url, request.data);
    if (response.status !== 200) {
      throw new Error("Login User Failed");
    }
    const { _id, email } = response.data;
    const auth = { _id: _id, email: email, ...request.data };
    dispatch(authenticateSuccess(auth));
  } catch (error) {
    dispatch(authenticateError(error.response.statusText));
    throw error.response.statusText;
  }
};
