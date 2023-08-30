import express, {Request, Response,NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User,Admin,Course } from "../db/db";
import {SECRET,authenticateJwt} from "../middleware/auth"
import {userSchema} from "../zodschemas/user"
const userrouter=express.Router();
userrouter.use(express.json());


// User routes
userrouter.post('/signup', async (req, res) => {
  const { firstname,lastname, username, email, phoneno, password, country, dob, profilePic }= req.body;
  console.log(firstname,lastname, username, email, phoneno, password, country, dob, profilePic)
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
      const purchasedCourses=[]
      const admin={
        isAdmin:false,
        adminId:null,//"_aid"
      }
      const DOB =new Date(dob)
      console.log(DOB)
      console.log(dob)
      const newUser = new User({ firstname,lastname, username, email, phoneno, password, country, DOB, profilePic ,purchasedCourses, admin });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token , newUser });
    }
  });
  
  userrouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    //"Admin":{
    // "isAdmin":true,
    // "Adminid":"_aid"}
    const user = await User.findOne({ username, password });
    if (user) {
      const role= user.admin?.isAdmin ? 'admin' : 'user';
      const token = jwt.sign({ username, role: role }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token ,username});
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  
  // userrouter.get('/courses', async (req, res) => {
  //   const courses = await Course.find({published: true});
  //   res.json({ courses });
  // });
  
  // userrouter.post('/courses/:courseId', authenticateJwt, async (req, res) => {
  //   const course = await Course.findById(req.params.courseId);
  //   console.log(course);
  //   if (course) {
  //     const user = await User.findOne({ username: req.headers["user"] });
  //     if (user) {
  //       user.purchasedCourses.push(course.id);
  //       await user.save();
  //       res.json({ message: 'Course purchased successfully' });
  //     } else {
  //       res.status(403).json({ message: 'User not found' });
  //     }
  //   } else {
  //     res.status(404).json({ message: 'Course not found' });
  //   }
  // });
  
  // userrouter.get('/purchasedCourses', authenticateJwt, async (req, res) => {
  //   const user = await User.findOne({ username: req.headers["user"] }).populate('purchasedCourses');
  //   if (user) {
  //     res.json({ purchasedCourses: user.purchasedCourses || [] });
  //   } else {
  //     res.status(403).json({ message: 'User not found' });
  //   }
  // });

  export default userrouter