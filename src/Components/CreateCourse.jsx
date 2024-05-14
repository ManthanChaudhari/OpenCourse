import React, { useEffect, useState } from "react";
import Input from "./Reusable/Input";
import Button from "./Reusable/Button";
import fileServices from "../appwrite/file";
import { useNavigate } from "react-router-dom";


function CreateCourse() {
  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [syllabus , setSyllabus] = useState([]);
  const [thumbnail , setThumbnail] = useState("");
  const [error , setError] = useState("");
  const [pending , setPending] = useState(false);
  const navigate = useNavigate();
  const clearAll = () => {
    setTitle("");
    setDescription("");
    setSyllabus([]);
  }
  const removeModule = (module) => {
    setSyllabus(prev => prev.filter((item) => item !== module))
  }
  const handleImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
        console.log(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  const handleCreateCourse = async () => {
    try {
      if(title && description && syllabus && thumbnail){
        setPending(true);
        const course = await fileServices.createCourse({title,description,syllabus,thumbnail});
        if(course){
          setPending(false);
          navigate(`/course-page/${course.$id}`);
        }
      }
      else{
        setPending(false);
        setError("Please type valid inputs");
      }
    } catch (error) {
      console.log(error);
      setPending(false);
      setError(error.message);
    }
  }
  return (
    <div className="h-screen w-full flex justify-center items-center mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:w-[600px] lg:p-4 lg:border-2">
       {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <Input
          type="file"
          label="Upload Thumbnail"
          className=" lg:col-span-2"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          onChange = {handleImage}
        />
        <Input type="text" placeholder="e.g. Frontend Development" label="Title"
        value = {title} onChange = {(e) => setTitle(e.target.value)}
         />
        <Input
          type="text"
          placeholder="e.g. Learn Javascript online...."
          label="Description"
          value = {description}
          onChange = {(e) => setDescription(e.target.value)}
        />
        <div>
          <Input
            label="Course Content"
            placeholder="Content (Press `Enter` to add)"
            onKeyDown = {(e) => {e.key === "Enter" ? setSyllabus(prev => [...prev , e.target.value]) : null}}
          />
            {syllabus && syllabus.length ? <div className="mt-3 p-2.5 overflow-scroll h-36 scroll-smooth">
          {
            syllabus && syllabus.length ? syllabus.map((item,index) =>(
              <div key={index} className="flex justify-between items-center bg-slate-100 border-2  px-1 py-0.5 m-1.5">
              <p className="text-black text-md">{item}</p>
              <span className="text-white  bg-red-500  px-2 py-1 cursor-pointer" onClick={() => removeModule(item)}>X</span>
              </div>
            )) : null
          }
          </div> : null
            }
        </div>
        <Button
          innertext= "Clear All"
          className="bg-blue-500 text-white lg:col-span-2 rounded-sm py-2 active:bg-blue-400"
          onClick = {clearAll}
        />
        <Button
          innertext={pending ? "Creating course..." : "Create Course"}
          className="bg-red-500 text-white lg:col-span-2 rounded-sm py-2 active:bg-red-400"
          onClick = {handleCreateCourse}
        />
      </div>
    </div>
  );
}

export default CreateCourse;
