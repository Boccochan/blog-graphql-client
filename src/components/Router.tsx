import { Route, Switch } from "react-router-dom";
import React, { Component } from "react";
// import FirstPage from "./FirstPage";
// import SecondPage from "./SecondPage";
import Post from "./Post";
import Root from "./Root";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact={true} path="/" component={Root} />
          <Route path="/post" component={Post} />
        </Switch>
      </div>
    );
  }
}
