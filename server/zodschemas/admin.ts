import { z } from "zod"
enum countryEnum {
    India="India",
    America="America",
    China="China",
    Pakistan="Pakistan"
  } 

const purchasedCourseSchema = z.object({
    courseId: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val)),
    active: z.boolean(),
    isCompleted: z.boolean(),
  });

const uadminschema = z.object({
    isAdmin:z.boolean(),
    adminId:z.string()
})
export const userSchema = z.object({
    firstname:z.string().max(20).min(5),
    lastname:z.string().max(20).min(5),//"Uppuluri",
    username:z.string().max(15).min(5),//"uvamsi76",
    email:z.string().email(),//"uvamsi76@gmail.com",
    phoneno:z.string().refine((value) => /^\d{10}$/.test(value)),//"6300854181",
    password:z.string().min(8).max(20).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).(?=.*[!@#$%^&*]){8,}$/),//"Uvamsi76@",
    country:z.enum([countryEnum.America,countryEnum.China,countryEnum.India,countryEnum.Pakistan]),
    DOB:z.date(),//"20/1/2001",
    purchasedCourses:z.array(purchasedCourseSchema),//false
    admin:uadminschema,
    profilePic:z.string(),//"link"
});