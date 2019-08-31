import produce from "immer";
import { LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "./actions";
import { LOAD_POSTS_FAILURE } from "../post/actions";

const initialState = {
  user: null
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_USER_REQUEST: {
        break;
      }
      case LOAD_USER_SUCCESS: {
        draft.user = action.data;
      }
      case LOAD_POSTS_FAILURE: {
        break;
      }
      case LOGIN_REQUEST: {
        break;
      }
      case LOGIN_SUCCESS: {
        draft.user = action.data;
      }
      case LOGIN_FAILURE: {
        break;
      }
      case SIGN_UP_REQUEST: {
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.user = action.data;
      }
      case SIGN_UP_FAILURE: {
        break;
      }
      default:{
        break;
      }
    }
  });
};
