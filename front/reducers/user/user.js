import produce from "immer";
import { LOAD_USER_REQUEST, LOAD_USER_SUCCESS } from "./actions";
import { LOAD_POSTS_FAILURE } from "../post/actions";

const initialState = {
  User: null
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.data) {
      case LOAD_USER_REQUEST: {
        break;
      }
      case LOAD_USER_SUCCESS: {
        draft.User = action.data;
      }
      case LOAD_POSTS_FAILURE: {
        break;
      }
    }
  });
};
