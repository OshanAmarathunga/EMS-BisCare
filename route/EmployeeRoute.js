import express from "express";
import {saveEmployee} from "../controller/EmployeeController.js";
const router=express.Router();

router.post('/saveEmployee',saveEmployee);

export default router;