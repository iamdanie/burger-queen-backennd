import { DataTypes, Model } from 'sequelize'
import sequelize from './db'

interface MenuAttributes {
  id: number
  name: string
  price: number
  size: string
  category: string
  available: boolean
  complementCategory: string
}

class Menu extends Model<MenuAttributes> implements MenuAttributes {
  public id: number
  public name: string
  public price: number
  public size: string
  public category: string
  public available: boolean
  public complementCategory: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Menu.init(
  {
    id: {
      allowNull: false,
      type: new DataTypes.DOUBLE(),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: new DataTypes.STRING(255)
    },
    price: {
      allowNull: false,
      type: new DataTypes.DOUBLE()
    },
    size: {
      allowNull: false,
      type: new DataTypes.STRING(255)
    },
    category: {
      allowNull: false,
      type: new DataTypes.STRING(255)
    },
    available: {
      allowNull: false,
      type: new DataTypes.TINYINT
    },
    complementCategory: {
      allowNull: true,
      type: new DataTypes.STRING(255)
    },
  }, {
  tableName: 'Menu', sequelize
}
)

export default Menu
