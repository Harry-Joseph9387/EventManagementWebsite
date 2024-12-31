import React, { useEffect } from 'react'
import './Event.css'
import backgroundIMage from '../pics/images.jpg'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import close from "../pics/close.png"
import logo from '../pics/x.jpg'
import { useLocation } from 'react-router-dom';

const Event = ({loggedIn,usr,setUsr,event}) => {
  const location = useLocation();
  const getQueryParam = (param) => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(param);
  };
  const eventname = getQueryParam('eventname');
  const navigate = useNavigate();
  const e=event.find(x=>x.title.replace(/\s+/g,'')===eventname)
  const [commenting,setCommenting]=useState(false)
  const [currentEvent,setCurrentEvent]=useState(e)
  const [comments,setComments]=useState(e.comments)
  
  const addComment=()=>{
    if(!loggedIn){
      navigate('/login')
    }
    else{
    console.log(comments)
    const comment=document.querySelector('.comment-input input')
    setComments([...comments,{username:usr.username,dp:usr.dp,comments:comment.value}])
    comment.value=''
    }
  }
  const liking=()=>{
    if(loggedIn){
      const isLiked = usr.liked.includes(event.title); 
      if(isLiked){
        setUsr((prevUsr) => ({
          ...prevUsr, 
          liked: prevUsr.liked.filter((x) => x !== event.title), 
      }));
        const button=document.querySelector('.interaction .like')
        button.innerHTML='Like'
      }
      else{
        setUsr((prevUsr) => ({
          ...prevUsr, 
          liked: [...prevUsr.liked, event.title], 
      }));
        const button=document.querySelector('.interaction .like')
        button.innerHTML='Liked'
        }
    }
    else{navigate('/login')}
    
  }
  const registering=()=>{
    if(loggedIn){
      const isRegistered = usr.registered.includes(event.title); 
      if(isRegistered){
        setUsr((prevUsr) => ({
          ...prevUsr, 
          registered: prevUsr.registered.filter((x) => x !== event.title), 
      }));
        const button=document.querySelector('.interaction .register')
        button.innerHTML='Register'
      }
      else{
        setUsr((prevUsr) => ({
          ...prevUsr, 
          registered: [...prevUsr.registered, event.title], 
      }));
        const button=document.querySelector('.interaction .register')
        button.innerHTML='Registered'
        }
    }
    else{navigate('/login')}
  }
    
  return (
        <div className="event-main">
          <img src={backgroundIMage} className='eventBackgroundImg'  alt="" />
          <div className="event-content">
            <h2>{currentEvent.title}</h2>
            <h4>organized by: <span>{currentEvent.organiser}</span></h4>
            <h4>BIO: <span>{currentEvent.about}</span></h4>
            <h4>Location:{currentEvent.location}</h4>
            <h4>Time:{currentEvent.time}</h4>
            <div className="interaction">
              <button onClick={()=>{setCommenting(true)}}>Comment</button>
              <button className='like' onClick={()=>{liking()}}>Like</button>
              <button className='register' onClick={()=>{registering()}}>Register</button>
            </div>

          </div>
        {commenting &&
          <div className="commentBox-background">
            <div className="commentBox">
              <h2 style={{fontSize:30+"px"}}>COMMENTS</h2>
              <div className="content">
                {comments.map((x)=>{
                  return <div className="comment">
                    <img src={x.dp} className='userDp' alt="" />
                    <p>{x.comments}</p>

                  </div>
                })}
              </div>
              <div className="comment-input">
                <input  type="text" />
                <button onClick={()=>{addComment()}}>Submit</button>
              </div>
            </div>
            <img src={close} className='close' onClick={()=>{setCommenting(false)}} alt="" />
          </div>
        }
        </div>
  )
}

export default Event