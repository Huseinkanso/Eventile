import express from 'express'
import { getEvents,getEvent,createEvent,updateEvent,deleteEvent, getSpeakerEvents } from '../controllers/eventController.js'
import {protect,speaker} from '../middleware/authMiddleware.js'
import { checkout } from '../controllers/orderController.js'
const router = express.Router()


router.route('/speaker').get(protect,speaker,getSpeakerEvents)
router.route('/').get(getEvents).post(protect,speaker,createEvent)
router.route('/:id').get(getEvent).put(protect,speaker,updateEvent).delete(protect,speaker,deleteEvent)

router.route('/:id/checkout').post(protect,checkout)

export default router