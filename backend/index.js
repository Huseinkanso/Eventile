import express from 'express'
import dotenv from 'dotenv'
import connectDb from './DB/connect.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
dotenv.config()
import path from 'path'
import userRoutes from './routes/userRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import uploadRoute from './routes/uploadRoute.js'
import orderRoutes from './routes/orderRoutes.js'
import cookieParser from 'cookie-parser'
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// cookie parser middleware (allow us to parse cookie) by req.cookies.token
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
const startServer= async()=>{
    await connectDb(process.env.MONGO_URI)
    app.listen(process.env.PORT, () => {
        console.log(`Example app listening at http://localhost:${process.env.PORT}`)
    })
}
startServer()
const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

app.use('/api/users',userRoutes)
app.use('/api/events',eventRoutes)
app.use('/api/uploads',uploadRoute)
app.use('/api/orders',orderRoutes)


app.use(notFound)
app.use(errorHandler)