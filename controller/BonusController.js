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

export async function getBonus(req, res) {
    try{
        let bonusList = await BonusSchema.find({
            empPrimaryKey:req.params.id
        }).sort({date:-1});

        res.status(200).json(bonusList);
    }catch (e){
        res.status(500).json(e.message);
    }
}