import jwt from 'jsonwebtoken'

const { JWT_SECRET } = require('../../config/security.json')

export default function authenticateToken(req: any, res: any, next: any) {
    const header = req.headers['authorization']
    const token = header?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            error: 'Authentication Token is missing',
            errorCode: 'MISSING_TOKEN',
            status: 401
        })
    }

    jwt.verify(token, JWT_SECRET, (error: any, user: any) => {
        if (error) {
            return res.status(401).json({
                error: 'Invalid Authentication Token',
                errorCode: 'INVALID_TOKEN',
                status: 401
            })
        }
        req.decodedUser = user
        next()
    })
}
