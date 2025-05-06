import React from 'react'
import './Profile.css'
import {useState,useEffect} from 'react'
import userdp from '../pics/x.jpg'
import close from "../pics/close.png"
import AddingEvent from "../component/AddingEvent"

const Profile = ({usr,setUsr,addevent,fetchEvents}) => {
    const [userDetails,setUserDetails]=useState()
    const [organizedEvents,setOrganizedEvents]=useState()
    const [eventName,setEventName]=useState()
    const [mainUser,setMainUser]=useState(localStorage.getItem("username"))
    const [triggerUpdateEvent,setTriggerUpdateEvent] = useState(-1)
    const [isUpdate,setIsUpdate] = useState(true)
    const [loading, setLoading] = useState(true)

    const handleEdit = () => {
      const newName = prompt("Enter new name:", userDetails.username);
      const newEmail = prompt("Enter new email:", userDetails.email);
      const newPhone = prompt("Enter new phone:", userDetails.contactNo);
      const newBio = prompt("Enter new bio:", userDetails.bio);
      const newLocation = prompt("Enter new location:", userDetails.location);
  
      setUserDetails({
        ...userDetails,
        username: newName || userDetails.username,
        email: newEmail || userDetails.email,
        contactNo: newPhone || userDetails.contactNo,
        bio: newBio || userDetails.bio,
        location: newLocation || userDetails.location,
      });
    };
  
    const handleProfilePictureChange = () => {
      const newPicture = prompt("Enter new profile picture URL:", userDetails.image);
      setUserDetails({...userDetails, image: newPicture || userDetails.image});
      setUsr({...usr, "image": newPicture || userDetails.image})
    };
    
    const fetchUser = async () => {
      try {
        setLoading(true);
        const username_fetchuser = localStorage.getItem('username')
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/userinfo`, {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username_fetchuser}),
          credentials: 'include'
        })
        const data = await response.json()
        setUserDetails(data)
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    
    const updateUser = async () => {
      const oldusername = localStorage.getItem('username')
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/updateuserinfo`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userDetails, oldusername}),
        credentials: 'include'
      })
      const data = await response.json()
      if(response.ok) {
        localStorage.setItem("username", userDetails.username)
      } else {
        alert(Object.values(data))
      }
    }
    
    useEffect(() => {
      fetchUser()
      fetchOrganizedEvents()
    }, [])
    
    useEffect(() => {
      if(userDetails) {
        updateUser()
      }
    }, [userDetails])

    const fetchOrganizedEvents = async () => {
      try {
        setLoading(true);
        const username = localStorage.getItem("username")
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/organizedevents`, {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username}),
          credentials: 'include'
        })
        const data = await response.json()
        setOrganizedEvents(data)
      } catch (error) {
        console.error("Error fetching organized events:", error);
      } finally {
        setLoading(false);
      }
    }

    const removeUser = async (user, eventTitle) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/removeregistereduser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventName: eventTitle,
            user: user,
          }),
        });
        if (response.ok) {
          const updatedEvents = [...organizedEvents];
          const eventIndex = organizedEvents.findIndex(event => event.title === eventTitle);

          updatedEvents[eventIndex].registeredusers = updatedEvents[
            eventIndex
          ].registeredusers.filter((u) => u !== user);
    
          setOrganizedEvents(updatedEvents);
        } else {
          alert(`Failed to remove ${user}.`);
        }
      } catch (error) {
        console.error("Error removing user:", error);
        alert("An error occurred. Please try again.");
      }
    };
    
    const deleteEvent = (eventTitle) => {
      // This would be implemented to delete an event
      console.log(`Deleting event: ${eventTitle}`);
      alert("Event deletion feature coming soon!");
    };

    // Render loading state if data is still loading
    if (loading && (!userDetails || !organizedEvents)) {
      return (
        <div className="profile-main">
          <div className="profile-loading">
            <div className="loading-spinner"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      );
    }
   
    return (
      <div className="profile-main">
        {(userDetails && usr) &&
          <div className="profile-container">
            <div className="profile-card">
              <div className="image">
              <img
                src={userDetails.image ? userDetails.image : userdp}
                alt="Profile"
                className="profile-image"
                onClick={handleProfilePictureChange}
                title="Click to change profile picture"
              />
                <h2 className="profile-name">{userDetails.username}</h2>
                <p className="profile-email">{userDetails.email}</p>
                <p className="profile-phone">{userDetails.contactNo}</p>
              </div>
              
              <div className="non-image">
                <p className="profile-location" data-label="Location:">{userDetails.location}</p> 
                <p className="profile-bio" data-label="Bio:">{userDetails.bio}</p>
              </div>
              
              <button className="edit-profile-button" onClick={handleEdit}>
                Edit Profile
              </button>
            </div>
            
            <div className="profile-subheading-div">
              <h2>Events You've Organized</h2>
            </div>
          
            {organizedEvents && (
              <div className="profile-organized-events">
                {organizedEvents.length > 0 ? (
                  organizedEvents.map((event, index) => (
                    <div 
                      className="profile-each-event" 
                      key={index}
                      onClick={() => setEventName(event)}
                    >
                      <img className='profile-each-event-image' src={event.image} alt={event.title} />
                      <div className="overlay"></div>
                      <p className='profile-each-event-title'>{event.title}</p>
                     
                    </div>
                  ))
                ) : (
                  <div className="no-events-message">
                    <p>You haven't organized any events yet</p>
                    <button 
                      className="create-event-button"
                      onClick={() => alert("Host your first event from the home page!")}
                    >
                      How to Create an Event
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {eventName && (
              <div className='event-status-container'>
                <div className="event-status-box">
                <img className='close' onClick={() => setEventName('')} src={close} alt="Close" />

                  <h2>Registered Users</h2>
                  {eventName && (
                    <div className="event-status-inbox">
                      {eventName.registeredusers && eventName.registeredusers.length > 0 ? (
                        eventName.registeredusers.map((user, index) => (
                          <div className="event-status-user" key={index}>
                            <span>{user}</span>
                            <button
                              className="remove-button"
                              onClick={() => removeUser(user, eventName.title)}
                            >
                              Remove
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="empty-state">
                          <p>No registered users yet</p>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="registration-status-update">
                    <h4>Change event details?</h4>
                    <button className='update-button' onClick={() => {setTriggerUpdateEvent(triggerUpdateEvent*-1)}}>Update</button>
                  </div>
                </div>
                {triggerUpdateEvent === 1 &&
                  <AddingEvent 
                    fetchEvents={fetchEvents} 
                    eventName={eventName} 
                    setEventName={setEventName} 
                    isAdmin={false} 
                    mainUser={mainUser} 
                    addevent={addevent} 
                    fetchOrganizedEvents={fetchOrganizedEvents} 
                    triggerUpdateEvent={triggerUpdateEvent} 
                    setTriggerUpdateEvent={setTriggerUpdateEvent} 
                    isUpdate={isUpdate} 
                  />
                }
              </div>
            )}
          </div>
        }
      </div>
    )
}

export default Profile