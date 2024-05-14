import React from 'react'

function Button({className ="" , innertext,clickFunc,...props}) {
  return (
    <button className={` px-2 py-1 ${className}`} onClick={clickFunc} {...props}>{innertext}</button>
  )
}

export default Button
