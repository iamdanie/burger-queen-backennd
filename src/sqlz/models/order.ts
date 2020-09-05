import { DataTypes, Model, HasManyGetAssociationsMixin, Association } from 'sequelize'
import sequelize from './db'
import OrderMenuItem from './orderMenuItem'

interface OrderAttributes {
  id: number
  waiter: string
  status: string
  amount: number
  customer: string
  table: number
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id: number
  public waiter: string
  public status: string
  public amount: number
  public customer: string
  public table: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public getOrderMenuItems!: HasManyGetAssociationsMixin<OrderMenuItem>

  public readonly orderMenuItems?: OrderMenuItem[]

  public static associations: {
    orderMenuItems: Association<Order, OrderMenuItem>
  }
}

Order.init(
  {
    id: {
      allowNull: false,
      type: new DataTypes.NUMBER(),
      primaryKey: true,
      autoIncrement: true
    },
    waiter: {
      allowNull: false,
      type: new DataTypes.STRING(255)
    },
    status: {
      allowNull: false,
      type: new DataTypes.STRING(255)
    },
    amount: {
      allowNull: false,
      type: new DataTypes.DOUBLE()
    },
    customer: {
      allowNull: false,
      type: new DataTypes.STRING(255)
    },
    table: {
      allowNull: false,
      type: new DataTypes.DOUBLE(),
      defaultValue: ''
    }
  }, {
  tableName: 'Orders', sequelize
}
)

Order.hasMany(OrderMenuItem, {
  sourceKey: 'id',
  foreignKey: 'orderId',
  as: 'orderMenuItems'
})

export default Order
