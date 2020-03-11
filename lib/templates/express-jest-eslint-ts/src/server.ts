import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import logger from 'morgan'
import path from 'path'
import compression from 'compression'
import cors from 'cors'
import BaseRouter from './routes'

// Init express
const app = express()

// Add middleware/settings/routes to express.
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())
app.use(cors())
app.use('/api', BaseRouter)

/**
 * Point express to the 'views' directory. If you're using a
 * single-page-application framework like react or angular
 * which has its own development server, you might want to
 * configure this to only serve the index file while in
 * production mode.
 */
const viewsDir = path.join(__dirname, 'views')
app.set('views', viewsDir)
const staticDir = path.join(__dirname, 'public')
app.use(express.static(staticDir))
app.get('*', (req: Request, res: Response) => {
  res.sendFile('index.html', { root: viewsDir })
})

export default app
