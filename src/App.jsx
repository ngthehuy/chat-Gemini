import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideBar from './components/sideBar'
import { Outlet } from 'react-router-dom'
import Gemini from './gemini'
import { useDispatch, useSelector } from 'react-redux'
import { addChat } from './store/chatSlice'
function App() {

  return (
    <>
    <div className='bg-primary-default h-screen overflow-y-hidden flex'>
      <div className=' xl:block hidden'>
      <SideBar/>
      </div>
     
      <Outlet/>
    </div>
    
    </>
  )
}

export default App
