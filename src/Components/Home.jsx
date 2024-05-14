import React from 'react'
import { useSelector } from 'react-redux'
import AllCourses from './AllCourses';

function Home() {
  const userData = useSelector(state => state.userData);
  return (
    <div>
      <AllCourses/>
    </div>
  )
}

export default Home
