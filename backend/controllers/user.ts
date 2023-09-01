import express, {Request, Response,NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User,Admin,Course } from "../db/db";
import {SECRET,authenticateJwt} from "../middleware/auth"
import {userSchema , userloginSchema} from "../zodschemas/userschema"


//signup function
export const handlesignup=async (req, res) => {
    const { firstname,lastname, username, email, phoneno, password, country, dob, profilePic }= req.body;
    const purchasedCourses=[]
    const admin={
      isAdmin:false,
      adminId:null,//"_aid"
    }
    const DOB =new Date(dob)
    const userdata={ firstname,lastname, username, email, phoneno, password, country, DOB, profilePic ,purchasedCourses, admin }
    const parsedInput= userSchema.safeParse(userdata)
    if(!parsedInput.success){
      res.status(411).json({error:parsedInput.error.issues[0].message})
      return;
    }
    const uname=parsedInput.data.username
    const user = await User.findOne({ email });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    }
    else {
      try{
      const newUser = new User(userdata);
      const status=await newUser.save();
      if(status){
        const role= userdata.admin.isAdmin?"admin":"user"
        console.log(status.id)
        const token = jwt.sign({ email, role: role , id:status.id}, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token , newUser,role });
      }
      else{
        res.status(500).json({message:"Internal error sorry for inconvineance"})
      }
    }
      catch(err){
        console.log(err)
      }
    }
}

//LOGIN

export const handlelogin =async (req, res) => {
    const { email, password } = req.body;
    const parsedInput=userloginSchema.safeParse({email, password})
    if(!parsedInput.success){
      res.status(411).json({error:parsedInput.error.issues[0].message})
      return
    }
    try{
    const user = await User.findOne({ email });
    if (user) {
      if(user.password!=password){
        res.status(404).json({message:"Incorrect Password"})
        return
      }
      const role= user.admin?.isAdmin ? 'admin' : 'user';
      console.log(user.id)
      const token = jwt.sign({ email, role: role , id: user.id}, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token ,email,role});
    } 
    else {
      res.status(403).json({ message: 'User not found' });
    }
  }
  catch(err){
    res.status(500).json({message:"internal error sorry for the inconvinience"})
  }
}
//Buy Course

export const handlecourse= async (req, res) => {
    function checkpcourses(pcourses,courseid,isadmin,pubcourses?){
        if(isadmin){
            const st=pcourses.map((crss)=>{return(String(crss)==String(courseid))})
            const st2=pubcourses.map((crss)=>{return(String(crss)==String(courseid))})
            return st.includes(true) || st2.includes(true)
        }
        else{
            const st=pcourses.map((crss)=>{return(String(crss)==String(courseid))})
            return st.includes(true)
        }
    }
    const cid=req.params.courseId;
    const course = await Course.findById(cid);
    console.log(course);
    if (!course) {
        res.status(404).json({ message: 'Course not found' });
        return
    }
    const user = await User.findOne({ email: req.headers["email"] });
    if (!user) {
        res.status(403).json({ message: 'User not found' });
        return
    }
    const purcourses=user?.purchasedCourses.map((doc)=> {return doc.courseId})
    var pubcourses;
    console.log(!pubcourses)
    if(user.admin?.isAdmin){
        const admin=await Admin.findOne({userId:user.id})
        pubcourses=admin?.publishedCourses.map((doc)=> {return doc.courseId})
    }
    if(checkpcourses(purcourses,cid,user.admin?.isAdmin,pubcourses)){
        console.log(pubcourses)
        console.log(purcourses)
        res.status(404).json({message:"you already have this course"})
        return
    }
    const courseId=course.id
    const isCompleted=false
    const active=!isCompleted
    const status=0;
    const purchasecourse={courseId,active,isCompleted,status}
    user.purchasedCourses.push(purchasecourse);
    try{
        await user.save();
        res.json({ message: 'Course purchased successfully' });
    }
    catch(err){
        res.status(500).json({message:"internal server error"})
    }
    
}

export const handlegetpurchasedcourse=async (req, res) => {
    const user = await User.findOne({ _id:req.headers["userId"] })
    console.log(user)
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  }