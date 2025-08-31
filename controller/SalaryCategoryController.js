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

export async function getAllCategories(req, res){
    try {
        const categoryList=await SalaryCategorySchema.find();
        res.status(200).json({
            categoryList:categoryList
        })
    }catch (e){
        res.status(500).json(e.message);
    }
}

export async function updateCategoryById(req, res){
    try {
        const updateCategory=await SalaryCategorySchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (updateCategory) {
            return res.status(200).json(updateCategory);
        }
        return res.status(404).json("Customer not found");
    }catch (e){
        res.status(500).json(e.message);
    }
}