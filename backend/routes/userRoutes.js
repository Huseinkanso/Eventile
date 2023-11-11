import express from 'express'
import { getUserProfile, login,  logout,  registerUser,updateUserProfile } from '../controllers/userController.js'
import {protect, speaker} from '../middleware/authMiddleware.js'
import { getSpeakerById, getSpeakers, registerSpeaker, updateSpeakerProfile } from '../controllers/speakerController.js'
const router = express.Router()


router.post('/login',login)
router.post('/registerUser',registerUser)
router.post('/registerSpeaker',registerSpeaker)
router.post('/logout',protect ,logout)

router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.put('/speaker/profile',protect,speaker,updateSpeakerProfile)
router.route('/speakers').get(getSpeakers)
router.route('/speakers/:id').get(getSpeakerById)
export default router