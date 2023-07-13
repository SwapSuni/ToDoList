import express from "express";
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router= express.Router();

router.post("/new",isAuthenticated,newTask);

router.get("/my",isAuthenticated,getMyTask);

// Uisng dynamic url 
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

export default router;