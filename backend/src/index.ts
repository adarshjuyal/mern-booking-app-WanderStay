import express,{Request ,Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
import userRoutes from './routes/users'
app.use("/api/users",userRoutes)
app.listen(7001,()=>{
    console.log("server running on localhost:7001");
});