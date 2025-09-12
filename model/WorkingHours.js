import mongoose from "mongoose";

const WorkingHoursSchema = mongoose.Schema({
    empPrimaryKey:{
        type:String,
        required:true,
    },
    empNo:{
        type:String,
        required:true
    },
    startDateTime:{
        type:Date,
    },
    endDateTime:{
        type:Date,
    },
    status:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    slotEarningAmount:{
        type:Number
    }
});

export default mongoose.model('WorkingHours',WorkingHoursSchema);