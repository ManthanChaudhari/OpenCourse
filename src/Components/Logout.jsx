import React from 'react'
import Button from './Reusable/Button'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Logout({className}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signout = () => {
        authService.logout().then(() => {
            dispatch(logOut());
            navigate("/login");
        }).catch((error) => {
            console.log(error);
        })
    }
  return (
    <Button className={` shadow-lg ${className}`} innertext={"Logout"} clickFunc={signout}/>
  )
}

export default Logout
