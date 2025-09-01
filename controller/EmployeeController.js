import EmployeeSchema from "../model/EmployeeSchema.js";
import SalaryCategorySchema from "../model/SalaryCategory.js";

export async function saveEmployee(req,res){
    try{
        const employee=new EmployeeSchema(req.body);
        const savedEmployee = await employee.save();
        res.status(200).json({
            message: 'Employee saved successfully.',
            data: savedEmployee
        });
    }catch (e){
        res.status(500).json({
            saveError:e.message
        });
    }
}

export async function getAllEmployees(req, res){
    try {
        const employeeList=await EmployeeSchema.aggregate([
            {
                $lookup: {
                    from:"salarycategories",
                    localField: "salaryCategoryId",
                    foreignField: "categoryId",
                    as: "salaryCategory"
                }
            },
            {
                $unwind: '$salaryCategoryId'
            }
        ]);
        res.status(200).json({
            employeeList:employeeList
        })
    }catch (e){
        res.status(500).json(e.message);
    }
}

export async function updateEmployee(req,res){
    try {
        const updateEmployee=await EmployeeSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (updateEmployee){
            res.status(200).json(updateEmployee);
        }
        return res.status(200).json()
    }catch (e){

        res.status(500).json({
            message:e.message
        });
    }
}

export async function getAllEmployeesWithLastWorkingData(req, res) {
    try {
        const employees = await EmployeeSchema.aggregate([
            {
                $match: { isActive: true }
            },
            {
                $lookup: {
                    from: "workinghours",
                    let: { emp_no: "$empNo" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$empNo", "$$emp_no"] } } },
                        { $sort: { startDateTime: -1 } },
                        { $limit: 1 }
                    ],
                    as: "lastWorkingHour"
                }
            },
            {
                $unwind: {
                    path: "$lastWorkingHour",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    lastWorkingHour: { $ifNull: ["$lastWorkingHour", {}] }
                }
            }
        ]);
        res.status(200).json({
            employeeList:employees
        })
    }catch (e){
        res.status(500).json({
            message:e.message
        });
    }
}

