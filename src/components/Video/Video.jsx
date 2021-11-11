import React from "react";
import { AiFillEye } from "react-icons/ai";
import FakeVideoImage from "../../assets/images/leon.jpg";
import FakeVideoCompany from "../../assets/images/1byy.jpg";
import "./_Video.scss";

const Video = () => {
  return (
    <div className="video">
      <div className="video__top">
        <img src={FakeVideoImage} alt="video img" />
        <span>05 : 43</span>
      </div>
      <div className="video__title">
        create app in 5 minutes #made by behnam ghazaghi from iran
      </div>
      <div className="video__details">
        <span>
          <AiFillEye /> 5m views
        </span>
        <span>5 days ago</span>
      </div>
      <div className="video__channel">
        <img src={FakeVideoCompany} alt="company" />
        <p>Hollywood</p>
      </div>
    </div>
  );
};

export default Video;
