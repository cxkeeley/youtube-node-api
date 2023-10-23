import { v4 as uuid } from 'uuid'
import fs, { promises as fsPromises } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const logEvents = async (message, logFileName) => {
  const dateTime = new Date().toISOString()
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    const logsDir = path.join(__dirname, '..', 'logs')
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir)
    }
    await fsPromises.appendFile(
      path.join(logsDir, logFileName),
      logItem
    )
  } catch (err) {
    console.log(err)
  }
}

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
  console.log(`${req.method} ${req.path}`)
  next()
}

export { logEvents, logger }
