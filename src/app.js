import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect, useHistory, useRouteMatch } from "react-router-dom";
import Admin from "layouts/Admin.js";
import { Login } from "views/Login/Login";
import ProtectedRoute from 'views/AuthenContext/ProtectedRouter';

export default function App() {
    const [isAuth, setIsAuth] = useState(true);
    const history = useHistory();
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                {/* <Route path="/admin" component={Admin} /> */}
                <ProtectedRoute path="/admin" isAuth={isAuth} />
                <Redirect path='/material-dashboard-react' to='/' />
            </Switch>
        </BrowserRouter>
    )
}