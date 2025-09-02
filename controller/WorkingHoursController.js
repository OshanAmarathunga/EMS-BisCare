import workingHours from "../model/WorkingHours.js";
import WorkingHoursSchema from "../model/WorkingHours.js";
import EmployeeSchema from "../model/EmployeeSchema.js";

export async function saveWorkingHours(req, res) {
    try{

        const workingHours=new WorkingHoursSchema({
            empPrimaryKey:req.body.empPrimaryKey,
            empNo:req.body.empNo,
            startDateTime:Date.now(),
            status:"IN"
        });
        const  savedWorkingHours=await workingHours.save();
        res.status(200).json(savedWorkingHours);
    }catch (e){
        res.status(500).json(e.message);
    }
}

export async function saveOurWorkingHours(req, res) {
    try{

        const workingHours=await WorkingHoursSchema.findByIdAndUpdate(
            req.params.id,
            {
                endDateTime:Date.now(),
                status:"OUT"
            },
            { new: true }

        );
        if (workingHours){
            res.status(200).json(workingHours);
        }
        return res.status(200).json();
    }catch (e){
        res.status(500).json(e.message);
    }
}

export async function getEmployeeWorkingHours(req, res) {
    try{
        const workingHours = await WorkingHoursSchema.find({ empPrimaryKey: req.params.id }).sort({ startDateTime: -1 });

        const emp = await EmployeeSchema.findById(req.params.id, "firstName");

        const result = workingHours.map(w => ({
            ...w._doc,
            firstName: emp ? emp.firstName : null
        }));

        res.status(200).json(result);
    }catch (e){
        res.status(500).json({ message: e.message });
    }
}