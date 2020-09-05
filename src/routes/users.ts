import * as express from 'express'
import { UserController } from '../endpoints'
import { protectRoute } from '../middlewares'

export function routes(app: express.Application, API_VERSION: string) {
    app.post(`${API_VERSION}/user/authenticate`, UserController.authenticate)
    app.post(`${API_VERSION}/user`, UserController.register)
    app.put(`${API_VERSION}/user/password/:userId`, protectRoute, UserController.resetPassword)
}
