import { Grid } from "@mui/material";
import MyCollections from "./Dashboard_Components/MyCollections";
import PurchasedCourses from "./Dashboard_Components/PurchasesCourses";
import Roadmap from "./Dashboard_Components/Roadmaps";
import { purchasedCoursesType } from "@/schemas/types/purchasedCourseTypes";

export default function DashboardComponent({courses}:purchasedCoursesType){
    return (
        <Grid container>
            <Grid item lg={6}>
                <Roadmap/>
            </Grid>
            <Grid item lg={6}>
                <MyCollections/>
            </Grid>
            <Grid item lg={12}>
                <PurchasedCourses courses={courses}/>
            </Grid>
        </Grid>
    )
}