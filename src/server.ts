import express from 'express'
import winston from 'winston'
import morgan from 'morgan'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import * as routes from './routes'

const { PORT } = require('../config/api.json')

class Server {
  public app: express.Application

  logger = winston.createLogger({
    level: 'info', format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logfile.log' })
    ]
  })

  constructor() {
    this.app = express()
    this.app.use(
      cors({
        optionsSuccessStatus: 200,
      })
    )
    this.app.use(
      urlencoded({
        extended: true,
      })
    )
    this.app.use(json())
    this.app.use(morgan('dev'))
    this.app.listen(PORT, () => {
      this.logger.info(`--> Server successfully started at port ${PORT}`)
    })
    routes.initRoutes(this.app)
  }

  getApp() {
    return this.app
  }
}

export default new Server().app
