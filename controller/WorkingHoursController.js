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

export async function updateValidity(req, res) {
    try {
        // First get the current document
        const record = await WorkingHoursSchema.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        // Toggle the value
        const updated = await WorkingHoursSchema.findByIdAndUpdate(
            req.params.id,
            { isActive: !record.isActive },
            { new: true } // return updated doc
        );

        return res.status(200).json({
            message: `isActive updated to ${updated.isActive}`,
            updated
        });

    }catch (e){
        return res.status(500).json({ message: e.message });
    }
}

export  async function addWorkingHours(req, res) {
    try {
        const { startDate, endDate, empPrimaryKey } = req.body;

        const employee = await EmployeeSchema.findById(empPrimaryKey, "empNo");
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const workingHours = new WorkingHoursSchema({
            empPrimaryKey,
            empNo: employee.empNo,
            startDateTime: new Date(startDate).getTime(), // convert ISO → milliseconds
            endDateTime: new Date(endDate).getTime(),     // convert ISO → milliseconds
            status: "OUT"
        });

        const saved = await workingHours.save();
        res.status(200).json(saved);
    } catch (e) {
        console.log(e.message);
        res.status(500).json(e.message);
    }
}