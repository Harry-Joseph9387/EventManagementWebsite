import React, { useEffect, useState } from 'react';
import './Event.css';
import backgroundIMage from '../pics/images.jpg';
import { useNavigate } from 'react-router-dom';
import close from "../pics/close.png";
import { useLocation } from 'react-router-dom';

const Event = ({ loggedIn, usr, setUsr, event }) => {
  const location = useLocation();
  const getQueryParam = (param) => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(param);
  };

  const eventname = getQueryParam('eventname');
  const navigate = useNavigate();

  const [currentEvent, setCurrentEvent] = useState(() => 
    event.find(x => x.title.replace(/\s+/g, '') === eventname)
  );

  useEffect(() => {
    const e = event.find(x => x.title.replace(/\s+/g, '') === eventname);
    setCurrentEvent(e);
    console.log(event,currentEvent)
  }, [event, eventname]);
  console.log(event,currentEvent)
  const [commenting, setCommenting] = useState(false);
  const [comments, setComments] = useState(currentEvent ? currentEvent.comments : []);

  // Handle adding a comment
  const addComment = () => {
    if (!loggedIn) {
      navigate('/login');
    } else {
      const comment = document.querySelector('.comment-input input');
      setComments([...comments, { username: usr.username, dp: usr.dp, comments: comment.value }]);
      comment.value = '';
    }
  };

  // Handle liking/unliking the event
  const liking = () => {
    if (loggedIn) {
      const isLiked = usr.liked.includes(currentEvent.title);
      if (isLiked) {
        setUsr((prevUsr) => ({
          ...prevUsr,
          liked: prevUsr.liked.filter((x) => x !== currentEvent.title),
        }));
      } else {
        setUsr((prevUsr) => ({
          ...prevUsr,
          liked: [...prevUsr.liked, currentEvent.title],
        }));
      }
    } else {
      navigate('/login');
    }
  };

  // Handle registering/unregistering for the event
  const registering = () => {
    if (loggedIn) {
      const isRegistered = usr.registered.includes(currentEvent.title);
      if (isRegistered) {
        setUsr((prevUsr) => ({
          ...prevUsr,
          registered: prevUsr.registered.filter((x) => x !== currentEvent.title),
        }));
      } else {
        setUsr((prevUsr) => ({
          ...prevUsr,
          registered: [...prevUsr.registered, currentEvent.title],
        }));
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="">
      {currentEvent &&
      <div className="event-main">
        <img src={backgroundIMage} className="eventBackgroundImg" alt="" />
        <div className="event-content">
          <h2>{currentEvent.title}</h2>
          <h4>
            Organized by: <span>{currentEvent.organiser}</span>
          </h4>
          <h4>
            BIO: <span>{currentEvent.about}</span>
          </h4>
          <h4>Location: {currentEvent.location}</h4>
          <h4>Time: {currentEvent.time}</h4>
          <div className="interaction">
            <button onClick={() => setCommenting(true)}>Comment</button>
            <button className="like" onClick={liking}>
              Like
            </button>
            <button className="register" onClick={registering}>
              Register
            </button>
          </div>
        </div>

        {commenting && (
          <div className="commentBox-background">
            <div className="commentBox">
              <h2 style={{ fontSize: 30 + 'px' }}>COMMENTS</h2>
              <div className="content">
                {comments.map((x, index) => (
                  <div className="comment" key={index}>
                    <img src={x.dp} className="userDp" alt="" />
                    <p>{x.comments}</p>
                  </div>
                ))}
              </div>
              <div className="comment-input">
                <input type="text" />
                <button onClick={addComment}>Submit</button>
              </div>
            </div>
            <img
              src={close}
              className="close"
              onClick={() => setCommenting(false)}
              alt=""
            />
          </div>
        )}
      </div>
      }
    </div>
  );
};

export default Event;
