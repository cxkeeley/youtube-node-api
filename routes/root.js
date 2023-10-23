import express from 'express'
import path from 'path'

const router = express.Router()
const __dirname = path.resolve()

router.get('^/$|/index(.html)?', (req, res) => {
  const filePath = path.join(
    __dirname,
    'views', 'index.html'
  )
  res.sendFile(filePath)
})

export default router