import React, { useEffect } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import Event from './pages/Event'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Home from './pages/Home'
import {useState} from 'react'
import usrdp from './pics/x.jpg'
import Admin from './pages/Admin'
import './index.css'
const App = () => {

  const [username,setUsername]=useState()
  const [loggedIn,setLoggedIn]=useState()
  const [isAdmin,setIsAdmin]=useState()
  const [usr,setUsr]=useState()
  const [event,setEvent]=useState([])
  const usrname=localStorage.getItem("username")
  // [
  //   {
  //     organiser:"Organizer",about:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, similique, maiores eligendi voluptatem libero obcaecati in nemo dignissimos autem quia, animi incidunt molestiae nulla aliquam excepturi aspernatur ad nobis nihil. Dolorem obcaecati velit voluptatem suscipit veritatis rerum fuga? Deleniti iusto similique hic cum distinctio magnam quo. Mollitia, eos. Nam sunt explicabo molestiae voluptate sapiente ad impedit sed ipsam eius architecto?",
  //     title:"EventNAme",location:"asf,sd",time:"12pm",img:"",
  //     comments:[
  //       {username:"user1",comments:"safsakjnksjfs"},
  //       {username:"user2",comments:"asdlnaskldf"},
  //       {username:"user3",comments:"asfklas"},
  //       {username:"user4",comments:"asfkaslmfsa"},
  //       {username:"user5",comments:"aslfnaskfs"},
  //       {username:"user6",comments:"asfkjsnskfjas"},
  //       {username:"user7",comments:"aslfnaskfas"},
  //       {username:"user8",comments:"asflkaslfkasmf"},
  //       {username:"user9s",comments:"saflsakmfs"},
        
  //     ]}
  //     ,{organiser:"",about:"Make your dream wedding a reality with our expert event management services! From stunning decor and seamless coordination to personalized touches, we ensure your special day is unforgettable. Book now to create cherished memories that last a lifetime!",title:"Wedding Event",location:"",time:"",image:"../pics/wed.jpg",comments:[]}
  //     ,{organiser:"",about:"Host professional corporate events with ease! We provide seamless organization, cutting-edge technology, and bespoke services to make your conferences, seminars, or meetings a resounding success. Let’s elevate your next event!",title:"Corporate Event",location:"",time:"",image:"../pics/conf.jpeg",comments:[]}
  //     ,{organiser:"",about:"Rock your event with live band performances! Whether it’s a concert, music festival, or a private gathering, we bring electrifying energy and unforgettable entertainment to your stage. Book the best bands now!",title:"Band Event",location:"",time:"",image:"../pics/wed/band.jpg",comments:[]}
  //     ,{organiser:"",about:"Throw the ultimate party with our event management expertise! From vibrant themes and decor to exciting activities and music, we ensure your celebration is a hit. Let’s make your party unforgettable!",title:"Party Event",location:"",time:"",image:"../pics/wed/party.jpg",comments:[]}
  // ])

  //on reloading, user logs out as the loggedin goes null
  //saving loggedIn,isAdmin,username  on local storage
  //setting all in home as on jumping from login to home, useEffect gets executed without user actually reloading the site
 
  //moving from one to other acc, profile pic still shows of previous accc

  // useEffect(()=>{
  //   console.log('usr update prompt is out')
  // },[usr]) //this is for live updating liked/registerd events to usr when moved out from events page

  const fetchUsr=async()=>{
    const username_useractivity=usrname;
    const response=await fetch(`${process.env.REACT_APP_BASE_URL}/useractivity`,{
      method:"POST",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({username_useractivity}),
      credentials: 'include'
    })
    const data=await response.json()
      setUsr(data)//doing this as moving to other pages,fetchusr is initiated
      
  }

  
  useEffect(()=>{
    if(usrname){
      fetchUsr();
    }
  },[usrname])

  

  //declaring fetchEvents outside for to call again after event creation
  const fetchEvents=async()=>{      
    const response=await fetch(`${process.env.REACT_APP_BASE_URL}/userevents`,{
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    const data=await response.json()
    setEvent(data.allevents)
  }
  useEffect(()=>{

  fetchEvents();
  
},[])


useEffect(()=>{
  const currentTime = new Date();
  const x1 = localStorage.getItem('username') ; 
  const x2= localStorage.getItem('isAdmin') ;
  const x3= localStorage.getItem('loggedIn') ;
  // alert("from app.js",username,isAdmin,loggedIn)


  setUsername(x1)
  setLoggedIn(x3)//usrfetch is updated on moving to other pages, maybe because usename is updated inifinite times due to  execution of setLoggedIn() and providing loggedIn in dependency array
  setIsAdmin(x2)
  
  // console.log(currentTime.toLocaleTimeString(),'usrname is updated')
},[])

  
  return (
    <div className='main'>
        <div className="not-sidebar">
          <Navbar loggedIn={loggedIn} usr={usr} setUsr={setUsr}setLoggedIn={setLoggedIn}/>
          <div className="main-content">
            <Routes>
              <Route path='/event' element={<Event loggedIn={loggedIn} usr={usr} setUsr={setUsr} fetchEvents={fetchEvents}  allevent={event}/>}/>
              {isAdmin==='true' ?
              <Route path='/' element={<Admin/>}/>
              :
              <Route path='/' element={<Home event={event} fetchEvents={fetchEvents} setEvent={setEvent} usr={usr} username={username}  loggedIn={loggedIn}/>}/>}
              
              <Route path='/login' element={<Login fetchUsr={fetchUsr}   setLoggedIn={setLoggedIn}/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/profile' element={<Profile usr={usr} setUsr={setUsr}/>}/>
            </Routes>
          </div>
        </div>
    </div>
  )
}

export default App