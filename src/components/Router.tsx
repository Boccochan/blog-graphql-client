import { Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import Post from "./Post";
import Root from "./Root";
import BlogAppBar from "./Menu";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-boost";

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default class Routes extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <BlogAppBar />
          <Switch>
            <Route exact={true} path="/" component={Root} />
            <Route path="/post" component={Post} />
          </Switch>
        </div>
      </ApolloProvider>
    );
  }
}
