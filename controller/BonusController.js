import BonusSchema from "../model/Bonus.js";

export async function saveBonus(req, res) {
    try{
        const bonus=new BonusSchema(req.body);
        const savedBonus = await bonus.save();
        res.status(200).json(savedBonus);
    }catch (e){
        res.status(500).json(e.message);
    }
}