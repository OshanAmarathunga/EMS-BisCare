import express from "express";
import {
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

export default router;