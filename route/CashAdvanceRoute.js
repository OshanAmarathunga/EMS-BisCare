import express from "express";
import {changeStatus, getEmployeeCashAdvance, saveCashAdvance} from "../controller/CashAdvanceController.js";

const router=express.Router();

router.post('/save-cash-advance',saveCashAdvance);
router.get('/get-all-cash-advance/:id',getEmployeeCashAdvance);
router.put('/change-status/:id',changeStatus);

export default router;