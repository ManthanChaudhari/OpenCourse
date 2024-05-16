import React, { useEffect, useState } from 'react'
import CourseCard from './Reusable/CourseCard'
import { useParams } from 'react-router-dom'
import fileServices from '../appwrite/file';
import Lottie from 'lottie-react';
import loadingAnimation from "../assets/Animation - 1715662610467.json"

function CoursePage() {
  const {documentId} = useParams();
  const [cardDetail , setCardDetail] = useState({});
  const [error , setError] = useState("");
  const [loading , setLoading] = useState(false);
  async function createCourseCard(){
    try {
      setLoading(true)
      const course = await fileServices.getCourse(documentId);
      if(course){
        setCardDetail(course);
        setLoading(false);
      }
    }catch(error) {
      setLoading(false);
     setError(error.message);
    }
  }
  useEffect(() => {
    createCourseCard();
  },[])

  return !loading ? (
    <div className='h-screen w-full justify-center items-center text-black'>
    {error && <p className='text-red-500'>{error.message}</p>}
    {cardDetail && 
      <CourseCard thumbnail={cardDetail.thumbnail} description={cardDetail.description} title={cardDetail.title} syllabus={cardDetail.syllabus} userId = {cardDetail.userId} documentId = {documentId}  name = {cardDetail.name}/>
    }
    </div>
  ) : <div className='h-screen w-full flex justify-center items-center text-black'>
  <div>
    <Lottie animationData={loadingAnimation} className='w-40 h-40'/>
    <span>Wait till the page load!</span>
    </div>
  </div>
}

export default CoursePage
