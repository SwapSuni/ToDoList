import { app } from "./app.js";
import { connectDB } from './data/database.js';
import dotenv from 'dotenv';

connectDB();

// console.log(process.env.PORT);

dotenv.config({
    path:'./data/config.env',
})

app.listen(5000,()=>{
    console.log(`server is working....on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})