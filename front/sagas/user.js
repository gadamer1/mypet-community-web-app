import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "../reducers/user/actions";

function loadUserAPI() {
  return axios.get("/user");
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function loginAPI(data) {
  return axios.post("/user/login",data,{
    withCredentials: true,
  });
}

function* login(action) {
  try {
    const result = yield call(loginAPI,action.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOGIN_FAILURE
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}


function signupAPI(data) {
  return axios.post("/user/signup",data);
}

function* signup(action) {
  try {
    const result = yield call(signupAPI,action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE
    });
  }
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchLogin),
    fork(watchSignup),
  ]);
}
