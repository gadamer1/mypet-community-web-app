import { combineReducers } from "redux";
import user from "./user/user";
import post from "./post/post";
import checks from './check/checks'

const rootReducer = combineReducers({
  user,
  post,
  checks
});

export default rootReducer;
