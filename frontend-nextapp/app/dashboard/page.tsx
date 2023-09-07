"use Client"
import DashboardComponent from "@/components/DashboardComponent";
import { purchasedcoursesatom } from "@/recoiatoms/purchasedcourses";
import { CourseType } from "@/schemas/types/courseTypes"
import { purchasedCoursesType, purchasedCourse } from "@/schemas/types/purchasedCourseTypes"
import { getCookie } from "@/util/cookies"
import { ec2 } from "@/util/env"
import cookies from 'js-cookie';
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

// export const getStaticProps= async ({ req, res }: NextPageContext) => {
//     const token= getCookie("token")
//     if(!req){
//         return
//     }
//     // if(req.cookies){
//     //     return
//     // }
//     // const token= req.cookies
//     console.log(token)
//     if(!token){
//         return ("error")
//     }
//     const response = await fetch(ec2+'/purchasedCourses', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' , "Authorization":token},
//     })
//     const crs = await response.json()
//     console.log(crs)
//     // const courses:purchasedCourses[]=crs.purchasedCourses
//     console.log(crs)
//     return { props: { courses:crs } }
//   }

export default function Dashboard(){
    const token= getCookie("token")
    console.log(token)
    const [courses,setCourses]=useRecoilState(purchasedcoursesatom)
    if(!token) return
    useEffect(()=>{
    fetch(ec2+'/purchasedCourses', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' , "Authorization":token},
    })
    .then((res)=>{res.json()
        .then((data)=>{
            console.log(data)
            setCourses(data.purchasedCourses)
            
        })
    })
},[])
    return (
    <div>
        dashboard
        {/* <DashboardComponent courses={courses}/> */}
    </div>)
}

// {courses}:purchasedCourseTypes