import { all, fork } from "redux-saga/effects";
import post from "./post";
import user from "./user";
import checks from "./checks";
import axios from 'axios'

axios.defaults.baseURL ='http://localhost:8080/api';

export default function* rootSaga() {
  yield all([fork(post), fork(user), fork(checks)]);
}
