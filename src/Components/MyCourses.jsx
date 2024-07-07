import React, { useEffect , useState } from 'react'
import { useSelector } from 'react-redux'
import fileServices from '../appwrite/file'
import MainCard from './Reusable/MainCard';
import Lottie from 'lottie-react';
import loadingAnimation from "../assets/Animation - 1715662610467.json"
import { useNavigate } from 'react-router-dom';

function MyCourses() {
    const [loading , setLoading] = useState(false);
    const [courses , setCourses] = useState([]);
    const [error , setError] = useState("");
    const  navigate = useNavigate();
    const userData = useSelector(state => state.userData);
   
    useEffect(() => {
      const filterCourses = async () => {
        try {
            setLoading(true);
            const course  =  await fileServices.getAllCourses();
            if(course){
                setCourses(course.documents.filter((course) => userData.$id === course.userId));
                setLoading(false);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        } finally {
          setLoading(false);
      }
    }
      filterCourses();
    },[userData.$id])
  return  !loading  ?  (
    <div>
    {error && <p className='text-red-500 text-center'>{error}</p>}
    <div className='w-full py-20  px-4 gap-x-4 gap-y-4 grid grid-cols-1 lg:grid-cols-4'>
      {courses && courses.length ? courses.map((item,index) => (
        <MainCard key={index} thumbnail={item.thumbnail} title={item.title} description={item.description} onClick = {() => navigate(`/course-page/${item.$id}`)}/>
      )) : <p className='text-gray-600 text-center text-xl'>No courses available.</p>}
      </div>
    </div>
  ) : <div className='w-full h-screen flex justify-center items-center'>
  <div>
    <Lottie animationData={loadingAnimation} className='w-40 h-40'/>
    <span>Wait till the page loads!</span>
    </div>
  </div>
}

export default MyCourses
