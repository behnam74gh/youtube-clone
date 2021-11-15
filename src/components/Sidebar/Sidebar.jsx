import React from "react";
import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/auth.action";

import "./_Sidebar.scss";

const Sidebar = ({ toggleSidebar, setToggleSidebarHandler }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <nav
      className={toggleSidebar ? "sidebar open" : "sidebar"}
      onClick={setToggleSidebarHandler}
    >
      <Link to="/">
        <li>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </Link>
      <Link to="/feed/subscriptions">
        <li>
          <MdSubscriptions size={23} />
          <span>Subscriptions</span>
        </li>
      </Link>
      <Link to="">
        <li>
          <MdThumbUp size={23} />
          <span>Liked Video</span>
        </li>
      </Link>
      <Link to="">
        <li>
          <MdHistory size={23} />
          <span>History</span>
        </li>
      </Link>
      <Link to="">
        <li>
          <MdLibraryBooks size={23} />
          <span>Library</span>
        </li>
      </Link>
      <Link to="">
        <li>
          <MdSentimentDissatisfied size={23} />
          <span>I don't Know</span>
        </li>
      </Link>
      <hr />
      <li onClick={logoutHandler}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>
      <hr />
    </nav>
  );
};

export default Sidebar;
