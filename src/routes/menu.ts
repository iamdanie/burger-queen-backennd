import * as express from 'express'
import { MenuController } from '../endpoints'
import { protectRoute } from '../middlewares'

export function routes(app: express.Application, API_VERSION: string) {
  app.get(`${API_VERSION}/menu`, protectRoute, MenuController.listMenu)
}
