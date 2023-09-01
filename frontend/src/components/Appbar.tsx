import { Grid } from "@mui/material";

export function Appbar(){
const center ={display:"flex", justifyContent:"center"}
const appbarstyle={display:"flex",justifyContent:"space-between", backgroundColor:"#f5f5f5",border:"1px solid rgba(233, 242, 255,1)",paddingTop:"0.5%",paddingBottom:"0.5%"}
return (
<div style={appbarstyle}>
    <div style={{paddingLeft:"3%"}}>
        Appbar
    </div>
    <div style={{paddingLeft:"0%"}}>
        Appbar
    </div>
    <div style={{paddingRight:"3%"}}>
        Appbar
    </div>
</div>
)
}