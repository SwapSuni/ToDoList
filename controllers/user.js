import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { sendCookie } from "../utils/features.js";
import cookieParser from "cookie-parser";
import ErrorHandler from "../middlewares/error.js";
import env from 'dotenv'; 

export const getAllusers = async (req, res) => {

}

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) return next(ErrorHandler("User already exist", 400));

        // if (user) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "User already exist",
        //     })
        // }

        const hasedpassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hasedpassword });

        // const token = jwt.sign({ _id: user._id },"swap");

        // res.status(201).cookie("token", token, {
        //     httpOnly: true,
        //     maxAge: 1000 * 60 * 15,
        // }).json({
        //     success: true,
        //     message: "Registered Successsfully",
        // })

        sendCookie(user, res, "Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(ErrorHandler("Invalid email or password", 400));
        }

        // if (!user) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Invalid email or password",
        //     })
        // }

        const isMatch = await bcrypt.compare(password, user.password);

        // if (!isMatch) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Invalid email or password",
        //     })
        // }

        if (!isMatch) {
            return next(ErrorHandler("Invalid email or password", 400));
        }

        sendCookie(user, res, `welcome back ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
}

export const getUserbyId = async (req, res) => {

}

export const getMyProfile = (req, res) => {

    // const {token}= req.cookies;
    // // console.log(token);

    // if(!token){
    //     res.status(404).json({
    //         success:false,
    //         message:"Login First",
    //     })
    // }

    // const decoded= jwt.verify(token, "swap");


    // const user= await User.findById(decoded._id);

    res.status(200).json({
        success: true,
        user: req.user,
    })
}

export const logout = (req, res) => {
    res.status(200).cookie("token", "",
    { expires: new Date(Date.now()),
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
        sameSite:process.env.NODE_ENV==="Development"?"lax": "none",
        secure:process.env.NODE_ENV==="Development"?false: true,
    
    }).json({
        success: true,
        user: req.user,
    })
}