import EmployeeSchema from "../model/EmployeeSchema.js";
import CashAdvanceSchema from "../model/CashAdvance.js";
import BonusSchema from "../model/Bonus.js";
import PaymentDetailSchema from "../model/PaymentDetails.js";
import WorkingHoursSchema from "../model/WorkingHours.js";

export async function getPaymentSummary(req, res) {
    try{
        const employeeList=await EmployeeSchema.find({
            isActive:true
        });

        const responseList=[];

        for (let employee of employeeList) {
            const totalCashAdvancedAmount=await getAllCashAdvancedAmount(employee);
            const totalBonusAmount=await getAllBonusAmount(employee);
            const paidAmount=await  getAllPaidAmount(employee);
            const totalWorkingHours=await getAllTotalWorkingHours(employee);
            const totalEarningAmount=await getAllEarningAmount(employee);

            const response={
                empPrimaryKey:employee._id,
                empNo:employee.empNo,
                firstName:employee.firstName,
                totalBonusAmount:totalBonusAmount,
                totalCashAdvancedAmount:totalCashAdvancedAmount,
                totalWorkingHours:totalWorkingHours,
                totalEarningAmount:totalEarningAmount,
                payableAmount:((totalEarningAmount-totalCashAdvancedAmount)+totalBonusAmount),
                paidAmount:paidAmount,
                balanceAmount:(((totalEarningAmount-totalCashAdvancedAmount)+totalBonusAmount)-paidAmount)
            }
            responseList.push(response);
        }
        const cumulativeBalance = responseList.reduce((sum, r) => sum + r.balanceAmount, 0);

        const summaryResponse={
            cumulativeBalance,
            responseList,
        }
        res.status(200).json(summaryResponse);
    }catch (e){
        res.status(500).send(e.message)
    }
}

async function getAllCashAdvancedAmount(employee) {
    try {
        // find all cash advances for the given employee
        const cashAdvances = await CashAdvanceSchema.find({
            empNoPrimaryKey: employee._id,  // or employee.empNo if your schema uses empNo
            status: true // optional filter if you only want active ones
        });

        // sum up the amounts
        const totalAmount = cashAdvances.reduce((sum, ca) => sum + ca.amount, 0);

        return totalAmount;
    } catch (err) {
        console.error("Error in getAllCashAdvancedAmount:", err.message);
    }
}

async function getAllBonusAmount(employee) {
    try {
        const bonus = await BonusSchema.find({
            empPrimaryKey: employee._id,
            status: true
        });

        const totalAmount = bonus.reduce((sum, ca) => sum + ca.amount, 0);

        return totalAmount;
    }catch (e){
        console.error("Error in getAllBonusAmount:", e.message);
    }
}

async function getAllPaidAmount(employee) {
    try {
        const payment = await PaymentDetailSchema.find({
            empPrimaryKey: employee._id,
            status: true
        });

        const totalAmount = payment.reduce((sum, ca) => sum + ca.amount, 0);

        return totalAmount;
    }catch (e){
        console.error("Error in get payment details:", e.message);
    }
}

async function getAllTotalWorkingHours(employee) {
    try {
        const workingHoursList = await WorkingHoursSchema.find({
            empPrimaryKey: employee._id,
            isActive: true,
            status:"OUT"
        });
        const totalWorkingHours = workingHoursList.reduce((sum, wh) => {
            if (wh.endDateTime && wh.startDateTime) {
                const diffInMs = wh.endDateTime.getTime() - wh.startDateTime.getTime();
                const diffInHours = diffInMs / (1000 * 60 * 60); // convert ms → hours
                return sum + diffInHours;
            }
            return sum;
        }, 0);

        return Number(totalWorkingHours.toFixed(2));
    }catch (e){
        console.error("Error in getAllTotalWorkingHours:", e.message);
    }
}

async function getAllEarningAmount(employee) {
    try {
        const workingHourList = await WorkingHoursSchema.find({
            empPrimaryKey: employee._id,
            isActive: true,
            status:"OUT"
        });
        const totalAmount = workingHourList.reduce((sum, ca) => sum + ca.slotEarningAmount, 0);
        return totalAmount;
    }catch (e){
        console.error("Error in getAllEarningAmount:", e.message);
    }
}

export async function employeePayment(req, res) {
    try {
        const payment=new PaymentDetailSchema({
            empPrimaryKey:req.body.empNoPrimaryKey,
            amount:req.body.amount
        });
        const newVar = await payment.save();
        res.status(200).json(newVar);
    }catch (e){
        res.status(500).send(e.message)
    }
}

