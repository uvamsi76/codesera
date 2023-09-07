
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
  enum categoryEnum{
    ArtificialIntelligence="ArtificialIntelligence",
    WebDevelopment = "WebDevelopment",
    AndroidDevelopment = "AndroidDevelopment",
    DevOps="DevOps",
    DataScience="DataScience"
  }
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
  // const res = await fetch(ec2+`/courses`)
  // const crs = await res.json()
  // const courses:CourseType[]=crs.courses
  const courses:CourseType[]=[{
    _id:"609c080b0f50b509b4e19016",
    title: "Deep Learning A-Z™ 2023: Neural Networks, AI & ChatGPT Bonus",
    description: "Learn to create Deep Learning Algorithms in Python from two Machine Learning & Data Science experts. Templates included.",
    price: 5000,
    thumbnail: "https://static-cse.canva.com/blob/1130149/1600w-wK95f3XNRaM.jpg",
    category: categoryEnum.ArtificialIntelligence,
    authors: ["uchintu76@gmail.com"],
    outcomes: ["you will be able to..."],
    prerequisites: ["sould know programming"],
    ispublished: true,
    rating: 4.5,
    no_of_students: 20,
    courseContent: {
        no_of_sections: 1,
        sections: [{
            sectionTitle: "Introduction",
            sectionDuration: "2h:45m",
            noofsubtopics: 2,
            subtopics: [
                {
                    subTopicTitle: "Welcome to course",
                    subTopicDescription: "welcoming to course",
                    subTopicDuration: "0h:10m",
                    subTopicResourse: "https://youtu.be/AwQHqWyHRpU?si=xgS-esX48Xn2wR2s"
                },
                {
                    subTopicTitle: "How to use course",
                    subTopicDescription: "advice on course",
                    subTopicDuration: "0h:10m",
                    subTopicResourse: "https://youtu.be/AwQHqWyHRpU?si=xgS-esX48Xn2wR2s"
                }
            ]
        }]
    }
}]
  console.log("token here: "+getCookie('token'))
  return (
      <div>
          <HomeComponent courses={courses}/>
      </div>
  )
}

// {courses}:CoursesType