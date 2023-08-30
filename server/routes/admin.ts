import express, {Request, Response,NextFunction, Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User,Admin,Course } from "../db/db";
import {SECRET,authenticateJwt} from "../middleware/auth"




const adminrouter=express.Router();
adminrouter.use(bodyParser.json())
adminrouter.use(express.json());


adminrouter.get("/me", authenticateJwt, async (req, res) => {
  const admin = await User.findOne({ username: req.headers["username"] });
  if (!admin) {
    res.status(403).json({msg: "Admin doesnt exist"})
    return
  }
  res.json({
      username: admin.username
  })
}); 

adminrouter.post('/signup',authenticateJwt, async (req, res) => {
  var i=0
  console.log(i++)
  const {userId} =req.body
  const admin= await Admin.findOne({ userId })
  console.log(i++)
    if(admin) {
      res.status(403).json({ message: 'Admin already exists' });
      console.log(admin._id)
    } else {
      const user= await User.findOne({_id:userId});
      const publishedCourses =[]
      const students=[]
      const couponCodes=[]
      const scheduledClasses=[]
      const performance=[]
      console.log(user)
      if(user && user.admin && !user.admin.isAdmin){
        console.log(i++)
        const username=user.username
        const obj = { userId,publishedCourses,students,couponCodes,scheduledClasses,performance,username };
        const newAdmin = new Admin(obj);
        await newAdmin.save();
        const ad=await Admin.findOne({ userId })
        user.admin.isAdmin=true;
        user.admin.adminId=ad?._id;
        await user.save();
        console.log(ad?._id)
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token ,username});
        console.log(i++)
    }}
  });

adminrouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token ,username});
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

// adminrouter.post('/courses', authenticateJwt, async (req, res) => {
//   const {title,description,price,imageLink,published}=req.body
//   const admin = await Admin.findOne({ username: req.headers["user"] });
//   const Author=admin?._id
//   if(admin){
//     const course = new Course({title,description,price,imageLink,published,Author});
//     await course.save();
//     if(course){
//       admin.publishedCourses.push(course.id);
//       await admin.save();
//       res.status(200).json({ message: 'Course created successfully', courseId: course.id ,admin:req.headers["user"]});
//     }
//     else{
//       res.status(500).json({ message: 'Course not found Internal error' });  
//     }
//   }
//   else{
//     res.status(404).json({ message: 'admin not found retry after some time' });
//   }
  
// });

// adminrouter.get('/courses/:courseId', authenticateJwt, async (req, res) => {
//   const course = await Course.findById(req.params.courseId);
//   res.json({ course });
//   console.log(course)
// });

// adminrouter.put('/courses/:courseId', authenticateJwt, async (req, res) => {
//   const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
//   if (course) {
//     res.json({ message: 'Course updated successfully' });
//   } else {
//     res.status(404).json({ message: 'Course not found' });
//   }
// });

// adminrouter.get('/publishedCourses', authenticateJwt, async (req, res) => {
//     const admin = await Admin.findOne({ username: req.headers["user"] }).populate('publishedCourses');
//     if (admin) {
//       res.json({ purchasedCourses: admin.publishedCourses || [] });
//     } else {
//       res.status(403).json({ message: 'User not found' });
//     }
//   });
// adminrouter.delete('/delete/:courseId',authenticateJwt,async (req,res)=>{
//     const course = await Course.findByIdAndDelete(req.params.courseId);
//     const admin =await Admin.findOne({ username: req.headers["user"] })
//     if(admin?.publishedCourses)
//     admin?.publishedCourses.forEach((element,index)=>{
//         if(String(element) == req.params.courseId) admin?.publishedCourses.splice(index,1);
//      });
//      admin?.save()
//     if (course) {
//       res.json({ message: 'Course deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'Course not found' });
//     }
// })


// function callback(admin) {
//   if (admin) {
//     res.status(403).jsimilarson({ message: 'Admin already exists' });
//   } else {
//     const obj = { username: username, password: password };
//     const newAdmin = new Admin(obj);
//     newAdmin.save();
//     const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
//     res.json({ message: 'Admin created successfully', token });
//   }
// }

export default adminrouter