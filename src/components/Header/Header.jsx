import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";

import ProfileFakeImg from "../../assets/images/pro-8.png";
import UTubeLogo from "../../assets/images/youtube_PNG2.png";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./_header.scss";

const Header = ({ setToggleSidebarHandler }) => {
  const [queryText, setQueryText] = useState("");

  const { user } = useSelector((state) => state.userLogin);

  const history = useHistory();

  const searchHandler = (e) => {
    e.preventDefault();

    history.push(`/search/${queryText}`);
  };

  return (
    <div className="header">
      <FaBars
        className="header__menu"
        size={26}
        onClick={setToggleSidebarHandler}
      />
      <img src={UTubeLogo} alt="UT.Logo" className="header__logo" />
      <form onSubmit={searchHandler}>
        <input
          type="search"
          value={queryText}
          placeholder="Search.."
          onChange={(e) => setQueryText(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>
      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img src={user ? user.photoUrl : ProfileFakeImg} alt="avatar" />
      </div>
    </div>
  );
};

export default Header;
