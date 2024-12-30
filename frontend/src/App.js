import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import Event from './pages/Event'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Home from './pages/Home'
import {useState} from 'react'
import './index.css'
const App = () => {
  const [eventId,setEventid]=useState('')
  return (
    <div className='main'>
        <Sidebar/>
        <div className="not-sidebar">
          <Navbar/>
          <div className="main-content">
            <Routes>
              <Route path='/event' element={<Event/>}/>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/profile' element={<Profile/>}/>
            </Routes>
          </div>
        </div>
    </div>
  )
}

export default App