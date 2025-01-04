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
                <input value="z" className='eventname' type="text"></input>

                <label>Event Date</label>
                <input value="z" className='time' type="string"></input>

                <label>Image URL</label>
                <input value="z" className='image' type="text"></input>

                <label>Event Location</label>
                <input value="z" className='location'></input>

                <label>Event Description</label>
                <textarea value="z"  className={`${styles.about} about`}></textarea>

                <button className={styles.bp} onClick={()=>{addevent();setToggleCreateEvent(toggleCreateEvent*-1)}} type="submit">Create Event</button>
            </div>
        </div>
        </div>
  )
}

export default AddingEvent