import React, { useEffect } from "react";
import Header from "./Components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { signIn } from "./store/authSlice";



function App() {
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  useEffect(() => {
      authService.getCurrentUser().then((userData) => {
        if(userData){
        dispatch(signIn(userData));
        navigate("/");
        }
      }).catch((error) => {
        console.log(error);
        navigate("/login")
      })
  },[]);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
