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
import logo from './pics/x.jpg'

import './index.css'
const App = () => {
  const [eventId,setEventid]=useState('')
  const [loggedIn,setLoggedIn]=useState(true)
  const [usr,setUsr]=useState({username:'xxxx',dp:logo,liked:[],registered:[]})
  const [event,setEvent]=[
    {
      organiser:"Organizer",about:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, similique, maiores eligendi voluptatem libero obcaecati in nemo dignissimos autem quia, animi incidunt molestiae nulla aliquam excepturi aspernatur ad nobis nihil. Dolorem obcaecati velit voluptatem suscipit veritatis rerum fuga? Deleniti iusto similique hic cum distinctio magnam quo. Mollitia, eos. Nam sunt explicabo molestiae voluptate sapiente ad impedit sed ipsam eius architecto?",
      title:"EventNAme",location:"asf,sd",time:"12pm",
      comments:[
        {username:"user1",dp:logo,comments:"safsakjnksjfs"},
        {username:"user2",dp:logo,comments:"asdlnaskldf"},
        {username:"user3",dp:logo,comments:"asfklas"},
        {username:"user4",dp:logo,comments:"asfkaslmfsa"},
        {username:"user5",dp:logo,comments:"aslfnaskfs"},
        {username:"user6",dp:logo,comments:"asfkjsnskfjas"},
        {username:"user7",dp:logo,comments:"aslfnaskfas"},
        {username:"user8",dp:logo,comments:"asflkaslfkasmf"},
        {username:"user9s",dp:logo,comments:"saflsakmfs"},
        
      ]
    }
  ]
  return (
    <div className='main'>
        <Sidebar/>
        <div className="not-sidebar">
          <Navbar/>
          <div className="main-content">
            <Routes>
              <Route path='/event' element={<Event loggedIn={loggedIn} usr={usr} setUsr={setUsr} event={event}/>}/>
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