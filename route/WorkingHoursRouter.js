import express from "express";
import {getEmployeeWorkingHours, saveOurWorkingHours, saveWorkingHours} from "../controller/WorkingHoursController.js";

const router = express.Router();

router.post('/save-in',saveWorkingHours);
router.post('/save-out:id',saveOurWorkingHours);
router.get('/get-employee-working-hours/:id',getEmployeeWorkingHours);

export default router;