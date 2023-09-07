"use client"
import { Button, Grid, Typography } from "@mui/material"
import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/navigation";

export default function Part1(){
    const router = useRouter();
    const nav = (page: string) => {
      router.push(page);
    };
    return(
    <Grid container style={{display:"flex",justifyContent:"center"}}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h1" style={{marginTop:"10%",fontFamily:"Ubuntu",color:"black",fontWeight:550,fontSize:60}} >Learn without limits </Typography>
            <Typography variant="subtitle1" style={{marginTop:"5%"}}>Start, switch, or advance your career with more than 5,800 courses, Professional Certificates, 
                and degrees from world-class universities and companies.</Typography>
            <div style={{display:"flex", marginTop:"5%",height:"20%"}}>
                <Button variant="contained" size="large" 
                    style={{borderRadius:"0.5vw",width:"50%",margin:"2%",backgroundColor:"#0056d2",fontWeight:550,fontSize:10}} onClick={()=>{
                        nav('/signup_user')
                    }}>
                        Join for free
                </Button>
                <Button variant="outlined" size="small"
                    style={{borderRadius:"0.5vw",width:"50%",margin:"2%",borderWidth:"3px",borderStyle:"solid",fontWeight:550,fontSize:10,borderColor:"#0056d2"}} onClick={()=>{
                        nav('/signup_admin')
                    }}>
                        Try coursera for buisiness
                </Button>
            </div>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
            <img style={{marginLeft:"10%"}} src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5CFC8u8XiXcbSOlVv6JZQx/4e6f898f57f9d798437b3aa22026e30b/CourseraLearners_C_Composition_Hillary_copy__3_.png?auto=format%2Ccompress&dpr=1&w=459&h=497&q=40" alt="coursera logo" />
        </Grid>
    </Grid>
    )
}