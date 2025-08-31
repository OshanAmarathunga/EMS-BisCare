import express from "express";
import {getAllCategories, saveSalaryCategory, updateCategoryById} from "../controller/SalaryCategoryController.js";
const router=express.Router();

router.post('/save-salary-category',saveSalaryCategory);
router.get('/get-all-categories', getAllCategories);
router.put('/update-salary-category/:id',updateCategoryById);
export default router;