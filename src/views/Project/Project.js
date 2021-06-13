/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import ProjectContainer from "./ProjectContainer";
import ProjectList from "./ProjectList";

export default function Project() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`}>
        <ProjectList />
      </Route>
      <Route path={`${path}/:id`}>
        <ProjectContainer />
      </Route>
    </Switch>
  );
}
