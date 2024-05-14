import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Reusable/Button";
import Logout from "./Logout";
import Profile from "./Profile";

function Header() {
  const authorized = useSelector((state) => state.authorized);
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const items = [
    {
      path: "/",
      element: "Home",
      auth: true,
    },
    {
      path: "login",
      element: "Login",
      auth: !authorized,
    },
  ];
  const navigateToProfile = () => {
    navigate("/profile")
  }
  return (
    <nav className="bg-blue-500 shadow-lg px-2 py-3 flex justify-between items-center fixed top-0 left-0 w-full ">
      <h1 className="text-2xl font-oswald text-white">LearnOnline</h1>
      <div className="flex gap-x-3 items-center">
        {
          <ul>
            {items.map(
              (item) =>
                item.auth && (
                  <li
                    className="inline-block mx-3 cursor-pointer"
                    key={item.element}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `${isActive ? "text-[#dddddd]" : "text-white"}`
                      }
                    >
                      {item.element}
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        }
        {authorized && <Logout className={"text-blue-500 bg-white"} />}
        {authorized && (
          <span onClick={navigateToProfile} className={`bg-white rounded-full px-3 py-1 cursor-pointer`}>
            {userData.name.toUpperCase().split("")[0]}
          </span>
        )}
      </div>
    </nav>
  );
}

export default Header;
