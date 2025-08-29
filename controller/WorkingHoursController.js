import workingHours from "../model/WorkingHours.js";
import WorkingHoursSchema from "../model/WorkingHours.js";

export async function saveWorkingHours(req, res) {
    try{
        const workingHours=new WorkingHoursSchema(req.body);
        const  savedWorkingHours=await workingHours.save();
        res.status(200).json(savedWorkingHours);
    }catch (e){
        res.status(500).json(e.message);
    }
}