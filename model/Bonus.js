import mongoose from "mongoose";

const BonusSchema = new mongoose.Schema({
    empNo:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    status:{
        type:Boolean,
        default:true
    }
})

export default mongoose.model("Bonus",BonusSchema);