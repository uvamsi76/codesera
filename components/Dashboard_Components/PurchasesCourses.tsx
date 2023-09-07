import { CourseType } from "@/schemas/types/courseTypes"
import { purchasedCoursesType, purchasedCourse } from "@/schemas/types/purchasedCourseTypes"
import { getCookie } from "@/util/cookies"
import { ec2 } from "@/util/env"
import { Typography } from "@mui/material"
import { useEffect, useState } from "react"

// export async function getServerSideProps() {
//     const res = await fetch(ec2+`/purchasedCourses`)
//     const crs = await res.json()
//     const courses:String[]=crs.courses
//     return { props: { courses } }
// }
export default function PurchasedCourses({courses}:purchasedCoursesType){
    const center ={display:"flex", justifyContent:"center",margin:"10%"}
    const token= getCookie("token")
    if(!token){
        return(
        <div>
            <Typography> uhohh error</Typography>
        </div>)
    }
    return (
        <div style={center}>
            {courses.map((course:purchasedCourse)=>(
                <div key={Math.random()} style={{display:"flex",justifyContent:"center",margin:20}}>
                    <Typography >{course.courseId}</Typography>
                </div>
            ))}
        </div>
    )
}