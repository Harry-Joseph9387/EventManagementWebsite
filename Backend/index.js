require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User=require('./models/User')
const Events=require('./models/Events')
const EventsInfo=require('./models/EventsInfo')
const jwt = require('jsonwebtoken');
const UserActivity=require('./models/UserActivity')
const app = express();
app.use(cors({
  origin:["https://event-management-website-delta.vercel.app"],
  methods:["POST","GET","PUT"],
  credentials:true
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB", err));


app.listen(3000, () => {
    console.log(`Server running on port 3000`);
  });

app.get("/",(req,res)=>{
  res.json("hello")
}) 
  
app.post('/login',async(req,res)=>{
    const { username, password} = req.body;
    console.log(username,password)
    const user=await User.findOne({username});
    console.log(user)
    if(!user || password!==user.password){
        console.log('Invalid credentials')
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret key is missing' });
  }
    const token = jwt.sign({username: user.username },process.env.JWT_SECRET,{ expiresIn: '1h' }
      );
    res.status(200).json({ token,admin:user.admin });
})

app.post('/signup', async (req, res) => {
    const { username, email, password,contactNo } = req.body;
    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        console.log("already exists")
        return res.status(400).json({ message: 'Username or Email already exist' });
      }
  
      const newUser = new User({ username, email, password,contactNo,admin:'false' });
      const newUserActivity= new UserActivity({username,likedevents:[],registeredevents:[]})
      await newUserActivity.save();
      await newUser.save();
  
      res.status(201).json({message:"user created"}); // Send user details (without password)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

app.post('/useractivity',async(req,res)=>{
  const {username_useractivity}=req.body;

  const x = await UserActivity.findOne({username:username_useractivity});
  
  if(!x){console.log("no useractivity");return res.status(404).json({message:"no useractivity"})}
  
  return res.status(200).json(x)
})

app.get('/userevents',async(req,res)=>{
  try{
    const allevents=await Events.find({}).lean()
    return res.status(200).json({allevents})
    }
  catch(err){
    console.log(err)
  }
})
app.post('/checkevent',async(req,res)=>{
  try{
    const event=req.body
    console.log('check event',event)
    const isEventExist=await Events.findOne({title:event.title})
    if(isEventExist){
      return res.status(403).json({message:'event already exist'})
    }
    else{
      return res.status(201).json({message:"unique event"})
    }
}catch(err){
  console.log(err)
}})


app.post('/addevent',async(req,res)=>{
  try{
    const event=req.body
    const {organizer,about,title,location,time,image,comments}=event
    console.log('addevent',event)
    const addingEvent=new Events({organizer,about,title,location,time,comments,image})
    const addingEventsInfo=new EventsInfo({eventname:title,likedusers:[],registeredusers:[]})
    await addingEventsInfo.save()
    await addingEvent.save()
    res.status(201).json({message:"event created"}); 
  }
  catch(err){
    console.log(err)
  }})
  
app.put('/addcomment',async(req,res)=>{
    try{
      const {comment,currentEventTitle}=req.body
      // console.log(comment,currentEventTitle)
      const event= await Events.findOne({title:currentEventTitle})
      console.log(event.comments)

        event.comments=[...event.comments,comment]
        await event.save()
        return res.status(200).json({message:"comment added"})
      
    }
    catch(err){
      console.log(err)
    } 
  })


app.post('/addlikedregistered',async(req,res)=>{
  try{
    const {temporaryUsr,tempEventsInfo}=req.body
    // console.log(temporaryUsr,eventname)
    const username=temporaryUsr.username
    const eventname=tempEventsInfo.eventname
    const useractivity=await UserActivity.findOneAndReplace({username:username},temporaryUsr,{new:true})
    const eventsinfo=await EventsInfo.findOneAndReplace({eventname:eventname},tempEventsInfo,{new:true})
    if (!useractivity) {
      return res.status(404).json({ message: "no useractivity" });
    }
    if (!eventsinfo) {
      return res.status(404).json({ message: "no eventsINfo" });
    }
    console.log('/addlikedregistered',tempEventsInfo)
    res.status(200).json({message:'updatedUser'});  // Send the updated user as the response
  }
  catch(err){
    console.log(err)
  }
})

app.post('/eventsinfo',async(req,res)=>{
  const {eventname}=req.body;
  const evnt=await EventsInfo.find({eventname:eventname})
  const x=evnt[0]
  console.log('/eventsinfo',x);
  return res.status(200).json(x)
})