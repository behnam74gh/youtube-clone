import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import WatchScreen from "./screens/WatchScreen/WatchScreen";
import "./_App.scss";

const App = () => {
  const { accessToken, loading } = useSelector((state) => state.userLogin);

  const history = useHistory();
  useEffect(() => {
    if (!loading && !accessToken) {
      history.push("/login");
    }
  }, [history, accessToken, loading]);

  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>
      <Route path="/watch/:id">
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>
      <Route path="/search/:query">
        <Layout>
          <SearchScreen />
        </Layout>
      </Route>
      <Route path="/login">
        <LoginScreen />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default App;
