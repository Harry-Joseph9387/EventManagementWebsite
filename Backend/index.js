require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User=require('./models/User')
const Events=require('./models/Events')
const EventsInfo=require('./models/EventsInfo')
const jwt = require('jsonwebtoken');
const UserActivity=require('./models/UserActivity')
const nodemailer = require("nodemailer");
const app = express();
app.use(cors(
  {
  origin:[process.env.BASE_URL],
  allowedHeaders: ['Content-Type', 'Authorization'],  
  methods:["POST","GET","PUT","OPTIONS"],
  credentials:true
}
));
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
  
      const newUser = new User({ username, email, password,contactNo,admin:'false',bio:"",location:"",image:"" });
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

  let x = await UserActivity.findOne({username:username_useractivity});
  let y=await User.findOne({username:username_useractivity})
  let z={...x._doc,"image":y.image,"email":y.email,"contactNo":y.contactNo}
  
  if(!x){console.log("no useractivity");return res.status(404).json({message:"no useractivity"})}
  
  return res.status(200).json(z)
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
    const addingEvent=new Events({organizer,about,title,location,time,comments,image})
    let organizer_user=await UserActivity.findOne({username:organizer})
    console.log(event)
    if(organizer_user.organizedevents){
      organizer_user.organizedevents=[...organizer_user.organizedevents,event.title]
    }
    else{
      organizer_user.organizedevents=[event.title]
    }
    await organizer_user.save()
    console.log("organized_User",organizer_user)

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
      const event= await Events.findOne({title:currentEventTitle})

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
  return res.status(200).json(x)
})

app.post('/userinfo',async(req,res)=>{
  const {username_fetchuser}=req.body
  const userFind=await User.find({username:username_fetchuser})
  const {username,password,email,contactNo,admin,bio,location,image}=userFind[0]
  res.status(200).json({username,email,contactNo,bio,location,image})
})

app.post('/updateuserinfo',async(req,res)=>{
  const {userDetails,oldusername}=req.body
  const newUsername=userDetails.username
  // const newUsername="harry1"
  

  //need to change event's organizer, user's comments and dp, (likedusers , registered users, on events info & userActivity) , 
  
  //updation of all username together works


  //username upadation on eventsinfo liked/registered users works
  const eventsinfo=await EventsInfo.find({})
  for (const eachEventInfo of eventsinfo){
    for (const eachLUser of eachEventInfo.likedusers){
      if(eachLUser===oldusername){
        eachEventInfo.likedusers=eachEventInfo.likedusers.map(eachUsername=>eachUsername===oldusername?newUsername:eachUsername)
      }
    }
    for (const eachRUser of eachEventInfo.registeredusers){
      if(eachRUser===oldusername){
        eachEventInfo.registeredusers=eachEventInfo.registeredusers.map(eachUsername=>eachUsername===oldusername?newUsername:eachUsername)
      }
    }
    await eachEventInfo.save()
  }

  //updation of username of useractivity works
  const useractivity=await UserActivity.findOne({username:oldusername})
  useractivity.username=newUsername
  await useractivity.save()


  //updation works for user's name in the comments
  await Events.updateMany(
    { "comments.username": oldusername }, // Find documents where comments array contains username = oldusername
    { $set: { "comments.$[elem].username": newUsername } }, // Update the username of matched array elements
    { arrayFilters: [{ "elem.username": oldusername }] } // Apply only to array elements with username = oldusername
  );

  await Events.updateMany(
    {"comments.username":oldusername},
    {$set:{"comments.$[elem].dp":userDetails.image}},
    {arrayFilters:[{"elem.username":oldusername}]}
  )
  
  //updation works for user's name in the organizer
  await Events.updateMany(
      {"organizer":oldusername},
      {$set:{"organizer":newUsername}}
    )
  
  
  await User.updateMany(
    {"username":oldusername},
    {$set:{
      "username":newUsername,
      "email":userDetails.email,
      "contactNo":userDetails.contactNo,
      "bio":userDetails.bio,
      "location":userDetails.location,
      "image":userDetails.image
    }}
  )
 
  
  
  
  return res.status(200).json({message:"xxxxx"})
})

app.post('/organizedevents',async(req,res)=>{
  const {username}=req.body
  const useractivity=await UserActivity.findOne({username:username})
  let data=await Promise.all(
  useractivity.organizedevents.map(async eventtitle=>{
    const eachevent=await Events.findOne({title:eventtitle})
    const eacheventinfo=await EventsInfo.findOne({eventname:eventtitle})
    return{"title":eventtitle,"image":eachevent.image,"registeredusers":eacheventinfo.registeredusers,"likedusers":eacheventinfo.likedusers}
  }))
  // console.log(data)
  return res.status(200).json(data)
})


app.post('/removeregistereduser',async(req,res)=>{
  const {eventName,user}=req.body
  const useractivity=await UserActivity.findOne({username:user})
  const eventsinfo=await EventsInfo.findOne({eventname:eventName})
  const event=await Events.findOne({title:eventName})
  const userDetails=await User.findOne({username:user})
  eventsinfo.registeredusers=eventsinfo.registeredusers.filter(x=>x!=user)
  useractivity.registeredevents=useractivity.registeredevents.filter(x=>x!=eventName)
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });
  const mailOptions = {
    from: `"Event Management App":${process.env.EMAIL_USER}`, // sender address
    to: userDetails.email, // recipient's email
    subject: `You have been removed from the event: ${eventName}`,
    text: `Dear ${user},\n\nYou have been removed from the event: "${eventName}" by the organizer "${event.organizer}".\n\nIf you have any questions, please contact the event organizer.\n\nBest regards,\nEvent Management App Team`,
  };
  await transporter.sendMail(mailOptions);
  await eventsinfo.save()
  await useractivity.save()
  return res.status(200).json()
})

app.post('/validateEmail', async (req, res) => {
  const { email } = req.body;

  try {
      const userExists = await User.findOne({ email });
      if (userExists) {
          return res.json({ isAvailable: false }); // Email is already taken
      } else {
          return res.json({ isAvailable: true }); // Email is available
      }
  } catch (error) {
    res.status(500).json({error: 'Internal server error' });
  }})