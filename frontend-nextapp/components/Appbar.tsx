import { courseralogo, logo } from "@/util/env";
import { Button, Grid, Typography } from "@mui/material";
import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isSignedin } from "@/recoiatoms/issignin";
// import Cookies from 'js-cookie';
// import { cookies } from 'next/headers'
import Issignedin from "./appbarcomponents/Issignedin";
import Logo from "./appbarcomponents/Appbarlogo";


export  function Appbar(){
    // const issignedin =Cookies.get("token")
    const issignedin="wiefa"

    // const issignedinvalue = getCookie('token')
    console.log(issignedin)

    const center ={display:"flex", justifyContent:"center"}
    const appbarstyle={backgroundColor:"#f5f5f5",border:"1px solid rgba(233, 242, 255,1)",paddingTop:"0.5%",paddingBottom:"0.5%"}
    return (
    <Grid container spacing={2} style={appbarstyle}>
        <Grid item lg={4} style={{display:"flex",justifyContent:"left"}}>
            <Logo/>
        </Grid>
        <Grid item lg={4} style={{display:"flex",justifyContent:"center"}}>
            <Typography >Codes-Era</Typography>
        </Grid>
        <Grid item lg={4} style={{display:"flex",justifyContent:"right"}}>
            <Issignedin issignedin={issignedin}/>
        </Grid>
    </Grid>
    )
}


// const router = useRouter();
// const nav = (page: string) => {router.push(page);};
// const issignedin =cookies().get("token")

// const issignedinvalue = getCookie('token')
// console.log(issignedin)

// var p3 =(
//     <div style={{display:"flex",justifyContent:"space-between",padding:10}}>
//         <div>
//             <Button style={{display:"flex",margin:10}} variant="contained" onClick={()=>{
//                 nav('/signup')
//             }}>Sign Up</Button>
//         </div>
//         <div>
//             <Button style={{display:"flex",margin:10}} variant="contained" onClick={()=>{
//                 nav('/signin')
//             }}>Sign In</Button>
//         </div>
//     </div>
// )
// if(issignedin){
//     p3=(<div>
//         <Typography>Dynamic content</Typography>
//     </div>)
// }