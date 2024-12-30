import React from 'react';
import './Home.css';

// Importing images
import eventImage from '../pics/event.jpg';
import backImage from '../pics/back.jpg';
import wedImage from '../pics/wed.jpg';
import confImage from '../pics/conf.jpeg';
import bandImage from '../pics/band.jpg';
import partyImage from '../pics/party.jpg';

const Home = () => {
  return (
    <div className="home-main">
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <img 
          src={eventImage} 
          style={{
            width: '100%', 
            height: '100vh', 
            objectFit: 'cover', 
            display: 'block', 
            margin: '0'
          }} 
        />
        {/* <div style={{
          position: 'absolute', 
          top: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <h1 style={{
            color: 'white', 
            fontSize: '30px', 
            marginLeft: '80px', 
            fontStyle: 'italic'
          }}>
            Event-Page
          </h1>
          <div className="button">
            <button className="a">Home</button>
            <button className="a">Profile</button>
            <button className="a">Event</button>
            <button className="a">Login</button>
          </div>
        </div> */}
        <div style={{
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          color: 'rgb(255, 255, 255)', 
          padding: '20px', 
          borderRadius: '10px', 
          width: '50%', 
          background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))'
        }}>
          <h1 style={{ fontSize: '36px' }}>
            Welcome to Our Event Management System
          </h1>
          <p style={{ fontSize: '30px', margin: '10px 0' }}>
            Seamlessly organize and participate in events with ease!
          </p>
          <p style={{ fontSize: '30px', margin: '10px 0' }}>
            Whether you’re planning an event or looking to join one, our system is your go-to solution. Start exploring today!
          </p>
        </div>
      </div>

      <div className="event">
        {/* <img 
          src={backImage} 
          style={{
            width: '100%', 
            height: '900px', 
            // position: 'absolute', 
            zIndex: '-1'
          }} 
        /> */}
        <div className="resize">
          <img src={wedImage} alt="Wedding Event" />
          <div className="text">
            <h4>Wedding Event</h4>
            <p>
              “Make your dream wedding a reality with our expert event management services! 
              From stunning decor and seamless coordination to personalized touches, we ensure your special day is unforgettable. 
              Book now to create cherished memories that last a lifetime!”
            </p>
            <a href="">JOIN</a>
          </div>
        </div>

        <div className="resize">
          <img src={confImage} alt="Corporate Event" />
          <div className="text">
            <h4>Corporate Event</h4>
            <p>
              "Host professional corporate events with ease! We provide seamless organization, cutting-edge technology, and 
              bespoke services to make your conferences, seminars, or meetings a resounding success. Let’s elevate your next event!"
            </p>
            <a href="">JOIN</a>
          </div>
        </div>

        <div className="resize">
          <img src={bandImage} alt="Band Event" />
          <div className="text">
            <h4>Band Event</h4>
            <p>
              "Rock your event with live band performances! Whether it’s a concert, music festival, or a private gathering, 
              we bring electrifying energy and unforgettable entertainment to your stage. Book the best bands now!"
            </p>
            <a href="">JOIN</a>
          </div>
        </div>

        <div className="resize">
          <img src={partyImage} alt="Party Event" />
          <div className="text">
            <h4>Party Event</h4>
            <p>
              "Throw the ultimate party with our event management expertise! From vibrant themes and decor to exciting activities and music, 
              we ensure your celebration is a hit. Let’s make your party unforgettable!"
            </p>
            <a href="">JOIN</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
