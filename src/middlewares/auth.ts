import { NextFunction, Request, Response } from 'express'
import { verify, decode } from 'jsonwebtoken'
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
