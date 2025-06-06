import React from 'react'
import "./Admin.css"
import {useEffect,useState} from 'react'
import RegistrationStatus from "../component/RegistrationStatus"
import AddingEvent from '../component/AddingEvent'
const Admin = ({loggedIn,addevent}) => {
  const [adminData,setAdminData]=useState()
  const [eventName,setEventName]=useState()
  const [toggleCreateEvent,setToggleCreateEvent]=useState(-1)
  const [isAdmin,setIsAdmin]=useState(true)
  const [mainUser,setMainUser]=useState("admin")
  // const [organizedEvents,setOrganizedEvents]=useState()
  //when admin updates other's event, admin becomes the organiser of that event
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
  
        const updatedEvents = adminData.events.filter(event => event.title !== eventname);
  
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
  const removeUser = async (user,x) => {
    try {
      console.log("removeUser:",eventName)
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/removeregistereduser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName: eventName.title,
          user: user,
        }),
      });
      //no problem in response.ok
      console.log(eventName)
      if (response.ok) {
        console.log("x removeUser,",x)
        // const index = adminData.events.indexOf(eventName);
        const index = adminData.events.findIndex(event => event.title === eventName.title);

        const updated=adminData.events.map((event,i)=>{
          if(i===index){
            console.log("the updated",{...event,registeredusers:event.registeredusers.filter(eachUser=>eachUser!==user)})
            return {...event,registeredusers:event.registeredusers.filter(eachUser=>eachUser!==user)}
          }
          return event
        })
        console.log("updated,unUpdated removeUser",updated)

       
        // setAdminData({users:adminData.users,events:updated})
        setAdminData((prevData) => ({
          ...prevData,
          events: updated,
        }));
      }
    }
    catch(err){}
  }


  

  useEffect(()=>{
    if(adminData){
      // console.log(adminData)
    }
  },[adminData])
  useEffect(()=>{fetchAdminData()},[])
  
  
  return (
    <div className="admin-main">
      <div className="dashboard-container">
        <section className="manage-section">
            <h2>Manage Events</h2>
           
            <div className="event-list">
               
                <div className="event-row event-header">
                    <div className="event-name">Event Name</div>
                    <div className="event-date">Organizer</div>
                    <div className="event-registrations">Registrations</div>
                    <div className="event-actions">Actions</div>
                </div>

              {adminData && 
                <div className="every-row-container">
                  
                  {adminData.events.map((event, index) => {
                    return <div className="event-row" key={index}>
                    <div className="event-name">{event.title}</div>
                    <div className="event-date">{event.organizer}</div>
                    <div className="event-registrations">
                      <button className="edit-btn" onClick={()=>{setEventName(event)}}>View</button>
                    </div>
                    <div className="event-actions">
                        <button className="delete-btn" onClick={()=>{deleteEvent(event.title)}}>Delete</button>
                    </div>
                </div>
                  })}
                </div>
              }
              {eventName && 
                <RegistrationStatus fetchAdminData={fetchAdminData} mainUser={mainUser} isAdmin={isAdmin} addevent={addevent} key={adminData ? adminData.events.length : 0} organizedEvents={adminData ? adminData.events : []} eventName={eventName} setEventName={setEventName} removeUser={removeUser}/>
              }
            </div>


            <button className="add-event-btn" onClick={()=>{setToggleCreateEvent(toggleCreateEvent*-1)}}>Add New Event</button>
             {toggleCreateEvent===1&&
              <div className="admin-addingevent-container">
                  <AddingEvent setEventName={setEventName} isAdmin={isAdmin} fetchAdminData={fetchAdminData} isUpdate={false}  setToggleCreateEvent={setToggleCreateEvent} addevent={addevent} toggleCreateEvent={toggleCreateEvent}/>
              </div>
              }

        </section>

        <section className="manage-section">
            <h2>Manage Users</h2>
          
            <div className="user-list">
               
                <div className="user-row user-header">
                    <div className="user-name">User Name</div>
                    <div className="user-email">Email</div>
                    <div className="user-actions">Actions</div>
                </div>

                {adminData &&
                  <div className="every-row-container">
                    {adminData.users.map((user, index) => {
                      return <div className="user-row" key={index}>
                      <div className="user-name">{user.username}</div>
                      <div className="user-email">{user.email}</div>
                      <div className="user-actions">
                          <button className="delete-btn" onClick={()=>{deleteUser(user.username)}}>Delete</button>
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