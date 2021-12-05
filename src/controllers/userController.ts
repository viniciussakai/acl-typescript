import { Request, Response } from 'express'
import { UserRepository } from '@repositories/index'
import { hash } from 'bcrypt'

class UserController {
	async register(req: Request, res: Response, next): Promise<Response> {
		const { password, username } = req.body

		const existUser = await UserRepository().findOne({ username })

		if (existUser) {
			return next(new Error('User already exists'))
		}

		const passwordHash = await hash(password, 8)

		const user = UserRepository().create({ username, password: passwordHash })

		await UserRepository().save(user)

		return res.send({ user: user }).status(201)
	}
}

export default new UserController()
