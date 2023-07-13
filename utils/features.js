import jwt from 'jsonwebtoken';

export const sendCookie=(user, res, message, statusCode=200)=>{
    const token = jwt.sign({ _id: user._id },"swap");

    // console.log(process.env.NODE_ENV);
    // console.log(process.env.NODE_ENV==="Development");

    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
        sameSite:process.env.NODE_ENV==="Development"?"lax": "none",
        secure:process.env.NODE_ENV==="Development"?false: true,
    }).json({
        success: true,
        message,
    })
}