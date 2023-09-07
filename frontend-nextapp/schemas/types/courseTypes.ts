enum categoryEnum{
    ArtificialIntelligence="ArtificialIntelligence",
    WebDevelopment = "WebDevelopment",
    AndroidDevelopment = "AndroidDevelopment",
    DevOps="DevOps",
    DataScience="DataScience"
  }

type subtopic_type={
    subTopicTitle:String,//"Welcome to course",
    subTopicDescription:String,//"welcoming to course",
    subTopicDuration:String,//"0h:10m",
    subTopicResourse:String//"Link"
  }
type section_Type={
    sectionTitle:String,//"Introduction",
    sectionDuration:String,//"2h:45m",
    noofsubtopics:Number,//2,
    subtopics:subtopic_type[]
  }

export type CourseType={
    _id:String,
    title:String,  //"Deep Learning A-Z™ 2023: Neural Networks, AI & ChatGPT Bonus",
    description:String,  //"Learn to create Deep Learning Algorithms in Python from two Machine Learning & Data Science experts. Templates included.",
    price:Number,//5000,
    thumbnail:String,//"link",
    category:categoryEnum,
    rating:Number,//4.5,
    authors:String[],//"_aid"
    no_of_students:Number,//20,
    outcomes:String[],//"you will be able to..."
    prerequisites:String[],
    ispublished:Boolean,
    courseContent:{
        no_of_sections:Number,//1,
        sections:section_Type[]
      }
};

export type CoursesType={courses:CourseType[]}



// title:{type:String},  //"Deep Learning A-Z™ 2023: Neural Networks, AI & ChatGPT Bonus",
// description:{type:String},  //"Learn to create Deep Learning Algorithms in Python from two Machine Learning & Data Science experts. Templates included.",
// price:{type:Number},//5000,
// thumbnail:{type:String},//"link",
// category:{
//   type:String,
//   enum:Object.values(categoryEnum)
// },//"Artificial Intelligence",
// rating:{type:Number},//4.5,
// authors:[{type:mongoose.Schema.Types.ObjectId ,ref:"Admin"}],//"_aid"
// students_enrolled:[{type:mongoose.Schema.Types.ObjectId ,ref:"user"}],//"_uid"
// no_of_students:{type:Number},//20,
// outcomes:[{type:String}],//"you will be able to..."
// prerequisites:[{type:String}],
// ispublished:{type:Boolean},
// courseContent:{
//   no_of_sections:{type:Number},//1,
//   sections:[{
//     sectionTitle:{type:String},//"Introduction",
//     sectionDuration:{type:String},//"2h:45m",
//     noofsubtopics:{type:Number},//2,
//     subtopics:[
//       {
//         subTopicTitle:{type:String},//"Welcome to course",
//         subTopicDescription:{type:String},//"welcoming to course",
//         subTopicDuration:{type:String},//"0h:10m",
//         subTopicResourse:{type:String}//"Link"
//       }
//     ]
//   }]
// }