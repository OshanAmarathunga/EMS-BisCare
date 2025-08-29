import mongoose from "mongoose";

const WorkingHoursSchema = mongoose.Schema({
    empNo:{
        type:String,
        required:true
    },
    startDateTime:{
        type:Date,
        required:true,
        default:Date.now
    },
    endDateTime:{
        type:Date,
    },
    status:{
        type:String,
        required:true
    }
});

export default mongoose.model('WorkingHours',WorkingHoursSchema);