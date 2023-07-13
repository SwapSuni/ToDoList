import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask= async(req, res, next)=>{

    try {
        const {title, description}= req.body;

        // Works same as Create method 
        // const task= new Task({title});
        // await task.save();
    
        await Task.create({
            title,
            description,
            user: req.user,
        })
    
        res.status(201).json({
            success: true,
            message:"Task Added",
        })
    } catch (error) {
        next(error);
    }
}

export const getMyTask=async(req, res, next)=>{
    try {
        const userid= req.user._id;

        const tasks= await Task.find({user: userid});
        // find method return  array 

        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error);
    }

}

export const updateTask=async(req, res, next)=>{

    try {
        const {id}= req.params;

        const task= await Task.findById(id);

        if(!task){
            // return next(new Error("Invalid id h re"));
            return next(ErrorHandler("Invalid id h re",404));
        }

        task.isCompleted= !task.isCompleted;

        // here promise is returned 
        await task.save();

       res.status(200).json({
           success: true,
           message:"Task Updated",
       })
    } catch (error) {
        next(error);
    }

}
export const deleteTask=async(req, res, next)=>{

    try {
        const {id}= req.params;

        const task= await Task.findById(id);

        if(!task){
            // return next(new Error("Invalid id h re"))
            return next(ErrorHandler("Invalid id h re",404));
        }

        // here promise is returned 
        await task.deleteOne();

        res.status(200).json({
            success: true,
            message:"task deleted",
        })
    } catch (error) {
        next(error);
    }

}