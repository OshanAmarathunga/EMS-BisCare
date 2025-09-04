import express from "express";
import {
    addWorkingHours,
    getEmployeeWorkingHours,
    saveOurWorkingHours,
    saveWorkingHours,
    updateValidity
} from "../controller/WorkingHoursController.js";

const router = express.Router();

router.post('/save-in',saveWorkingHours);
router.post('/save-out:id',saveOurWorkingHours);
router.get('/get-employee-working-hours/:id',getEmployeeWorkingHours);
router.post('/make-validity/:id',updateValidity);
router.post('/add-working-times',addWorkingHours);

export default router;