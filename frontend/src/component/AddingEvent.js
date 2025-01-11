import React from 'react'
import './Components.css'
import close from '../pics/close.png'
import styles from './AddingEvent.module.css';
const AddingEvent = ({setToggleCreateEvent,toggleCreateEvent,addevent}) => {
  return (
    <div className="createEventBody">
          <img src={close} className='close' onClick={()=>{setToggleCreateEvent(toggleCreateEvent*-1)}} alt="" />
          <div className={styles.container}>
            <div className={styles.box}>
                <label>Event Name</label>
                <input  className='eventname' type="text"></input>

                <label>Event Date</label>
                <input  className='time' type="string"></input>

                <label>Image URL</label>
                <input  className='image' type="text"></input>

                <label>Event Location</label>
                <input  className='location'></input>

                <label>Event Description</label>
                <textarea   className={`${styles.about} about`}></textarea>

                <button className={styles.bp} onClick={()=>{addevent();
                  setToggleCreateEvent(toggleCreateEvent*-1)
                  }} type="submit">Create Event</button>
            </div>
        </div>
        </div>
  )
}

export default AddingEvent