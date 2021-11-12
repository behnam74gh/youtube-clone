import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions/auth.action";
import UTubeLogo from "../../assets/images/youtube_PNG2.png";
import "./_LoginScreen.scss";
import { useHistory } from "react-router-dom";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { accessToken } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);

  const loginHandler = () => {
    dispatch(loginAction());
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src={UTubeLogo} alt="youTube logo" />
        <button onClick={loginHandler}>Login With Google</button>
        <p>This Project is made using YOUTUBE DATA API</p>
      </div>
    </div>
  );
};

export default LoginScreen;
