import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "redux/saga";
import teacherReducer from "../slice/teacherSlice";
import projectReducer from "../slice/projectSlice";
import projectListReducer from "../slice/projectListSlice";
import projectProgressReducer from "../slice/projectProgressSlice";

const rootReducer = combineReducers({
  // reducer
  teacher: teacherReducer,
  project: projectReducer,
  projectList: projectListReducer,
  projectProgress: projectProgressReducer,
});

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
