import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackBtn = () => {
  const nav = useNavigate();
  return (
    <div onClick={()=>nav(-1)} className='backbtn'>
        <a className="" href="/" style={{color: "white", fontWeight: "bold"}}>Back to Main Menu</a>
    </div>
  )
}

export default BackBtn