import User from '../sqlz/models/user'
import { Transaction } from 'sequelize/types'

export async function findById(id: string): Promise<any> {
    try {
        return await User.findByPk(id)
    } catch (error) {
        throw error
    }
}

export async function findByEmail(email: string): Promise<any> {
    try {
        return await User.findOne({
            where: { email }
        })
    } catch (error) {
        throw error
    }
}

export async function create(user: any, transaction?: Transaction): Promise<any> {
    try {
        return await User.create(user, { transaction })
    } catch (error) {
        throw error
    }
}

export async function updatePassword(userId: any, password: string, transaction?: Transaction): Promise<any> {
    try {
        return await User.update({ password }, { where: { id: userId }, transaction })
    } catch (error) {
        throw error
    }
}
