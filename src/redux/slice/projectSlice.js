/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  load: false,
  detailProject: {
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
  },
};

const projectSlice = createSlice({
  name: "project",
  initialState: initialState,
  reducers: {
    loadDetail: (state, action) => {
      state.load = true;
    },
    getDetailProject: (state, action) => {
      state.load = false;
      state.detailProject = action.payload;
    },
    updateOrCreate: (state, action) => {
      state.detailProject[action.payload.name] = action.payload.value;
    },
    actionCreate: (state, action) => {
      state.load = true;
    },
    actionUpdate: (state, action) => {
      state.load = true;
    },
    removeStudent: (state) => {
      state.detailProject.idStudent = "";
      state.detailProject.nameStudent = "";
      state.detailProject.phoneStudent = "";
      state.detailProject.emailStudent = "";
      state.detailProject.state = "";
    },
  },
});

const projectReducer = projectSlice.reducer;

export const {
  loadDetail,
  getDetailProject,
  updateOrCreate,
  actionCreate,
  actionUpdate,
  removeStudent,
} = projectSlice.actions;

export const selectProject = (state) => state.project;

export default projectReducer;
