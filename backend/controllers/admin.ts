import express, {Request, Response,NextFunction, Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import { User,Admin,Course } from "../db/db";
import {SECRET,authenticateJwt} from "../middleware/auth"
import { string, z } from "zod"
import { adminSchema} from "../zodschemas/adminschema"
import { courseSchema } from "../zodschemas/courseschema"
import mongoose from "mongoose";

//Signup Route
export const handlesignup=async (req, res) => {
    console.log(req.headers["userId"])
    const userId =req.headers["userId"]
    const admin= await Admin.findOne({ userId })
    console.log(admin)
      if(admin) {
        console.log(admin._id)
        res.status(403).json({ message: 'Admin already exists' });
        return
      } 
        const user= await User.findOne({_id:userId});
        console.log(user)
        if(user && user.admin && !user.admin.isAdmin){
            const email=user.email
            const publishedCourses =[]
            const students=[]
            const couponCodes=[]
            const scheduledClasses=[]
            const performance=[]
            const username=user.username
            const userid=user.id
            const obj = { userId:userid,email,username,publishedCourses,students,couponCodes,scheduledClasses,performance };
            const parsedInput = adminSchema.safeParse(obj)
            if(!parsedInput.success){
                res.status(411).json({error:parsedInput.error.issues})
                return
            }
            try{
                const newAdmin = new Admin(obj);
                const ad=await newAdmin.save();
                user.admin.isAdmin=true;
                user.admin.adminId=ad?._id;
                const usr=await user.save();
                if(ad && usr){
                    console.log(ad?._id)
                    const token = jwt.sign({ email:usr.email, role: 'admin', id:usr.id}, SECRET, { expiresIn: '1h' });
                    res.status(200).json({ message: 'Admin created successfully', token ,username});
                }
                else{
                    res.status(500).json({message:"internal error"})
                }
            }
            catch(err){
                res.status(500).json({message:err})
            }
        }
        else{
            res.status(404).json({message:"user not found or you are probably admin"})
        }
    }

// me Route
export const handleMe=async (req, res) => {
    const admin = await User.findOne({ username: req.headers["username"] });
    if (!admin) {
      res.status(403).json({msg: "Admin doesnt exist"})
      return
    }
    res.json({
        username: admin.username
    })
}

// add course
//rating,students_enrolled,no_of_students

//authors
export const handleaddcourse =async (req, res) => { 
    const {title,description,price,thumbnail,category,
        authors,outcomes,prerequisites,courseContent,ispublished,isCompleted}=req.body
    const admin = await Admin.findOne({ userId: req.headers["userId"] });
    console.log(authors)
    if(!admin){
        res.status(404).json({ message: 'admin not found retry after creating admin account' });
        return
    }
    const rating=0;
    const students_enrolled=[];
    const no_of_students =0;
    var adm;
    let Authors:String[]=[];
    for(var i=0;i< authors.length;i++){
        adm=await Admin.findOne({email:authors[i]})
        if(!adm){
            res.status(404).json({message:"author not found"})
            return
        }
        console.log("adm")
        console.log(adm)
        try{
        await Authors.push(adm.id)
        }
        catch(err){
            console.log(err)
            res.status(404).json({message:"author not found",error:err})
            return
        }
    }
    const coursedata={title,description,price,thumbnail,category,rating,
    authors:Authors,students_enrolled,no_of_students,outcomes,prerequisites,ispublished,courseContent}
    const parsedinput=courseSchema.safeParse(coursedata)
    if(!parsedinput.success){
        res.status(411).json({message:parsedinput.error.issues})
        return
    }
    try{ 
        const course = new Course(coursedata);
        const courseId=course.id
        admin.publishedCourses.push({courseId,isCompleted});
        const crs=await course.save();
        const admn=await admin.save();
        if(crs && admn){
            res.status(200).json({ message: 'Course created successfully', courseId: course.id ,admin:req.headers["user"]});
        }
        else{
            res.status(500).json({ message: 'Internal error' });  
        }
    }
    catch(err){
        res.status(500).json({ message: 'Course not found Internal error',error:err });
    }
}

export const handleupdatecourse=async (req, res) => {
    function checkpcourses(pcourses,courseid){
        const st=pcourses.map((crss)=>{return(String(crss)==String(courseid))})
        return st.includes(true)
    }
    const {title,description,price,thumbnail,category,
        authors,outcomes,prerequisites,courseContent,ispublished,isCompleted}=req.body
    console.log("---------------handle upcs--------------- ")
    console.log("handle upcs "+req.headers["userId"])
    const admin = await Admin.findOne({ userId: req.headers["userId"] });
    const course= await Course.findById(req.params.courseId)
    const pcourses= admin?.publishedCourses.map((doc)=> {return doc.courseId} )
    console.log(admin)
    console.log(course)
    console.log(pcourses)
    if(!admin){
        res.status(404).json({ message: 'admin not found retry after creating admin account' });
        return
    }
    else if(!course){
        res.status(404).json({ message: 'course not found retry with proper course id' });
        return
    }
    else if(pcourses && !checkpcourses(pcourses,course.id)){
        console.log(checkpcourses(pcourses,course.id))
        res.status(404).json({ message: 'not authorised to change this course since you did not publish it' });
        return
    }
    const rating=course?.rating;
    const students_enrolled=course?.students_enrolled;
    const no_of_students =course?.no_of_students;
    var adm;
    let Authors:String[]=[];
    for(var i=0;i< authors.length;i++){
        adm=await Admin.findOne({email:authors[i]})
        if(!adm){
            res.status(404).json({message:authors[i]+" author not found"})
            return
        }
        console.log(adm)
        console.log(authors[i])
        await Authors.push(adm.id)
    }
    const coursedata={title,description,price,thumbnail,category,rating,
    authors:Authors,students_enrolled,no_of_students,outcomes,prerequisites,ispublished,courseContent}
    const parsedinput=courseSchema.safeParse(coursedata)
    if(!parsedinput.success){
        res.status(411).json({message:parsedinput.error.issues})
        return
    }
    try{    
        const courseId=course.id
        const admn=await Admin.updateOne(
            {
               userId: req.headers["userId"],
              'purchasedCourses.courseId': courseId
            },
            {
              $set: { 'purchasedCourses.$.isCompleted': isCompleted }
            }
          ).exec()
        const crs=await Course.findByIdAndUpdate(req.params.courseId, coursedata, { new: true });
        console.log("crs ,admn")
        console.log(crs ,admn)
        if(crs && admn){
            res.status(200).json({ message: 'Course updated successfully', courseId: course.id ,admin:req.headers["email"]});
        }
        else{
            res.status(500).json({ message: 'Internal error' });  
        }
    }
    catch(err){
        res.status(500).json({ message: 'Course not found Internal error',error:err });
    }
}
    
export const handledeletecourse=async (req,res)=>{
    const course= await Course.findById(req.params.courseId)
    const admin = await Admin.findOne({ userId: req.headers["userId"] });
    const pcourses= admin?.publishedCourses.map((doc)=> {return String(doc.courseId)} )
    
    console.log(pcourses)
    if(!admin){
        res.status(404).json({ message: 'admin not found retry after creating admin account' });
        return
    }
    else if(!course){
        res.status(404).json({ message: 'course not found retry with proper course id' });
        return
    }
    else if(pcourses && !pcourses.includes(course.id)){
        const ispresent= pcourses?.map((id)=>{console.log(id);return id==String(admin._id)});
        console.log(course._id)
        console.log(pcourses.includes(String(admin._id)))
        console.log(ispresent)
        res.status(404).json({ message: 'not authorised to change this course since you did not publish it' });
        return
    }
    try{
        const courseId=course.id
        const crs = await Course.findByIdAndDelete(courseId)
        const admn=await Admin.updateOne(
            { userId: req.headers["userId"] },
            { $pull: { purchasedCourses: { courseId: courseId } } }
          ).exec()
        if(crs && admn){
            res.status(200).json({ message: 'Course deleted successfully', courseId: courseId ,admin:req.headers["email"]});
        }
        else{
            res.status(500).json({ message: 'Internal error' });  
        }
    }
    catch(err){
        res.status(500).json({ message: 'Course not found Internal error',error:err });
    }




    // const course = await Course.findByIdAndDelete(req.params.courseId);
    // const admin =await Admin.findOne({ username: req.headers["user"] })
    // if(admin?.publishedCourses)
    // admin?.publishedCourses.forEach((element,index)=>{
    //     if(String(element) == req.params.courseId) admin?.publishedCourses.splice(index,1);
    // });
    //  admin?.save()
    // if (course) {
    //   res.json({ message: 'Course deleted successfully' });
    // } else {
    //   res.status(404).json({ message: 'Course not found' });
    // }
  }
    // const updatedCourse= req.body;

    // const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    // if (course) {
    //   res.json({ message: 'Course updated successfully' });
    // } else {
    //   res.status(404).json({ message: 'Course not found' });
    // }
    //}