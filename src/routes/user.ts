import AuthController from '@controllers/authController'
import { Router } from 'express'

const routes = Router()

routes.post('/register', AuthController.register)
routes.post('/login', AuthController.login)

export default routes
