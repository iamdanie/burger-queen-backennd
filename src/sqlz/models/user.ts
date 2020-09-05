import { DataTypes, Model } from 'sequelize'
import sequelize from './db'

interface UserAttributes {
  id: number
  name: string
  email: string
  password: string
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id: number
  public name: string
  public email: string
  public password: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.DOUBLE(),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(255)
    }
  }, {
  tableName: 'Users', sequelize
}
)

export default User
