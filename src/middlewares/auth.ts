import { NextFunction, Request, Response } from 'express'
import { verify, decode } from 'jsonwebtoken'
import { UserRepository } from '@repositories/index'
import ServerError from '@errors/serverError'
import jwtConfig from '@config/jwt'

export const ensureAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		return next(new ServerError(401, 'No token provided'))
	}

	const parts = authHeader.split(' ')

	if (!(parts.length === 2)) {
		return next(new ServerError(401, 'Token Error'))
	}
	const [schema, token] = parts
	if (!(schema === 'Bearer')) {
		return next(new ServerError(401, 'Token Malformed'))
	}

	try {
		verify(token, jwtConfig.JWT_SECRET)

		const { sub } = decode(token) || {}
		req.body.userId = sub?.toString()

		return next()
	} catch (err) {
		return next(new ServerError(401, 'Token Incorrect'))
	}
}

export function can(permissionsRoutes: string[]) {
	return async (request: Request, response: Response, next: NextFunction) => {
		const { userId } = request.body

		const user = await UserRepository().findOne({
			where: { id: userId },
			relations: ['permissions']
		})

		if (!user) {
			return next(new ServerError(401, 'User does not exists'))
		}

		const permissionExists = user.permissions
			.map(permission => permission.name)
			.some(permission => permissionsRoutes.includes(permission))

		if (!permissionExists) {
			return next(new ServerError(401, 'Unauthorized'))
		}

		return next()
	}
}

export function is(rolesRoutes: string[]) {
	return async (request: Request, response: Response, next: NextFunction) => {
		const { userId } = request.body

		const user = await UserRepository().findOne({
			where: { id: userId },
			relations: ['roles']
		})

		if (!user) {
			return next(new ServerError(401, 'User does not exists'))
		}

		const roleExists = user.roles
			.map(role => role.name)
			.some(role => rolesRoutes.includes(role))

		if (!roleExists) {
			return next(new ServerError(401, 'Unauthorized'))
		}

		return next()
	}
}
