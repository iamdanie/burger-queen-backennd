import { Request, Response } from 'express'
import * as express from 'express'
import * as OrderRoutes from './order'
import * as MenuRoutes from './menu'
import * as UserRoutes from './users'

export function initRoutes(app: express.Application) {
  const { VERSION } = require('../../config/api.json')

  app.get(`${VERSION}/healthcheck`, (req: Request, res: Response) =>
    res.status(200).json({
      message: 'Welcome to Burger Queen Api!',
      date: Date.now(),
    })
  )

  OrderRoutes.routes(app, VERSION)
  MenuRoutes.routes(app, VERSION)
  UserRoutes.routes(app, VERSION)

  app.all('*', (req: Request, res: Response) =>
    res.status(404).json({
      error: 'Resource not found',
    })
  )
}
