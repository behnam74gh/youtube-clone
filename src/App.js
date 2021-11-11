import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import "./_App.scss";

const App = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const toggleSidebarHandler = () => setToggleSidebar(!toggleSidebar);

  return (
    <React.Fragment>
      <Header setToggleSidebarHandler={toggleSidebarHandler} />
      <div className="app_container">
        <Sidebar
          toggleSidebar={toggleSidebar}
          setToggleSidebarHandler={toggleSidebarHandler}
        />
        <Container fluid className="app__main">
          <HomeScreen />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default App;
