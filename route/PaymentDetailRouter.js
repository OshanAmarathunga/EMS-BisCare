import express from "express";
import {employeePayment, getPaymentSummary} from "../controller/PaymentDetailController.js";



const router = express.Router();

router.get('/get-summary',getPaymentSummary);
router.post('/employee-payment',employeePayment);


export default router;