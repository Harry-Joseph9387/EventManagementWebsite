require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User=require('./models/User')
const Events=require('./models/Events')
const jwt = require('jsonwebtoken');
const UserActivity=require('./models/UserActivity')
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB", err));

 
app.listen(3000, () => {
    console.log(`Server running on port 3000`);
  });

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
    res.status(200).json({ token });
})

app.post('/signup', async (req, res) => {
    const { username, email, password,contactNo } = req.body;
    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        console.log("already exists")
        return res.status(400).json({ message: 'Username or Email already exist' });
      }
  
      const newUser = new User({ username, email, password,contactNo });
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
  const {username}=req.body;
  const x = await UserActivity.findOne({ username });
  if(!x){console.log("no useractivity")}
  const x1=x.likedevents
  const x2=x.registeredevents
  return res.status(200).json({username,x1,x2})
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
    await addingEvent.save()
    res.status(201).json({message:"event created"}); 
  }
  catch(err){
    console.log(err)
  }
})
