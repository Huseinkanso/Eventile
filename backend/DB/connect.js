import mongoose from "mongoose";

const connectDb=async(url)=>{

    try {
        const conn=await mongoose.connect(url)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
        throw new Error(`Error: ${error.message}`);
    }
}

export default connectDb;