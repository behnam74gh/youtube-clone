import firebase from "firebase/app";
import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "../types/auth.type";
import auth from "../../firebase";

export const loginAction = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
    const res = await auth.signInWithPopup(provider);
    // console.log(res);

    const accessToken = res.credential.accessToken;

    const profile = {
      name: res.additionalUserInfo.profile.name,
      photoUrl: res.additionalUserInfo.profile.picture,
    };

    sessionStorage.setItem("ytc-access-token", accessToken);
    sessionStorage.setItem("ytc-profile", JSON.stringify(profile));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: accessToken,
    });

    dispatch({
      type: LOAD_PROFILE,
      payload: profile,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const logoutAction = () => async (dispatch) => {
  await auth.signOut();
  dispatch({
    type: LOG_OUT,
  });

  sessionStorage.removeItem("ytc-access-token");
  sessionStorage.removeItem("ytc-profile");
};
