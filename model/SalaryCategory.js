import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const SalaryCategorySchema = new mongoose.Schema({
    categoryId:{
        type:Number,
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

const  AutoIncrement = AutoIncrementFactory(mongoose);
SalaryCategorySchema.plugin(AutoIncrement,{inc_field:"categoryId"});

export default mongoose.model('SalaryCategory',SalaryCategorySchema);