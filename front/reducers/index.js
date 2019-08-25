import { combineReducers } from "redux";
import user from "./user/user";
import post from "./post/post";

const rootReducer = combineReducers({
  user,
  post
});

export default rootReducer;
