import firebase from "firebase/app";

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpt5GqGd1Q2RgTw_IV7crbuZi29UvzjWQ",
  authDomain: "utube-clone-behnam.firebaseapp.com",
  projectId: "utube-clone-behnam",
  storageBucket: "utube-clone-behnam.appspot.com",
  messagingSenderId: "46747092456",
  appId: "1:46747092456:web:8d144006d6585f0226505d",
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
