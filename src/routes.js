import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./app/Component/Main";
// import Login from "./app/Component/Login";

import MyGarage from "./app/Component/MyGarage";

export default (
  <Switch>
    <Route exact path="/" component={Main} />
    {/* <Route path="/login" component={Login} /> */}
    <Route path="/MyGarage" component={MyGarage} />
  </Switch>
);
