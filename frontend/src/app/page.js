'use client'
import React from 'react'
import Home from './components/HomePage'
import Notification from './components/Notification'
import LoginForm from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import TravelPlanner from './TravelPlanner/page'

function page() {
  return (
    <div>
      <Home/>
      <Notification/>
      {/* <LoginForm/> */}
      {/* <SignUpPage/> */}
      {/* <TravelPlanner/> */}
    </div>
  )
}

export default page