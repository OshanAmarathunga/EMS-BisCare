import express from "express";
import {saveSalaryCategory} from "../controller/SalaryCategoryController.js";
const router=express.Router();

router.post('/save-salary-category',saveSalaryCategory);

export default router;