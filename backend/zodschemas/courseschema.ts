import { z } from "zod"
import {urlSchema,categoryEnum,idsschema, titleSchema, descriptionSchema, courseContentSchema, wholeNumberSchema} from "./common"
export const courseSchema = z.object({
    title: titleSchema, //{type:String},  //"Deep Learning A-Z™ 2023: Neural Networks, AI & ChatGPT Bonus",
    description: descriptionSchema,//{type:String},  //"Learn to create Deep Learning Algorithms in Python from two Machine Learning & Data Science experts. Templates included.",
    price: wholeNumberSchema.refine(val=>val>=0 && val<=100000,{message:"price shld be below 100000"}), //{type:Number},//5000,
    thumbnail:urlSchema,//{type:String},//"link",
    category:z.enum([categoryEnum.AndroidDevelopment,categoryEnum.ArtificialIntelligence,categoryEnum.DataScience,
        categoryEnum.DevOps,categoryEnum.WebDevelopment]),//"Artificial Intelligence",
    rating:wholeNumberSchema.refine((val)=> val>=0&&val<=5 ,{message:"rating should be between 0-5"}),//{type:Number},//4.5,
    authors:z.array(idsschema),//[{type:mongoose.Schema.Types.ObjectId ,ref:"Admin"}],//"_aid"
    students_enrolled:z.array(idsschema),//[{type:mongoose.Schema.Types.ObjectId ,ref:"user"}],//"_uid"
    no_of_students:z.number(),//{type:Number},//20,
    outcomes:z.array(z.string()),//[{type:String}],//"you will be able to..."
    prerequisites:z.array(z.string()),//[{type:String}],
    courseContent:courseContentSchema,
    ispublished:z.boolean()
})