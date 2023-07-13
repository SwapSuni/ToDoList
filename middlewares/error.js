class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode= statusCode;
    }
}

export const errorHandlingMidlleware= (err, req, res, next)=>{
    // handling error
    // console.log(err.message);

    err.message= err.message || "Internal Server Error";
    err.statusCode= err.statusCode || 500;

    return res.status(err.statusCode).json({
        success:false,
        // message:"Task not found or invalid id"
        message:err.message
    })
}

export default ErrorHandler;