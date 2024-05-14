import React, { useEffect, useState } from 'react'
import fileServices from '../appwrite/file'
import MainCard from './Reusable/MainCard';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import loadingAnimation from "../assets/Animation - 1715662610467.json"

function AllCourses() { 
    const [courses  , setCourses] = useState([]);
    const[loading , setLoading] = useState(false);
    const [error , setError] = useState("");
    const navigate = useNavigate();
    const allCourses = async () => {
        try {
            setLoading(true);
            const course  =  await fileServices.getAllCourses();
            if(course){
                setCourses(course.documents);
                setLoading(false);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    useEffect(() => {
        allCourses();
    },[])
  return !loading ? (
    <div className='w-full py-20  px-4 gap-x-4 gap-y-4 grid grid-cols-1 lg:grid-cols-4'>
    {error && <p className='text-red-500 text-center text-sm'>{error}</p>}
      {courses && courses.length ? courses.map((item,index) => (
        <MainCard key={index} thumbnail={item.thumbnail} title={item.title} description={item.description} onClick = {() => navigate(`/course-page/${item.$id}`)}/>
      )) : null}
    </div>
  ) : <div className='w-full h-screen flex justify-center items-center'>
  <div>
    <Lottie animationData={loadingAnimation} className='w-40 h-40'/>
    <span>Wait till the page load!</span>
    </div>
  </div>
}

export default AllCourses
