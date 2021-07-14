import { all } from "redux-saga/effects";
import teacherSaga from "./teacherSaga.js";
import projectSaga from "./projectSaga";
import projectListSaga from "./projectListSage";

export default function* () {
  yield console.log("rootSaga");
  yield all([teacherSaga(), projectSaga(), projectListSaga()]);
}
