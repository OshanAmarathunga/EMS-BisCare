import express from "express";
import {saveCashAdvance} from "../controller/CashAdvanceController.js";

const router=express.Router();

router.post('/save-cash-advance',saveCashAdvance);

export default router;