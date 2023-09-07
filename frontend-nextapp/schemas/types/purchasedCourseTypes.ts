export type purchasedCourse={
    courseId:String,//"_cid",
    active: Boolean,//false,
    isCompleted:Boolean,
    status:Number,
    _id : String
  }
  export type purchasedCoursesType={courses:purchasedCourse[]}