import CashAdvanceSchema from "../model/CashAdvance.js";

export async function saveCashAdvance(req, res) {
    try {
        const cashAdvance=new CashAdvanceSchema({
            empNoPrimaryKey:req.body.empNoPrimaryKey,
            amount:req.body.amount
        });
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

export async function getEmployeeCashAdvance(req, res) {
    try {
        let cashAdvanceList =await CashAdvanceSchema.find({
            empNoPrimaryKey:req.params.id
        }).sort({date:-1});
        res.status(200).json({
            cashAdvanceList
        });
    }catch (error){
        res.status(500).json({
            saveError: error
        });
    }
}

export async function changeStatus(req,res){
    try{
        const cashAdvance=await CashAdvanceSchema.findById(req.params.id);

        await CashAdvanceSchema.findByIdAndUpdate(
            req.params.id,
            {status:!cashAdvance.status},
            {new:true}
        );
        return res.status(200).json("updated");

    }catch(e){
        return res.status(500).json({ message: e.message });
    }
}