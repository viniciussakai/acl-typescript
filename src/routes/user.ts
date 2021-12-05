import userController from '@controllers/userController'
import { Router } from 'express'

const routes = Router()

routes.post('/register', userController.register)
routes.post('/login', userController.login)

export default routes
