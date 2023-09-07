import { courseralogo, logo } from "@/util/env";
import { Button, Grid, Typography } from "@mui/material";
import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { parse, serialize } from 'cookie';
import { useRecoilValue } from "recoil";
import { isSignedin } from "@/recoiatoms/issignin";

export function Appbar(){
    const router = useRouter();
    const nav = (page: Url) => {router.push(page);};
    const issignedin =useRecoilValue(isSignedin)

    const center ={display:"flex", justifyContent:"center"}
    const appbarstyle={backgroundColor:"#f5f5f5",border:"1px solid rgba(233, 242, 255,1)",paddingTop:"0.5%",paddingBottom:"0.5%"}
    var p3 =
        <div style={{display:"flex",justifyContent:"space-between",padding:10,}}>
            <div>
                <Button style={{display:"flex",margin:10}} variant="contained" onClick={()=>{
                    nav('/signup')
                }}>Sign Up</Button>
            </div>
            <div>
                <Button style={{display:"flex",margin:10}} variant="contained" onClick={()=>{
                    nav('/signin')
                }}>Sign In</Button>
            </div>
        </div>
    if(issignedin){
        p3=<div>
            <Typography>Dynamic content</Typography>
        </div>
    }
    return (
    <Grid container spacing={2} style={appbarstyle}>
        <Grid item lg={4} style={{display:"flex",justifyContent:"left"}}>
            <img style={{padding:"3%",width:"30%", height:"auto" }} 
            src={courseralogo}
            alt="image here" onClick={()=>{
                window.location.href='/'
            }}/>
        </Grid>
        <Grid item lg={4} style={{display:"flex",justifyContent:"center"}}>
            <Typography >Codes-Era</Typography>
        </Grid>
        <Grid item lg={4} style={{display:"flex",justifyContent:"right"}}>
            <div style={{marginRight:"10%"}}>
                {p3}
            </div>
        </Grid>
    </Grid>
    )
}