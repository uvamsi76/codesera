import { atom } from "recoil";
import { CourseType } from "../schemas/types/courseTypes";
import { purchasedCoursesType } from "@/schemas/types/purchasedCourseTypes";
export const purchasedcoursesatom=atom<purchasedCoursesType>({
    key:"purchasedcoursesatom"
})