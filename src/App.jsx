import React, { useEffect } from "react";
import Header from "./Components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { signIn } from "./store/authSlice";
import CourseCard from "./Components/Reusable/CourseCard";
import MainCard from "./Components/Reusable/MainCard";
import AllCourses from "./Components/AllCourses";


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
