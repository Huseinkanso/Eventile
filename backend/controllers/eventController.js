import asyncHandler from "../middleware/asyncHandler.js";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
// get events
//  get /api/events
//  public
const getEvents = asyncHandler(async (req, res) => {
  // pagination + search
  console.log(req.query.keyword, req.query.pageNumber);
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } }: {};
  const count = await Event.countDocuments({ ...keyword });
  const events = await Event.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));
  res.status(200).json({ events, page, pages: Math.ceil(count / pageSize) });
});

// get events
//  get /api/events
//  public
const getEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (event) {
    res.status(200).json(event);
    return;
  }

  res.status(404);
  throw new Error("Event not found");
});

// create event
//  post /api/events
//  private speaker
const createEvent = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    date,
    imageUrl,
    address,
    category,
    ticket_price,
    ticket_number,
    longitude,
    latitude,
  } = req.body;
  const event = new Event({
    name,
    description,
    date,
    imageUrl,
    address,
    category,
    ticket_price,
    ticket_number,
    ticket_remaining: ticket_number,
    longitude,
    latitude,
    speaker: req.user._id,
  });
  const createdEvent = await event.save();
  // add event id to events array of speaker
  const speaker = await User.findById(req.user._id);
  speaker.events.push(createdEvent._id);
  await speaker.save();
  res.status(201).json(createdEvent);
});

// update event
//  put /api/events/:id
//  private speaker
const updateEvent = asyncHandler(async (req, res) => {
  const { id: eventId } = req.params;
  const {
    name,
    description,
    date,
    imageUrl,
    address,
    category,
    ticket_price,
    ticket_number,
    ticket_remaining,
    longitude,
    latitude,
  } = req.body;
  const event = await Event.findById(eventId);
  // update if there is new value
  if (event) {
    if (req.user._id.toString() !== event.speaker._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to update this event");
    }
    event.name = name || event.name;
    event.description = description || event.description;
    event.date = date || event.date;
    event.imageUrl = imageUrl || event.imageUrl;
    event.address = address || event.address;
    event.category = category || event.category;
    event.ticket_price = ticket_price || event.ticket_price;
    event.ticket_number = ticket_number || event.ticket_number;
    event.ticket_remaining = ticket_remaining || event.ticket_remaining;
    event.longitude = longitude || event.longitude;
    event.latitude = latitude || event.latitude;
    const updatedEvent = await event.save();
    res.status(201).json(updatedEvent);
    return;
  }
  res.status(404);
  throw new Error("Event not found");
});

// delete event
//  delete /api/events/:id
//  private speaker
const deleteEvent = asyncHandler(async (req, res) => {
  const { id: eventId } = req.params;
  const event = await Event.findById(eventId);
  if (event) {
    if (req.user._id.toString() !== event.speaker._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to delete this event");
    }
    await event.deleteOne({ _id: event._id });
    res.json({ message: "Event removed" });
    return;
  }
  res.status(404);
  throw new Error("Event not found");
});

// get speaker events
// get /api/events/speaker
// private speaker
const getSpeakerEvents = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  const speaker = await User.findById(req.user._id).populate("events");
  if (!speaker) {
    res.status(404);
    throw new Error("speaker not found");
  }
  res.status(200).json(speaker.events);
});

export {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getSpeakerEvents,
};
