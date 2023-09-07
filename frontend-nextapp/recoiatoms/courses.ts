import { atom } from "recoil";
import { CourseType } from "../schemas/types/courseTypes";
export const coursesatom=atom<CourseType[]>({
    key:"coursesatom"
})