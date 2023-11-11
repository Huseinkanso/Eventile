import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import Stripe from "stripe";
import { checkReturnUser } from "../resources/userResource.js";
// authenticate user
// POST /api/users/login
// public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    return checkReturnUser(res,user);
  }
  res.status(401);
  throw new Error("Invalid email or password");
});

// register user
// POST /api/users/register
// public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("email has already been taken,try something else");
  }
  const user = await User.create({
    name,
    email,
    password,
    type: "user",
  });
  if (user) {
    generateToken(res, user._id);
    return returnUser(res,user);
  }
  res.status(400);
  throw new Error({ message: error.message });
});



const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    expires: 0,
    httpOnly: true,
  });
  res.status(200).json({ message: "logged out successfully" });
});

// get user profile
// GET /api/users/profile
// private  (user & speaker)
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  return checkReturnUser(res,user);
});

// update user profile
// PUT /api/users/profile
// private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  user.name = req.body.name || user.name;
  // check if the new email is already taken from someone else 
  // is resend same email no problem
  if (req.body.email && (await User.countDocuments({ email: req.body.email })>=2)) {
    res.status(400);
    throw new Error("email has already been taken,try something else");
  }
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }
  const updatedUser = await user.save();
  return returnUser(res,updatedUser);
});






export {
  login,
  registerUser,
  logout,
  updateUserProfile,
  getUserProfile,
};



