import mongoose from "mongoose";

const CashAdvanceSchema = new mongoose.Schema({
    empNoPrimaryKey:{
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
        default: true
    }
});

export default mongoose.model("CashAdvance",CashAdvanceSchema);