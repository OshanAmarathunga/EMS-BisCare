import express from "express";
import {getAllEmployees, saveEmployee, updateEmployee} from "../controller/EmployeeController.js";
const router=express.Router();

router.post('/saveEmployee',saveEmployee);
router.get('/get-all-employee',getAllEmployees);
router.put('/update-employee/:id',updateEmployee)

export default router;