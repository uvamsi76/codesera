import { z } from "zod"
import {idsschema, publishedCourseSchema, performanceschema, studentschema} from "./common"

export const adminSchema = z.object({
  userId:idsschema,
  username:z.string().max(15,{message:"username max limit is 15"}).min(5,{message:"username min limit is 5"}),
  email:z.string().email({message:"enter valid email address"}),
  publishedCourses:z.array(publishedCourseSchema).nullable(),//[{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],//["_cid"],
  students:z.array(studentschema).nullable(),
  couponCodes:z.array(z.string().refine((val)=>val.length==16)).nullable(),//[{type:String}],//"coupons"
  scheduledClasses:z.array(z.date()).nullable(),//[{type:Date}],//"dates"
  performance:z.array(performanceschema).nullable()
});