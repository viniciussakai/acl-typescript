import { Request, Response } from 'express'
import { UserRepository } from '@repositories/index'
import { hash, compare } from 'bcrypt'
import { generate } from '@utils/token'
import ServerError from '@errors/serverError'

class AuthController {
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

	async login(req: Request, res: Response, next): Promise<Response | void> {
		const { password, username } = req.body

		const user = await UserRepository().findOne({ username })

		if (!user) {
			return next(new ServerError(undefined, "User does't exists"))
		}

		const passwordMatch = await compare(password, user.password)

		if (!passwordMatch) {
			return next(new ServerError(401, 'Password does not match'))
		}

		return res.send({ token: generate({ userId: user.id }) }).status(200)
	}
}

export default new AuthController()
