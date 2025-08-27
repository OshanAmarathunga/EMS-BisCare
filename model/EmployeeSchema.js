import mongoose from "mongoose";
const EmployeeSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    empNo:{
        type:String,
        required:true,
        unique:true
    },
    contactNo:{
        type:Number,
        unique:true
    },
    gender:{
        type:String
    },
    salaryCategoryId:{
        type:Number,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

export default mongoose.model('Employee',EmployeeSchema);