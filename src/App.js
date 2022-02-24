import React, { useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import './App.css';
import { login, logout, selectUser } from "./features/userSlice";
import Feed from "./Feed";
import {auth} from "./firebase"
import Header from "./Header";
import Sidebar from "./Sidebar";
import Login from "./Login";
import Widgets from "./Widgets";

function App() {
  const userState = useSelector(selectUser);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // user is logged in
        dispatch(login ({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }))
      } else {
        dispatch(logout());
      }
    })
  }, []);


  return (
    <div className="app">
      <Header />

      {!user ? (
        <Login />
        ) : (
      <div className="app__body">
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
      )}
    </div>
  );
}

export default App;
