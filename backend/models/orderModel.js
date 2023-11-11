import mongoose from "mongoose";

const order= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    event:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Event"
    },
    paymentResult:{
        id:{type:String},
        status:{type:String},
        update_time:{type:String},
        email_address:{type:String}
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAt:{
        type:Date
    }
},{
    timestamps:true
})

export default mongoose.model("Order",order)