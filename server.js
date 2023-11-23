import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/dbConn.js'

// Routes import
import rootRoutes from './routes/root.js'
import userRoutes from './routes/userRoutes.js'

// Middleware import
import errorHandler from './middleware/errorHandler.js'

// CONFIGURATION
dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5500
const __dirname = path.resolve()

// BODY-PARSER and URLENCODED
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', rootRoutes)
app.use('/users', userRoutes)

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    const filePath = path.join(__dirname, 'views', '404.html')
    res.sendFile(filePath)
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.yellow.bold)
)