import express from "express";
import { User } from "../models/user.js";
import { getAllusers, getUserbyId, register, login, getMyProfile, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router= express.Router();

router.get("/all",getAllusers)

router.post("/new",register)

router.post("/login",login)

router.get("/logout",logout)

router.get("/userid",async(req,res)=>{
    // const {id}=req.body;
    const {id}=req.query;
    const user= await User.findById(id);

    res.json({
        "success":true,
        user,
    })
})

// Dynamic routing 
router.get("/userid/:id", getUserbyId)

router.get("/me", isAuthenticated, getMyProfile);

export default router;