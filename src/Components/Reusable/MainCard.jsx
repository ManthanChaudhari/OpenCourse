import React from 'react'

function MainCard({thumbnail , title , description,...props}) {
  return (
    <div className="flex flex-col bg-white border shadow-sm hover:shadow-md cursor-pointer rounded-xl" {...props}>
    <img className="w-full h-auto rounded-t-xl" src={thumbnail} alt="Thumbnail"/>
    <div className="p-4 md:p-5">
      <h3 className="text-lg font-bold text-gray-800">
        {title}
      </h3>
      <p className="mt-1 text-sm text-gray-500 break-words">
        {description}
      </p>
    </div>
  </div>
  )
}

export default MainCard
