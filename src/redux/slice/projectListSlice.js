import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  load: false,
  listProject: [],
};

const projectListSlice = createSlice({
  name: "projectList",
  initialState: initialState,
  reducers: {
    loadList: (state) => {
      state.load = true;
      console.log("action load");
    },
    getListProject: (state, action) => {
      state.load = false;
      const list = action.payload.map((value) => {
        if (value["nameStudent"] == "" || value["nameStudent"] == null) {
          value["nameStudent"] = "Chưa có sinh viên đăng ký";
        }
        return _.pick(value, [
          "id",
          "name",
          "majors",
          "nameTeacher",
          "nameStudent",
        ]);
      });
      const newData = list.map((value) => {
        return Object.values(value);
      });
      state.load = false;
      state.listProject = newData;
    },
  },
});

const projectListReducer = projectListSlice.reducer;

export const { loadList, getListProject } = projectListSlice.actions;

export const selectProjectList = (state) => state.projectList;

export default projectListReducer;
