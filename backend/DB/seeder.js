import { events } from "./data.js";
import Event from "../models/eventModel.js";
import connectDb from "./connect.js";
import dotenv from "dotenv";
dotenv.config();
connectDb(process.env.MONGO_URI);
const importData=async()=>{
    try {
        await Event.deleteMany({})
        await Event.insertMany(events)
        console.log("Data Import Success")
        process.exit()
    } catch (error) {
        console.error("Error with data import")
        console.log(error.message);
        process.exit(1)
    }
}

const destroyData=async()=>{
    try {
        await Event.deleteMany({})
        console.log("Data Destroyed")
        process.exit()
    } catch (error) {
        console.error("Error with data destroy")
        process.exit(1)
    }
}


if(process.argv[2]==='-d'){
    destroyData()
}else {
    importData()
}