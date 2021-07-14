import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  load: false,
  idProject: "",
  projectProgress: {},
  projectProgressLog: [],
};

const projectProgressSlice = createSlice({
  name: "projectProgress",
  initialState: initialState,
  reducers: {
    loadProgress: (state) => {
      state.load = true;
    },
  },
});

const projectProgressReducer = projectProgressSlice.reducer;

export const { loadProgress } = projectProgressSlice.actions;

export const selectProjectProgress = (state) => state.projectProgress;

export default projectProgressReducer;
