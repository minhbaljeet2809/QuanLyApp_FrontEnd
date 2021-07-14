/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "views/Login/Login";
import ProtectedRoute from "views/AuthenContext/ProtectedRouter";
import { Provider } from "react-redux";
import store from "./redux/store/index";

export default function App() {
  const [isAuth, setIsAuth] = useState(true);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <ProtectedRoute path="/admin" isAuth={isAuth} />
          <Redirect path="/material-dashboard-react" to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
