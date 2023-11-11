import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
const SpeakerComponent = () => {
    const {userInfo}=useSelector(state=>state.auth)
  return userInfo ? userInfo.type==="speaker" ? <Outlet/>  : <Navigate to="/"/>: <Navigate to="/signin"/>
}

export default SpeakerComponent