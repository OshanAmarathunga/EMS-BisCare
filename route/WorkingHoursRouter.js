import express from "express";
import {saveWorkingHours} from "../controller/WorkingHoursController.js";

const router = express.Router();

router.post('/save-in',saveWorkingHours);

export default router;