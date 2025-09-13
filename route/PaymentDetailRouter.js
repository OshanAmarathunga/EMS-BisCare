import express from "express";
import {
    changePaymentStatus,
    employeePayment,
    getEmployeePayment,
    getPaymentSummary
} from "../controller/PaymentDetailController.js";



const router = express.Router();

router.get('/get-summary',getPaymentSummary);
router.post('/employee-payment',employeePayment);
router.get('/get-employee-payment/:id',getEmployeePayment);
router.put('/change-status/:id',changePaymentStatus);


export default router;