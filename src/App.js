import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import "./_App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Layout>
            <HomeScreen />
          </Layout>
        </Route>
        <Route path="/search">
          <Layout>
            <h2>search screen</h2>
          </Layout>
        </Route>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route>
          <Redirect path="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
