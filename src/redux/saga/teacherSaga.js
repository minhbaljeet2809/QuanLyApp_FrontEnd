import {
  loadListTeacher,
  getListTeacher,
  loadTeacher,
  getTeacher,
} from "../slice/teacherSlice";
import { takeLatest, call, put } from "redux-saga/effects";
import { getAllTeacher, getTeacherByID } from "service/Api";

function* fetchDataListTeacher() {
  const listTeachers = yield call(getAllTeacher);
  if (listTeachers.status === 200) {
    yield put(getListTeacher(listTeachers.data));
  }
}
function* fetchDataTeacher(action) {
  console.log("action.payload", action.payload);
  if (action.payload == "") {
    const data = {
      id: "",
      name: "",
      level: "",
      phone: "",
      email: "",
      workspace: "",
    };
    yield put(getTeacher(data));
  } else {
    const teacher = yield call(getTeacherByID, action.payload);
    if (teacher.status === 200) {
      yield put(getTeacher(teacher.data));
    }
  }
}

export default function* teacherSaga() {
  yield console.log("teacherSaga");
  yield takeLatest(loadListTeacher.type, fetchDataListTeacher);
  yield takeLatest(loadTeacher.type, fetchDataTeacher);
}
