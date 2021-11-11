import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import "./_App.scss";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="app_container border border-info">
        <Sidebar />
        <Container fluid className="app__main border border-warning">
          <HomeScreen />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default App;
