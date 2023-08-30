import mongoose from "mongoose";


enum countryEnum {
  India="India",
  America="America",
  China="China",
  Pakistan="Pakistan"
}

enum categoryEnum{
  ArtificialIntelligence="ArtificialIntelligence",
  WebDevelopment = "WebDevelopment",
  AndroidDevelopment = "AndroidDevelopment",
  DevOps="DevOps",
  DataScience="DataScience"
}
// Define mongoose schemas
const userSchema = new mongoose.Schema({
    // username: {type: String},
    // password: String,
    // purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    // isAdmin:{type:Boolean,default:false},

    firstname:{type:String},
    lastname:{type:String},//"Uppuluri",
    username:{type:String},//"uvamsi76",
    email:{type:String},//"uvamsi76@gmail.com",
    phoneno:{type:String},//"6300854181",
    password:{type:String},//"Uvamsi76@",
    country:{
      type:String,
      enum:Object.values(countryEnum)},//"India",
    DOB:{type:Date},//"20/1/2001",
    purchasedCourses:[{
      courseId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' },//"_cid",
      active: {type:Boolean},//false,
      isCompleted:{type:Boolean}}],//false
    admin:{
      isAdmin:{type:Boolean},//true,
      adminId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },//"_aid"
    },
    profilePic:{type:String},//"link"
});
  
const adminSchema = new mongoose.Schema({
    // username: String,
    // password: String,
    // publishedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  userId:{type:mongoose.Schema.Types.ObjectId ,ref:"User"},
  username:{type:String},
  publishedCourses:[{ 
    courseId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' },//"_cid",//false,
    isCompleted:{type:Boolean} }],//["_cid"],
  students:[{
    courseId:{type: mongoose.Schema.Types.ObjectId, ref: 'Course'},//"cid",
    userIds:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],//["_uid"]
    no_of_active_students:{type:Number}//10            
    }],
  couponCodes:[{type:String}],//"coupons"
  scheduledClasses:[{type:Date}],//"dates"
  performance:[{
    courseId:{type: mongoose.Schema.Types.ObjectId, ref:"Course"},//"_cid",
    sales:{type:Number}//50000
    }]
});
  
const courseSchema = new mongoose.Schema({
    title:{type:String},  //"Deep Learning A-Z™ 2023: Neural Networks, AI & ChatGPT Bonus",
    description:{type:String},  //"Learn to create Deep Learning Algorithms in Python from two Machine Learning & Data Science experts. Templates included.",
    price:{type:Number},//5000,
    thumbnail:{type:String},//"link",
    category:{
      type:String,
      enum:Object.values(categoryEnum)
    },//"Artificial Intelligence",
    rating:{type:Number},//4.5,
    authors:[{type:mongoose.Schema.Types.ObjectId ,ref:"Admin"}],//"_aid"
    students_enrolled:[{type:mongoose.Schema.Types.ObjectId ,ref:"user"}],//"_uid"
    no_of_students:{type:Number},//20,
    outcomes:[{type:String}],//"you will be able to..."
    prerequisites:[{type:String}],
    courseContent:{
      no_of_sections:{type:Number},//1,
      sections:[{
        sectionTitle:{type:String},//"Introduction",
        sectionDuration:{type:String},//"2h:45m",
        noofsubtopics:{type:Number},//2,
        subtopics:[
          {
            subTopicTitle:{type:String},//"Welcome to course",
            subTopicDescription:{type:String},//"welcoming to course",
            subTopicDuration:{type:String},//"0h:10m",
            subTopicResourse:{type:String}//"Link"
          }
        ]
      }]
    }
  });
  
  // Define mongoose models
  export const User = mongoose.model('User', userSchema);
  export const Admin = mongoose.model('Admin', adminSchema);
  export const Course = mongoose.model('Course', courseSchema);