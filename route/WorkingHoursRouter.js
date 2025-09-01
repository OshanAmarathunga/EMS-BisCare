import express from "express";
import {saveOurWorkingHours, saveWorkingHours} from "../controller/WorkingHoursController.js";

const router = express.Router();

router.post('/save-in',saveWorkingHours);
router.post('/save-out:id',saveOurWorkingHours);

export default router;