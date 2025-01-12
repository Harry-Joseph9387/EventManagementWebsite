import React from 'react'
import "./Admin.css"
import {useEffect,useState} from 'react'
import RegistrationStatus from "../component/RegistrationStatus"
import AddingEvent from '../component/AddingEvent'
const Admin = ({loggedIn}) => {
  const [adminData,setAdminData]=useState()
  const [eventName,setEventName]=useState()
  const [toggleCreateEvent,setToggleCreateEvent]=useState(-1)

  const fetchAdminData=async()=>{
    const response=await fetch(`${process.env.REACT_APP_BASE_URL}/admindata`,
    {
      method:"GET",
      headers:{"Content-Type":'application/json'}
    })
    const data=await response.json()
    setAdminData(data)
  }
  const deleteUser = async (username) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/delete-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({username})
      });
      const result = await response.json();

      if (response.ok) {
        let x=adminData.users.filter(user=>user.username!==username)
        let y = adminData.events.map(event => {
           return {
              ...event,
              likedusers: event.likedusers.filter(user => user !== username),
              registeredusers: event.registeredusers.filter(user => user !== username),
    };
  }).filter(event => event.organizer !== username);
        setAdminData({"users":x,"events":y})
        console.log('Filtered Users:', x);
        console.log('Filtered Events:', y);
        console.log('User deleted successfully:', result);
      } 
  else {
        console.error('Error deleting user:', result);
      }
    } catch (error) {
      console.error('Error in deleteUser function:', error);
    }
  };
  const deleteEvent=async(eventname)=>{
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/delete-event`, {
        method: 'POST',
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({eventname})
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log('Event deleted successfully from backend:', result);
  
        const updatedUsers = adminData.users.map(user => {
          return {
            ...user,
            registeredEvents: user.registeredEvents.filter(event => event !== eventname),
            likedEvents: user.likedEvents.filter(event => event !== eventname),
            organizedEvents: user.organizedEvents.filter(event => event !== eventname),
          };
        });
  
        const updatedEvents = adminData.events.filter(event => event.eventname !== eventname);
  
        setAdminData({
          users: updatedUsers,
          events: updatedEvents,
        });
  
        ;
      } else {
        console.error('Failed to delete event:', result.message);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  }
  const removeUser = async (user) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/removeregistereduser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName: eventName.eventname,
          user: user,
        }),
      });
      if (response.ok) {
        const index = adminData.events.indexOf(eventName);
        // alert(index)
        const updated=adminData.events.map((event,i)=>{
          if(i===index){
            return {...event,registeredusers:event.registeredusers.filter(eachUser=>eachUser!==user)}
          }
          return event
        })
        console.log(updated)
        // setAdminData({users:adminData.users,events:updated})
        setAdminData((prevData) => ({
          ...prevData,
          events: updated,
        }));
      }
    }
    catch(err){}
  }

  const addevent=async()=>{
    if(loggedIn){
      const eventname=document.querySelector('.eventname');
      const location=document.querySelector('.location');
      const about=document.querySelector('.about');
      const time=document.querySelector('.time');
      const image=document.querySelector('.image')
      const newEvent={organizer:"admin",about:about.value,title:eventname.value,location:location.value,time:time.value,image:image.value,comments:[]}
      
      console.log(newEvent)
      const response=await fetch(`${process.env.REACT_APP_BASE_URL}/checkevent`,{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEvent),
          credentials: 'include'
        })
      
      
      const data1=await response.json()


      if(response.ok){
        
        const response=await fetch(`${process.env.REACT_APP_BASE_URL}/addevent`,{
            method:"POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
            credentials: 'include'
          })
        const data2=await response.json()
        console.log(data2)
        fetchAdminData();
        }
      else{
          console.log("already exirst")
        }

        
        alert(Object.values(data1))
      }
    else{
      // navigate('/login')
    }
    }

  useEffect(()=>{
    if(adminData){
      const currentTime = new Date();
      console.log(currentTime.seconds,adminData)
      // alert(adminData.events)
    }
  },[adminData])
  useEffect(()=>{fetchAdminData()},[])
  
  
  return (
    <div className="admin-main">
      <div class="dashboard-container">
        <section class="manage-section">
            <h2>Manage Events</h2>
           
            <div class="event-list">
               
                <div class="event-row event-header">
                    <div class="event-name">Event Name</div>
                    <div class="event-date">Organizer</div>
                    <div class="event-registrations">Registrations</div>
                    <div class="event-actions">Actions</div>
                </div>

              {adminData && 
                <div className="every-row-container">
                  
                  {adminData.events.map(event=>{
                    return <div class="event-row">
                    <div class="event-name">{event.eventname}</div>
                    <div class="event-date">{event.organizer}</div>
                    <div class="event-registrations">
                      <button class="edit-btn" onClick={()=>{setEventName(event)}}>View</button>
                    </div>
                    <div class="event-actions">
                        <button class="delete-btn" onClick={()=>{deleteEvent(event.eventname)}}>Delete</button>
                    </div>
                </div>
                  })}
                </div>
              }
              {eventName&& 
                <RegistrationStatus key={adminData.events.length} organizedEvents={adminData.events} eventName={eventName} setEventName={setEventName} removeUser={removeUser}/>
              }
            </div>


            <button class="add-event-btn" onClick={()=>{setToggleCreateEvent(toggleCreateEvent*-1)}}>Add New Event</button>
             {toggleCreateEvent===1&&
              <div className="admin-addingevent-container">
                  <AddingEvent setToggleCreateEvent={setToggleCreateEvent} addevent={addevent} toggleCreateEvent={toggleCreateEvent}/>
              </div>
              }

        </section>

        <section class="manage-section">
            <h2>Manage Users</h2>

          
            <div class="user-list">
               
                <div class="user-row user-header">
                    <div class="user-name">User Name</div>
                    <div class="user-email">Email</div>
                    {/* <div class="user-role">Role</div> */}
                    <div className=""></div>
                    <div class="user-actions">Actions</div>
                </div>

                {adminData &&
                  <div className="every-row-container">
                    {adminData.users.map(user=>{
                      return<div class="user-row">
                      <div class="user-name">{user.username}</div>
                      <div class="user-email">{user.email}</div>
                      {/* <div class="user-role">Admin</div> */}
                      <div className=""></div>
                      <div class="user-actions">
                          {/* <button class="edit-btn">Edit</button> */}
                          <button class="delete-btn" onClick={()=>{deleteUser(user.username)}}>Delete</button>
                      </div>
                  </div>
                      })}
                  </div>
                }              
                

               
            </div>
        </section>
    </div>
    </div>
  )
}

export default Admin