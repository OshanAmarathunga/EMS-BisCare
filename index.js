import express from 'express'
import dotenv from 'dotenv'
import bodyparser from 'body-parser'
import {DBConnection} from "./database/db.js";
import EmployeeRoute from "./route/EmployeeRoute.js";

dotenv.config();
const app=express();
app.use(bodyparser.json());
const port=process.env.PORT;
DBConnection();

//==========================================
app.use('/v1/employee',EmployeeRoute);


//==========================================

app.listen(port,()=>{
    console.log("================================================================================");
    console.log(`App is running on port ${port}`);
})