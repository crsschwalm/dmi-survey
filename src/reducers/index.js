import { combineReducers } from "redux";
import manageSurveyReducer from "./manageSurveyReducer";
import takeSurveyReducer from "./takeSurveyReducer";
import authReducer from "./authReducer";
import responseReducer from "./responseReducer";

const Reducers = combineReducers({
  manageSurvey: manageSurveyReducer,
  takeSurvey: takeSurveyReducer,
  auth: authReducer,
  responses: responseReducer
});

export default Reducers;
