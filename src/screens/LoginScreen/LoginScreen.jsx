import React from "react";
import UTubeLogo from "../../assets/images/youtube_PNG2.png";
import "./_LoginScreen.scss";

const LoginScreen = () => {
  return (
    <div className="login">
      <div className="login__container">
        <img src={UTubeLogo} alt="youTube logo" />
        <button>Login With Google</button>
        <p>This Project is made using YOUTUBE DATA API</p>
      </div>
    </div>
  );
};

export default LoginScreen;
