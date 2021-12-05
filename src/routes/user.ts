import userController from '@controllers/userController'
import { Router } from 'express'

const routes = Router()

routes.post('/register', userController.register)

export default routes
