import { Request, Response } from 'express'
import { UserRepository } from '@repositories/index'
import { hash } from 'bcrypt'
import { generate } from '@utils/token'
import ServerError from '@errors/serverError'

class UserController {
	async register(req: Request, res: Response, next): Promise<Response> {
		const { password, username } = req.body

		const existUser = await UserRepository().findOne({ username })

		if (existUser) {
			return next(new ServerError(undefined, 'User already exists'))
		}

		const passwordHash = await hash(password, 8)

		const user = UserRepository().create({ username, password: passwordHash })

		await UserRepository().save(user)

		return res.send({ token: generate({ userId: user.id }) }).status(201)
	}
}

export default new UserController()
