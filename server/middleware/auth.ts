import express, {Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

export const SECRET = 'SECr3t';  // This should be in an environment variable in a real application

export const authenticateJwt = (req:Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, SECRET, (err, payload) => {
        if (err) {
            console.log(err)
          return res.sendStatus(403);
        }
        if (!payload) {
            console.log(payload)
          return res.sendStatus(403);
        }
        if (typeof payload === "string") {
          return res.sendStatus(403);
        }
        req.headers["user"] = payload.username;
        req.headers["userid"] = payload.id;
        console.log(payload)
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };