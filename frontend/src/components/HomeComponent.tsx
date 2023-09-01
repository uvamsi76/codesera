import { Grid } from "@mui/material";
import Part1 from "./home_components/Part1";
import Part2 from "./home_components/Part2";
import Part3 from "./home_components/Part3";
import Carousel from "./carousel";

export default function HomeComponent(){
    const center ={display:"flex", justifyContent:"center"}
    const verticalcenter={display:"flex",justifyContent:"center",flexDirection:"column",flexWrap: "wrap",marginLeft:"40%"}
    return(
        <div>
            <Grid container spacing={2} style={center}>
                <Grid item lg={6} md={4} xs={4}>
                    <div className='Home 1st part' style={center}>
                        <Part1/>
                    </div>
                    <div className='Home 2nd part' style={center}>
                        <Part2/>
                    </div>
                    <div className='Courses part with carousel' style={center}>
                        <Part3/>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}