import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './Components/Login.jsx'
import SignUp from './Components/SignUp.jsx'
import Home from './Components/Home.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Profile from './Components/Profile.jsx'
import CreateCourse from './Components/CreateCourse.jsx'
import CoursePage from './Components/CoursePage.jsx'
import MyCourses from './Components/MyCourses.jsx'
const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
        path : "/",
        element : <Home/>
      },
      {
        path : "login",
        element : <Login/>
      },
      {
        path : "sign-up",
        element  : <SignUp/>
      },
      {
        path : "profile",
        element  : <Profile/>
      },
      {
        path : "create-course",
        element : <CreateCourse/>
      },
      {
        path : "course-page/:documentId",
        element : <CoursePage/>
      },
      {
        path : "my-course",
        element : <MyCourses/>
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
