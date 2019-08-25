import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_SUCCESS
} from "../reducers/post/actions";

function loadPostsAPI() {
  return axios.get("/posts");
}

function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_POSTS_FAILURE
    });
  }
}

function* watchLoadPosts() {
  takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts)]);
}
