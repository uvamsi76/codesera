import express, {Request, Response,NextFunction, Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User,Admin,Course } from "../db/db";
import {SECRET,authenticateJwt} from "../middleware/auth"
import { z } from "zod"
import { adminSchema } from "../zodschemas/adminschema"
import {handlesignup, handleMe, handleaddcourse, handleupdatecourse, handledeletecourse} from "../controllers/admin"
const adminrouter=express.Router();
adminrouter.use(bodyParser.json())
adminrouter.use(express.json());




//me
adminrouter.get("/me", authenticateJwt,handleMe );

console.log("test admin route")
// signup
adminrouter.post('/signup',authenticateJwt, handlesignup);

//add course
adminrouter.post('/courses', authenticateJwt,handleaddcourse );

//update course

adminrouter.put('/courses/:courseId', authenticateJwt,handleupdatecourse );

//delete course

adminrouter.delete('/delete/:courseId',authenticateJwt,handledeletecourse)

export default adminrouter