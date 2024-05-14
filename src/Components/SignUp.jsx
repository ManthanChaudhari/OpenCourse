import React, { useEffect, useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { signIn } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup  = async () => {
    try {
        if(name && email && password){
            const userData = await authService.createAccount({email,password,name});
            if(userData){
              const userData = await authService.getCurrentUser();
              dispatch(signIn(userData));
              navigate("/");
            }
        }
        else{
          setError("Please type valid inputs!");
        }
    } catch (error) {
        console.log(error);
        setError(error.message);
    }
  }
  return (
    <div className="w-full flex justify-center h-screen items-center px-3">
      <div className={`w-80 lg:w-96 flex flex-col gap-y-4 s lg:shadow-lg px-4 py-4  rounded-md`}>
       <h1 className="text-center font-bold text-2xl">SignUp</h1>
       {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="text"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-blue-500 "
          placeholder="Username"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
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
        <div className="flex items-center gap-x-4">
        <div>
          <input
            id="isstudent"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="isstudent"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            Student
          </label>
          </div>
          <div>
          <input
            id="isteacher"
            type="checkbox"
            value=""
            className ="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="isteacher"
            className ="ms-2 text-sm font-medium text-gray-900"
          >
            Teacher
          </label>
          </div>
        </div>
        <Link to={"/login"}><p className="text-center text-sm text-blue-600">Already have an account ?? Login Now!</p></Link>

          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " onClick={signup}>SignUp</button>
      </div>
    </div>
  );
}

export default SignUp;
