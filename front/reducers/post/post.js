import produce from "immer";
import { LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE } from "./actions";

export const initialState = {
  postList: []
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.data) {
      case LOAD_POSTS_REQUEST: {
        break;
      }
      case LOAD_POSTS_SUCCESS: {
        draft.postList = action.data;
        break;
      }
      case LOAD_POSTS_FAILURE: {
        break;
      }
      default: {
        break;
      }
    }
  });
};
