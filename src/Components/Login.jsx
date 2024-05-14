import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../store/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async () => {
    try {
      setError("");
      if (email && password) {
        const userData = await authService.login({ email, password });
        if (userData) {
          const userData = await authService.getCurrentUser();
          dispatch(signIn(userData));
          navigate("/");
        }
      } else {
        setError("Please type valid inputs!");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="w-full flex justify-center h-screen items-center px-3">
      <div className="w-full md:w-80 lg:w-96 flex flex-col gap-y-4 lg:shadow-lg px-4 py-4">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
        <input
          type="text"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-blue-500 "
          placeholder="email@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-blue-500 "
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to={"/sign-up"}>
          <p className="text-center text-sm text-blue-600">
            Haven't Register yet ?? SignUp Now!
          </p>
        </Link>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
