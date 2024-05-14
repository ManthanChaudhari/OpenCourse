import React, { forwardRef, useId } from "react";

function Input({label, placeholder, type = "text", className="",...props}) {
  const id = useId();
  return (
    <div className={`${className}`}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-blue-500 $`}
        placeholder={placeholder}
        {...props}
        required
      />
    </div>
  );
}

export default Input;
