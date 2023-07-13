import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user.js';
import Taskrouter from './routes/task.js';
// import { connectDB } from './data/database.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorHandlingMidlleware } from './middlewares/error.js';
import cors from 'cors';

// const app= express();
export const app= express();

// dotenv.config({
//     path:'/data/config.env'
// })

// const router= express.Router();

// using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials: true,
})
)

//using routes
app.use("/api/v1/users",router);
app.use("/api/v1/task",Taskrouter);

app.get("/",(req,res)=>{
    res.send("Here we are again");
})

// connectDB();
// mongoose.connect("mongodb://localhost:27017",{
//     dbName:"backendapi",
// }).then(()=>{
//     console.log("Database Connected");
// }).catch((e)=>{
//     console.log(e);
// });

// const schema= new mongoose.Schema({
//     name:String,
//     email:String,
//     password:String,
// });

// const User= mongoose.model("User",schema);

// app.get("/users/all",async(req,res)=>{

//     const users= await User.find({});

//     console.log(req.query);

//     res.json({
//         success:true,
//         users,
//     });
// })

// app.get("/userid",async(req,res)=>{
//     // const {id}=req.body;
//     const {id}=req.query;
//     const user= await User.findById(id);

//     res.json({
//         "success":true,
//         user,
//     })
// })

// app.post("/users/new",async(req,res)=>{

//     const {name,email,password}= req.body;


//     await User.create({
//         name,
//         email,
//         password,
//     });

//     res.status(201).cookie("var","lol").json({
//         success:true,
//         message:"Registered Successfully",
//     });
// })

// app.listen(5000,()=>{
//     console.log("Server is working..");
// })

// middleware for error

app.use(errorHandlingMidlleware);