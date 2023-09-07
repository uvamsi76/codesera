import { Button, Card, Grid, TextField, Typography } from "@mui/material"
import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { useState } from "react"
import { ec2 } from "@/util/env";
import { parse, serialize } from 'cookie';

export default function SigninComponent(){
    const router = useRouter();
    const nav = (page: Url) => {
      router.push(page);
    };
    const center ={display:"flex", justifyContent:"center"}
    const [email,setEmail]=useState("");
    const [firstname,setFirstname]=useState("");
    const [lastname,setLastname]=useState("");
    const [username,setUsername]=useState("");
    const [phoneno,setPhoneno]=useState("");
    const [country,setCountry]=useState("");
    const [dob,setDob]=useState("");
    const [profilePic,setProfilePic]=useState("");
    const [password,setPassword]=useState("");

    const handleSignin=async () => {
        const response = await fetch(ec2+'/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname,lastname, username, email, phoneno, password, country, dob, profilePic })
        });
        console.log(response)
        const data=await response.json()
        
        const isadmin= String(data.role == "admin")
        localStorage.setItem("token", data.token)
        localStorage.setItem("isadmin",isadmin)
        localStorage.setItem("email", data.email)
        document.cookie = serialize("token", data.token,{
            maxAge: 3600, // Expires in 1 hour (in seconds)
            path: '/', // Cookie is accessible from the root path
          })
        document.cookie = serialize("isadmin",isadmin,{
            maxAge: 3600, // Expires in 1 hour (in seconds)
            path: '/', // Cookie is accessible from the root path
          })
          document.cookie = serialize("email", data.email,{
            maxAge: 3600, // Expires in 1 hour (in seconds)
            path: '/', // Cookie is accessible from the root path
          })
        nav("/")
    }

    return (
        <Grid container spacing={2} style={center}>
            <Grid item lg={4} md={6} sm={12} xs={12}style={{display:"flex",flexDirection:"column",alignItems:"center",margin:"1%"}}>
                <Card elevation={2} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0%",width:"100%",marginTop:"20%",marginBottom:"20%"}}>
                    <Typography variant="h5" style={{marginTop:"5%"}}>Signup</Typography>
                    <div style={{display:"flex",justifyContent:"space-between",margin:"5%"}}>
                        <TextField style={{margin:"1%"}} id="outlined-basic" label="Firstname*" variant="outlined" onChange={(e)=>{setFirstname(e.target.value)}}/>
                        <TextField style={{margin:"1%"}} id="outlined-basic" label="Lastname*" variant="outlined" onChange={(e)=>{setLastname(e.target.value)}}/>
                    </div>
                    <TextField style={{width:"88%"}} id="outlined-basic" label="Username" variant="outlined" onChange={(e)=>{setUsername(e.target.value)}}/>
                    <TextField style={{marginTop:"5%",width:"88%"}} id="outlined-basic" label="Phoneno" variant="outlined" onChange={(e)=>{setPhoneno(e.target.value)}}/>
                    <TextField style={{marginTop:"5%",width:"88%"}} id="outlined-basic" label="Country" variant="outlined" onChange={(e)=>{setCountry(e.target.value)}}/>
                    <TextField style={{marginTop:"5%",width:"88%"}} id="outlined-basic" label="Dob" variant="outlined" onChange={(e)=>{setDob(e.target.value)}}/>
                    <TextField style={{marginTop:"5%",width:"88%"}} id="outlined-basic" label="ProfilePic" variant="outlined" onChange={(e)=>{setProfilePic(e.target.value)}}/>
                    <TextField style={{marginTop:"5%",width:"88%"}} id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <TextField style={{marginTop:"5%",width:"88%"}} id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>

                    <div style={{display:"flex",justifyContent:"space-between",margin:"10%"}}>
                        <Button variant="contained" style={{marginRight:"10%"}} onClick={handleSignin}>signup</Button>
                    </div>
                    <Button size="small" style={{fontSize:"70%",marginBottom:"10%"}} onClick={()=>nav('/signin')}>sigin up instead?</Button>
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