import React from 'react'
import close from "../pics/close.png"

const RegistrationStatus = ({organizedEvents,eventName,removeUser,setEventName}) => {
  const event = organizedEvents.find(event => event.eventname=== eventName.eventname);
  console.log('from registrationStatus',event,organizedEvents,eventName)
  //here the eventName is not literally the event's name, it is the object containing all event details of a specific event
  return (
    <div className='event-status-container'>
        <img className='close' onClick={()=>{setEventName('')}}  src={close} alt="" />
          <div className="event-status-box">
            <h2>Registered User</h2>
            {event&&
            <div className="event-status-inbox">
              {event.registeredusers.map(user=> {
                return <div className="event-status-user">
                  <span>{user}</span>
                  <button
                    className="remove-button"
                    onClick={() => removeUser(user)}
                  >
                  Remove
                  </button>
                      </div>
              })}
            </div>
            }
          </div>
    </div>
  )
}

export default RegistrationStatus