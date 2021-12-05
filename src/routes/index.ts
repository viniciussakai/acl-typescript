import { Router } from 'express'
import userRoutes from '@routes/user'

const routes = Router()

routes.use('/auth', userRoutes)

export default routes
