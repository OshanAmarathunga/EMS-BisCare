import express from "express";
import {
    getAllEmployees,
    getAllEmployeesWithLastWorkingData,
    saveEmployee,
    updateEmployee
} from "../controller/EmployeeController.js";
const router=express.Router();

router.post('/saveEmployee',saveEmployee);
router.get('/get-all-employee',getAllEmployees);
router.put('/update-employee/:id',updateEmployee)
router.get('/get-all-employee-with-last-working-data',getAllEmployeesWithLastWorkingData);

export default router;