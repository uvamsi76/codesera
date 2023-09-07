import express, {Request, Response,NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import adminrouter  from "./routes/admin";
import userrouter from "./routes/user"
import commonrouter from "./routes/common";
const PORT =3010;

const app=express();

app.use(bodyParser.json())
app.use(cors())
app.use(express.json());

console.log("test app.ts")
app.use("/api",commonrouter)
app.use("/api/admin",adminrouter)
app.use("/api",userrouter)
// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose.connect('mongodb+srv://uvamsi76:ybjSWKpCunZoIvwY@cluster0.vtksuht.mongodb.net/codes-era', { dbName: "codes-era" });

app.get('/',(req,res)=>{
  res.json("working fine mowa ")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT} ok`));