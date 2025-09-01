import workingHours from "../model/WorkingHours.js";
import WorkingHoursSchema from "../model/WorkingHours.js";

export async function saveWorkingHours(req, res) {
    try{

        const workingHours=new WorkingHoursSchema({
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