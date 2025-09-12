import express from 'express'
import dotenv from 'dotenv'
import bodyparser from 'body-parser'
import {DBConnection} from "./database/db.js";
import EmployeeRoute from "./route/EmployeeRoute.js";
import SalaryCategoryRoute from "./route/SalaryCategoryRoute.js";
import CashAdvanceRoute from "./route/CashAdvanceRoute.js";
import BonusRouter from "./route/BonusRouter.js";
import WorkingHoursRouter from "./route/WorkingHoursRouter.js";
import cors from 'cors';
import PaymentDetailRouter from "./route/PaymentDetailRouter.js";

dotenv.config();
const app=express();
app.use(cors());
app.use(bodyparser.json());
const port=process.env.PORT;
DBConnection();

//==========================================
app.use('/v1/employee',EmployeeRoute);
app.use('/v1/salary-category',SalaryCategoryRoute)
app.use('/v1/cash-advance',CashAdvanceRoute)
app.use('/v1/bonus',BonusRouter)
app.use('/v1/working-hour',WorkingHoursRouter)
app.use('/v1/payment-detail',PaymentDetailRouter)
//==========================================

app.listen(port,()=>{
    console.log("================================================================================");
    console.log(`App is running on port ${port}`);
})