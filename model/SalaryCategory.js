import mongoose from "mongoose";

const SalaryCategorySchema = new mongoose.Schema({
    categoryId:{
        type:Number,
        required:true,
        unique:true
    },
    categoryName:{
        type:String,
        required:true
    },
    perHourRate:{
        type:Number,
        required:true
    },
    note:{
        type:String,
    }
})

export default mongoose.model('SalaryCategory',SalaryCategorySchema);