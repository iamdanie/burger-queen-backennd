import { DataTypes, Model } from 'sequelize'
import sequelize from './db'

interface OrderMenuItemAttributes {
  id: number
  orderId: number
  menuItemId: string
  complements: string
}

class OrderMenuItem extends Model<OrderMenuItemAttributes> implements OrderMenuItemAttributes {
  public id: number
  public orderId: number
  public menuItemId: string
  public complements: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

OrderMenuItem.init(
  {
    id: {
      allowNull: false,
      type: new DataTypes.DOUBLE(),
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      allowNull: false,
      type: new DataTypes.DOUBLE()
    },
    menuItemId: {
      allowNull: false,
      type: new DataTypes.DOUBLE()
    },
    complements: {
      allowNull: true,
      type: new DataTypes.STRING(255)
    }
  }, {
  tableName: 'OrderMenuItems', sequelize
}
)

export default OrderMenuItem
