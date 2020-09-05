import { Request, Response } from 'express'
import { OrdersDao } from '../dao'
import { Transaction } from 'sequelize/types'
import sequelize from '../sqlz/models/db'

export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await OrdersDao.findAll()

    return res.status(200).json(orders)
  }
  catch (error) {
    return res.status(500).json({ error: error.response || error })
  }
}

export async function listOrderById(req: Request, res: Response) {
  try {
    const singleOrder = await OrdersDao.findById(req.params.orderId)

    if (!singleOrder) {
      return res.status(404).json({ error: 'Order not found' })
    }

    return res.status(200).json(singleOrder)
  }
  catch (error) {
    return res.status(500).json({ error: error.response || error })
  }
}

export async function createOrder(req: Request, res: Response) {
  const t: Transaction = await sequelize.transaction()
  try {
    const createdOrder = await OrdersDao.create(req.body, t)
    await t.commit()

    return res.status(200).json(createdOrder)
  }
  catch (error) {
    await t.rollback()
    return res.status(500).json({ error: error.response || error })
  }
}


export async function updateOrder(req: Request, res: Response) {
  const t: Transaction = await sequelize.transaction()
  try {
    const updatedOrder = await OrdersDao.updateById(req.body, req.params.orderId, t)
    await t.commit()

    return res.status(200).json(updatedOrder)
  }
  catch (error) {
    await t.rollback()
    return res.status(500).json({ error: error.response || error })
  }
}