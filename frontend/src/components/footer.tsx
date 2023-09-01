import { Grid } from "@mui/material";

export default function Footer(){
const center ={display:"flex", justifyContent:"center"}
const appbarstyle={display:"flex",justifyContent:"space-between", backgroundColor:"#f5f5f5",border:"1px solid rgba(233, 242, 255,1)",paddingTop:"0.5%",paddingBottom:"0.5%"}
return (
<div style={appbarstyle}>
    <div style={{paddingLeft:"3%"}}>
    Footer
    </div>
    <div style={{paddingLeft:"0%"}}>
    Footer
    </div>
    <div style={{paddingRight:"3%"}}>
    Footer
    </div>
</div>
)
}