import {
  loadDetail,
  getDetailProject,
  actionCreate,
  actionUpdate,
} from "../slice/projectSlice";
import { takeLatest, call, put } from "redux-saga/effects";
import { getProjectById, createProject, updateProject } from "service/Api";

function* fetchDetailProject(action) {
  if (!action.payload) {
    console.log("get id", action.payload);
    const dataProject = {
      id: "",
      name: "",
      idTeacher: "",
      idStudent: "",
      nameTeacher: "",
      phoneTeacher: "",
      emailTeacher: "",
      workspaceTeacher: "",
      majors: "",
      nameStudent: "",
      phoneStudent: "",
      emailStudent: "",
      projectContent: "",
      projectRequest: "",
      state: "",
    };
    yield put(getDetailProject(dataProject));
  }
  if (action.payload) {
    console.log("get id", action.payload);
    const detailProject = yield call(getProjectById, action.payload);
    if (detailProject.status === 200) {
      console.log("project data ", detailProject.data);
      yield put(getDetailProject(detailProject.data));
    }
  }
}

function* createProjectHandle(action) {
  console.log("action", action);
  const project = yield call(createProject, action.payload);
  console.log(project);
}

function* updateProjectHandle(action) {
  console.log("action", action);
  const project = yield call(updateProject, action.payload);
  console.log(project);
}

export default function* projectSaga() {
  yield console.log("projectSaga");
  yield takeLatest(loadDetail.type, fetchDetailProject);
  yield takeLatest(actionCreate.type, createProjectHandle);
  yield takeLatest(actionUpdate.type, updateProjectHandle);
}
