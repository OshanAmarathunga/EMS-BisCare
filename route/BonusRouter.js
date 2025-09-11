import express from "express";
import {changeStatus, getBonus, saveBonus} from "../controller/BonusController.js";

const router=express.Router();

router.post('/save-bonus',saveBonus);
router.get('/get-bonus/:id',getBonus);
router.put('/change-status/:id',changeStatus);

export default router;