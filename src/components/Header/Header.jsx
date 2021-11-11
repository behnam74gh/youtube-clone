import React from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";

import ProfileFakeImg from "../../assets/images/pro-8.png";
import "./_header.scss";

const Header = ({ setToggleSidebarHandler }) => {
  return (
    <div className="header">
      <FaBars
        className="header__menu"
        size={26}
        onClick={setToggleSidebarHandler}
      />
      <img
        src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt="UT.Logo"
        className="header__logo"
      />
      <form>
        <input type="search" placeholder="Search.." />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>
      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img src={ProfileFakeImg} alt="avatar" />
      </div>
    </div>
  );
};

export default Header;
