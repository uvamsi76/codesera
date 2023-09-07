"use client"
import { Button, Card, Grid, TextField, Typography } from "@mui/material"
import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { useState } from "react"
import { ec2 } from "@/util/env";
import {setCookie} from "../util/cookies"
import { useRecoilState } from "recoil";
import {isSignedin} from "../recoiatoms/issignin"
export default function SigninComponent(){
    const router = useRouter();
    const nav = (page: Url) => {
      router.push(page);
    };
    const center ={display:"flex", justifyContent:"center"}
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [issignedin,setIssignedin]=useRecoilState(isSignedin)

    const handleSignin=async () => {
        const response = await fetch(ec2+'/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data=await response.json()
        console.log(data)

        const isadmin= String(data.role == "admin")
        setIssignedin(true)
        localStorage.setItem("token", data.token)
        localStorage.setItem("isadmin",isadmin)
        localStorage.setItem("email", data.email)
        setCookie("token", data.token,{
            maxAge: 3600, // Expires in 1 hour (in seconds)
          })
        setCookie("isadmin",isadmin,{
            maxAge: 3600, // Expires in 1 hour (in seconds)
          })
        setCookie("email", data.email,{
            maxAge: 3600, // Expires in 1 hour (in seconds)
          })
        nav("/")
    }

    return (
        <Grid container spacing={2} style={center}>
            <Grid item lg={4} md={6} sm={12} xs={12}style={{display:"flex",flexDirection:"column",alignItems:"center",margin:"1%"}}>
                <Card elevation={2} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0%",width:"100%",marginTop:"20%",marginBottom:"20%"}}>
                    <Typography variant="h5" style={{marginTop:"5%"}}>Signin</Typography>
                    <TextField style={{marginTop:"10%"}} id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <TextField style={{marginTop:"10%"}} id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <div style={{display:"flex",justifyContent:"space-between",margin:"10%"}}>
                        <Button variant="contained" style={{marginRight:"10%"}} onClick={handleSignin}>signin</Button>
                        <Button size="small" style={{fontSize:"70%",marginLeft:"10%"}}> forgot password ?</Button>
                    </div>
                    <Button size="small" style={{fontSize:"70%",marginBottom:"10%"}} onClick={()=>nav('/signup')}>sign up instead?</Button>
                </Card>
            </Grid>
        </Grid>
    )

}
//style={{paddingBottom:"44%"}}
//style={{display:"flex",flexDirection:"column",alignItems:"center",flexWrap:"wrap",paddingTop:"10%"}}
//,paddingTop:30 ,height:"200%",width:"20%",    


        // // Todo: Create a type for the response that you get back from the server
        // const data = await response.json();
        // if (data.token) {
        //     localStorage.clear();
        //      setTokenn(data.token)
        //      Setisadmin(true)
        //     localStorage.setItem("token", data.token)
        //     localStorage.setItem("isadmin","true")
        //     localStorage.setItem("user", data.username)
        //     window.location.href = "/";
        // } else {
        //     alert("Error while signing up");
        // }