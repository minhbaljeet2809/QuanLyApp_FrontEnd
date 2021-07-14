import { loadList, getListProject } from "../slice/projectListSlice";
import { takeLatest, call, put } from "redux-saga/effects";
import { getAllProject } from "service/Api";

function* fetchDataListProject() {
  const listProjects = yield call(getAllProject);
  if (listProjects.status === 200) {
    yield put(getListProject(listProjects.data));
  }
}

export default function* projectListSaga() {
  yield console.log("projectListSaga");
  yield takeLatest(loadList.type, fetchDataListProject);
}
