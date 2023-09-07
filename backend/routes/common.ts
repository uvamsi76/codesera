import express, {Request, Response,NextFunction, Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User,Admin,Course } from "../db/db";
import {SECRET,authenticateJwt} from "../middleware/auth"


const  commonrouter=express.Router();
 commonrouter.use(bodyParser.json())
 commonrouter.use(express.json());


commonrouter.get('/courses', async (req, res) => {
   const courses = await Course.find({});
   console.log(courses)
   res.json({ courses });
});
commonrouter.get('/courses/:courseid',async(req:Request,res:Response) =>{
  const course=await Course.findById(req.params.courseid)
  res.status(200).json(course)
})
export default commonrouter;