import EmployeeSchema from "../model/EmployeeSchema.js";

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

