import express, {Request, Response,NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User,Admin,Course } from "../db/db";
import {SECRET,authenticateJwt} from "../middleware/auth"
import {userSchema , userloginSchema} from "../zodschemas/userschema"
import {handlesignup ,handlelogin ,handlecourse,handlegetpurchasedcourse} from "../controllers/user"

const userrouter=express.Router();
userrouter.use(express.json());


// User routes
//Signup Route
userrouter.post('/signup',handlesignup);
  //Login Route
userrouter.post('/login', handlelogin);
  
  // userrouter.get('/courses', async (req, res) => {
  //   const courses = await Course.find({published: true});
  //   res.json({ courses });
  // });
// buy course route
userrouter.post('/courses/:courseId', authenticateJwt,handlecourse);
  
userrouter.get('/purchasedCourses', authenticateJwt, handlegetpurchasedcourse);

export default userrouter