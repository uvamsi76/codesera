import { CourseType, CoursesType } from "../../schemas/types/courseTypes";
import { ec2 } from "@/util/env";
import { Typography } from "@mui/material";

export default function Part3({courses}:CoursesType){
    return(
        <div>
           {courses.map((course:CourseType)=>(
                <div key={Math.random()} style={{display:"flex",justifyContent:"center",margin:20}}>
                    <Typography >{course.title}</Typography>
                </div>
            ))}
        </div>
    )
}