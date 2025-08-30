import SalaryCategorySchema from "../model/SalaryCategory.js";


export async function saveSalaryCategory(req, res){
    try {


        const salaryCategory = new SalaryCategorySchema(req.body);
        const savedSalaryCategory=await salaryCategory.save();
        res.status(200).json({
            message: 'Salary Category saved successfully',
            data: savedSalaryCategory
        });
    }catch (e){
        res.status(500).json({
            saveError:e.message
        })
    }
}