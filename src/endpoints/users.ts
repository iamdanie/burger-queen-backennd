import { Request, Response } from 'express'
import { UsersDao } from '../dao'
import jwt from 'jsonwebtoken'
import { encrypt, decrypt } from '../utils/encryption'

const { JWT_SECRET, JWT_EXPIRATION, JWT_ALGORITHM } = require('../../config/security.json')

export async function authenticate(req: Request, res: Response) {
    try {
        const { email, password } = req.body

        const user = await userCredentialsAreValid(email, password)

        if (user) {
            const token = generateToken(user)
            delete user.password

            return res.status(200).json({ user, token })
        }

        return res.status(403).json({ error: 'You have provided a wrong email or password', errorCode: 'INVALID_LOGIN', status: 403 })
    }
    catch (error) {
        return res.status(500).json({ error: error.response || error.errors[0].message || error })
    }
}

export async function register(req: Request, res: Response) {
    try {
        const newUser = req.body
        newUser.password = encrypt(newUser.password)

        const userDb = await UsersDao.create(newUser)
        const user = userDb.toJSON()
        delete user.password

        return res.status(202).json(user)
    }
    catch (error) {
        return res.status(500).json({ error: error.response || error.errors[0].message || error })
    }
}

export async function resetPassword(req: Request, res: Response) {
    try {
        const { userId } = req.params
        const { email, currentPassword, newPassword } = req.body
        const user = await userCredentialsAreValid(email, currentPassword, userId)

        if (user) {
            await UsersDao.updatePassword(userId, encrypt(newPassword))

            return res.status(200).json({
                status: 200,
                message: 'User password has been updated successfully',
                code: 'PASSWORD_RESET_SUCCESS'
            })
        }

        return res.status(403).json({ error: 'You have provided a wrong email or password', errorCode: 'WRONG_RESET_PASSWORD', status: 403 })
    }
    catch (error) {
        return res.status(500).json({ error: error.response || error.errors[0].message || error })
    }
}

async function userCredentialsAreValid(email: string, password: string, userId?: string) {
    console.log('REQUEST---->', email, password, userId)
    const userDb = userId ? await UsersDao.findById(userId) : await UsersDao.findByEmail(email)
    if (!userDb) {
        return null
    }

    const user = await userDb.toJSON()
    return (user && password === decrypt(user.password)) ? user : null
}

const generateToken = (payload: any) => jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
    algorithm: JWT_ALGORITHM
})
