import * as express from 'express'
import { OrderController } from '../endpoints'
import { protectRoute } from '../middlewares'

export function routes(app: express.Application, API_VERSION: string) {
  app.get(`${API_VERSION}/orders`, protectRoute, OrderController.listOrders)
  app.get(
    `${API_VERSION}/order/:orderId`, protectRoute,
    OrderController.listOrderById
  )
  app.post(`${API_VERSION}/order`, protectRoute, OrderController.createOrder)
  app.put(
    `${API_VERSION}/order/:orderId`, protectRoute,
    OrderController.updateOrder
  )
}
