import { fork, takeLatest, all, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  CHECK_EMAIL_DUPLICATE_REQUEST,
  CHECK_EMAIL_DUPLICATE_FAILURE,
  CHECK_EMAIL_DUPLICATE_SUCCESS,
  CHECK_NICKNAME_DUPLICATE_REQUEST,
  CHECK_NICKNAME_DUPLICATE_FAILURE,
  CHECK_NICKNAME_DUPLICATE_SUCCESS
} from "../reducers/check/actions";



///////////닉네임 중복검사/////////////
function checkNicknameDuplicateAPI(nickname) {
  return axios.get(`/check/nickname/${nickname}`);
}

function* checkNicknameDuplicate(action) {
  try {
    const result = yield call(checkNicknameDuplicateAPI, action.data);
    yield put({
      type: CHECK_NICKNAME_DUPLICATE_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: CHECK_NICKNAME_DUPLICATE_FAILURE,
      data: e
    });
  }
}

function* watchCheckNicknameDuplicate() {
  yield takeLatest(CHECK_NICKNAME_DUPLICATE_REQUEST, checkNicknameDuplicate);
}

/////////////이메일 중복 검사////////////////
function checkEmailDuplicateAPI(email) {

  return axios.get(`/check/email/${email}`);
}

function* checkEmailDuplicate(action) {
  try {
    const result = yield call(checkEmailDuplicateAPI, action.data);
    yield put({
      type: CHECK_EMAIL_DUPLICATE_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: CHECK_EMAIL_DUPLICATE_FAILURE,
      data: e
    });
  }
}

function* watchCheckEmailDuplicate() {
  yield takeLatest(CHECK_EMAIL_DUPLICATE_REQUEST, checkEmailDuplicate);
}

export default function* checksSaga() {
  yield all([
    fork(watchCheckNicknameDuplicate),
    fork(watchCheckEmailDuplicate)
  ]);
}
