import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const url=process.env.MONGO_URL;

export async function DBConnection(){
    try{
        const resp=await mongoose.connect(url);
        console.log("DB Connected successfully !");
        console.log("================================================================================");
    }catch(e){
        console.log("DB Error : ",e);
        console.log("================================================================================");
        
    }
}