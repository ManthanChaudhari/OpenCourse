import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Reusable/Button";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

function Profile({ className = "" }) {
  const [user, setUser] = useState({});
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, []);
  return (
    <div className="flex  justify-center items-center w-full h-screen">
      <div className="flex flex-col gap-y-4 items-center w-80 px-2 py-5 lg:shadow-lg">
        <span
          className={`border-[gray] border-2 text-4xl rounded-full px-5 py-3 cursor-pointer`}
        >
          {userData &&
            userData.name &&
            userData.name.toUpperCase().split("")[0]}
        </span>

        {userData && userData.name && (
          <p className="text-2xl font-bold">{userData.name}</p>
        )}

        {userData && userData.email && (
          <p className="text-[gray]  px-2 text-sm py-1">{userData.email}</p>
        )}
        
        <Button
          innertext={"My Courses"}
          className="text-blue-500 active:text-blue-400"
          clickFunc={() => navigate("/my-course")}
        />
        <Button
          innertext={"Create a Course"}
          className="bg-blue-500 border-2 text-white active:bg-blue-600 transition-all"
          clickFunc={() => navigate("/create-course")}
        />
        <Logout className=" bg-red-400 active:bg-red-600 text-white" />
      </div>
    </div>
  );
}

export default Profile;
