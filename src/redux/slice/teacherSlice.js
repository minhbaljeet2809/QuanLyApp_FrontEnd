import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  teacher: {
    id: "",
    name: "",
    level: "",
    phone: "",
    email: "",
    workspace: "",
  },
  load: false,
  listTeachers: [],
  listTable: [],
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState: initialState,
  reducers: {
    loadTeacher: (state, action) => {
      console.log("action load", action);
      state.teacher.id = action.payload;
      state.load = true;
    },
    getTeacher: (state, action) => {
      state.teacher.id = action.payload.id;
      state.teacher.name = action.payload.name;
      state.teacher.level = action.payload.level;
      state.teacher.phone = action.payload.phone;
      state.teacher.email = action.payload.email;
      state.teacher.workspace = action.payload.workspace;
      state.load = false;
    },
    loadListTeacher: (state) => {
      state.load = true;
    },
    getListTeacher: (state, action) => {
      const list = action.payload.map((value) => {
        return _.pick(value, [
          "id",
          "name",
          "level",
          "phone",
          "email",
          "workspace",
        ]);
      });
      const newData = list.map((value) => {
        return Object.values(value);
      });
      state.load = false;
      state.listTable = newData;
      state.listTeachers = list;
    },
    updateTeacher: (state, action) => {
      console.log(action);
      state.load = true;
    },
    changeValueTeacher: (state, action) => {
      state.teacher[action.payload.name] = action.payload.value;
    },
  },
});

const teacherReducer = teacherSlice.reducer;

export const {
  loadTeacher,
  getTeacher,
  getListTeacher,
  loadListTeacher,
  changeValueTeacher,
} = teacherSlice.actions;

export const selectTeacher = (state) => state.teacher;

export default teacherReducer;
