import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import { returnSpeaker, returnSpeakerWithEvents } from "../resources/userResource.js";
import generateToken from "../utils/generateToken.js";
import Stripe from "stripe";

const registerSpeaker = asyncHandler(async (req, res) => {
  console.log("hit register speaker");
  const {
    name,
    email,
    password,
    description,
    imageUrl,
    company,
    linkedin,
    twitter,
    website,
    position,
  } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("email has already been taken,try something else");
  }
  const user = await User.create({
    name,
    email,
    password,
    description,
    company,
    imageUrl,
    linkedin,
    twitter,
    website,
    position,
    type: "speaker",
  });
  if (!user) {
    res.status(400);
    throw new Error("something is wrong");
  }
  generateToken(res, user._id);
  return returnSpeaker(res, user);
});

// get speakers
// GET /api/users/speakers
// public
const getSpeakers = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await User.countDocuments({ type: "speaker", ...keyword });
  const speakers = await User.find({ type: "speaker", ...keyword })
    .select("name _id imageUrl description company position")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({ speakers, page, pages: Math.ceil(count / pageSize) });
});

// get speaker by id
// GET /api/users/speaker/:id
// public
const getSpeakerById = asyncHandler(async (req, res) => {
  const speaker = await User.findById(req.params.id).populate("events");
  if (!speaker) {
    res.status(404);
    throw new Error("speaker not found");
  }
  return returnSpeakerWithEvents(res, speaker);
});

// update speaker profile
// PUT /api/users/speaker/profile
// private
const updateSpeakerProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.imageUrl = req.body.imageUrl || user.imageUrl;
  user.description = req.body.description || user.description;
  user.linkedin = req.body.linkedin || user.linkedin;
  user.twitter = req.body.twitter || user.twitter;
  user.website = req.body.website || user.website;
  user.company = req.body.company || user.company;
  user.position = req.body.position || user.position;
  if (req.body.password) {
    user.password = req.body.password;
  }
  const updatedUser = await user.save();
  generateToken(res, updatedUser._id);
  return returnSpeaker(res,updatedUser);
});


export {registerSpeaker,getSpeakers,getSpeakerById,updateSpeakerProfile}



