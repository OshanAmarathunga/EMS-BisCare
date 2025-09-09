import express from "express";
import {getBonus, saveBonus} from "../controller/BonusController.js";

const router=express.Router();

router.post('/save-bonus',saveBonus);
router.get('/get-bonus/:id',getBonus);

export default router;