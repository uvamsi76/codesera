
import { Inter } from 'next/font/google'
import { Grid } from '@mui/material'
import HomeComponent from '@/components/HomeComponent'
import {CourseType, CoursesType} from "../schemas/types/courseTypes"
import { ec2 } from '@/util/env'
import { coursesatom } from '../recoiatoms/courses'
import {useRecoilState} from "recoil"
import { useEffect } from 'react'
import { GetStaticProps } from 'next';
import { getCookie } from '@/util/cookies'

type staticpropsreturntype={
  props:CourseType[]
}
 
const inter = Inter({ subsets: ['latin'] })

// export const getStaticProps= async () => {
//   const res = await fetch(ec2+`/courses`)
//   const crs = await res.json()
//   const courses:CourseType[]=crs.courses
//   return { props: { courses } }
// }

export default async function  Home() {
  // const [courses,setCourses]=useRecoilState(coursesatom)
  // useEffect(()=>{
  //   fetch(ec2+`/courses`, {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  // })
  // .then((res)=>{res.json()
  //     .then((data)=>{
  //         setCourses(data.purchasedCourses)
  //         console.log(data.purchasedCourses)
  //     })
  // })})
  const res = await fetch(ec2+`/courses`)
  const crs = await res.json()
  const courses:CourseType[]=crs.courses
  return (
      <div>
          <HomeComponent courses={courses}/>
      </div>
  )
}

// {courses}:CoursesType