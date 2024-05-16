import React , {useState} from "react";
import Button from "./Button";
import { useSelector } from "react-redux";
import fileServices from "../../appwrite/file";
import { useNavigate } from "react-router-dom";

function CourseCard({ title, thumbnail, description, syllabus, userId,documentId,name}) {
  const userData = useSelector((state) => state.userData);
  const [error , setError] = useState("");
  const navigate = useNavigate();
  const deleteCurrentCourse = async () => {
    fileServices.deleteCourse(documentId).then(() => {
      navigate("/profile");
    }).catch((error) => {
      setError(error.message);
    })
  }
  return (
    <div className="w-full bg-[#2d2f31] h-screen flex justify-center items-center px-3">
      <div className="grid gap-y-2 gap-x-4 grid-cols-1 lg:grid-cols-2 lg:px-16 mt-7">
        <img
          src={thumbnail}
          alt="Course Image"
          className=" w-80 h-40 lg:w-[600px] lg:h-[280px] object-cover rounded-md"
        />
        <div className="gap-y-5 flex flex-col">
          <h1 className=" text-xl lg:text-2xl font-bold text-white">{title}</h1>
          <p className="text-sm text-blue-500">
            <span className="text-white">Created By</span> {name}
          </p>
          <div>
            {userData.$id && userId === userData.$id && (
              <Button
                innertext={"Delete Course"}
                className="bg-red-500 hover:bg-red-600 text-white transition-all"
                clickFunc={deleteCurrentCourse}
              />
            )}
            {error && <Button innertext={`Error : ${error}`} className="bg-red-600 text-white"/>}
          </div>
        </div>
        <p className="text-sm text-slate-200">{description}</p>
        <div className="w-full lg:col-span-2">
          <h1 className="text-white font-bold">Course Content </h1>
          <div className=" h-44 overflow-y-scroll no-scrollbar">
            {syllabus && syllabus.length
              ? syllabus.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-slate-100 border-2  px-1 py-0.5 m-1.5"
                  >
                    <p className="text-black text-md">{item}</p>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
