import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  //   fields if speaker
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  twitter: {
    type: String,
  },
  website: {
    type: String,
  },
  company: {
    type: String,
  },
  position: {
    type: String,
  },
  events:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    }
  ],
  stripeAccountId:{
    type:String,
    required:false,
  },
});

user.methods.matchPassword=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

user.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});






export default mongoose.model("User", user);