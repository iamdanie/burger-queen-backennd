import Order from './../sqlz/models/order'
import OrderMenuItem from '../sqlz/models/orderMenuItem'
import { Transaction } from 'sequelize/types'

export async function findAll(): Promise<any> {
  try {
    const orderDb = await Order.findAll({
      include: [Order.associations.orderMenuItems]
    })

    const returningOrder = orderDb.map((orderItem: Order) => ({
      ...orderItem.toJSON(),
      orderMenuItems: parseOrderMenuItemsComplements(orderItem.orderMenuItems)
    }))

    return returningOrder
  } catch (error) {
    throw error
  }
}

export async function findById(id: string): Promise<any> {
  try {
    const orderDb = await Order.findByPk(id, {
      include: [Order.associations.orderMenuItems]
    })

    if (!orderDb) {
      return null
    }

    return { ...orderDb.toJSON(), orderMenuItems: parseOrderMenuItemsComplements(orderDb.orderMenuItems) }
  } catch (error) {
    throw error
  }
}

export async function create(orderItem: any, transaction: Transaction): Promise<any> {
  try {
    const { orderMenuItems } = orderItem

    delete orderItem.orderMenuItems

    const orderDb = await Order.create(orderItem, { transaction })
    const orderId = orderDb.id
    const insertableOrderMenuItems = orderMenuItems.map((item: any) => ({ ...item, complements: JSON.stringify(item.complements), orderId }))
    const orderMenuItemsDb = await OrderMenuItem.bulkCreate(insertableOrderMenuItems, { transaction })

    return { ...orderDb.toJSON(), orderMenuItems: orderMenuItemsDb }
  } catch (error) {
    throw error
  }
}

export async function updateById(orderItem: any, orderId: any, transaction: Transaction): Promise<any> {
  try {
    const orderMenuItems = orderItem.orderMenuItems

    delete orderItem.orderMenuItems

    let orderDb = await Order.findByPk(orderId, { transaction })

    updateOrder(orderDb, orderItem)
    await orderDb.save({ transaction })
    await OrderMenuItem.destroy({ where: { orderId }, transaction })

    const updatedOrderMenuItems = orderMenuItems.map((item: any) => ({
      ...item, complements: JSON.stringify(item.complements), orderId
    }))

    const orderMenuItemsDb = await OrderMenuItem.bulkCreate(updatedOrderMenuItems, { transaction })

    return { ...orderDb.toJSON(), orderMenuItems: parseOrderMenuItemsComplements(orderMenuItemsDb) }
  } catch (error) {
    throw error
  }
}

const parseOrderMenuItemsComplements = (orderMenuItems: any[]) => orderMenuItems.map((item: any) => ({ ...item.toJSON(), complements: item.toJSON().complements ? JSON.parse(item.toJSON().complements) : null }))

const updateOrder = (orderDB: Order, newOrder: any) => {
  orderDB.waiter = newOrder.waiter || orderDB.waiter
  orderDB.status = newOrder.status || orderDB.status
  orderDB.amount = newOrder.amount || orderDB.amount
  orderDB.customer = newOrder.customer || orderDB.customer
  orderDB.table = newOrder.table || orderDB.table
}