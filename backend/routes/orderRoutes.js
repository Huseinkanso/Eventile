import express from 'express'
import { downloadTicket, getUserOrders, updateOrderToPaid } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()



router.route('/updateOrder').post(updateOrderToPaid)
router.get('/myorders',protect, getUserOrders)
router.route('/:id/downloadTicket').post(protect,downloadTicket)
export default router