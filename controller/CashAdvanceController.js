import CashAdvanceSchema from "../model/CashAdvance.js";

export async function saveCashAdvance(req, res) {
    try {
        const cashAdvance=new CashAdvanceSchema(req.body);
        const savedCashAdvance = await cashAdvance.save();
        res.status(200).json({
            message: 'CashAdvance saved successfully.',
            data: savedCashAdvance
        });
    }catch (error){
        res.status(500).json({
            saveError: error
        });
    }
}