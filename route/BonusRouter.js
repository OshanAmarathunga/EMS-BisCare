import express from "express";
import {saveBonus} from "../controller/BonusController.js";

const router=express.Router();

router.post('/save-bonus',saveBonus);

export default router;