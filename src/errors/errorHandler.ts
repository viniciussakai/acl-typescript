import { Response } from 'express'
import ServerError from './serverError'

export const handleError = (err: ServerError, res: Response): Response => {
	const { statusCode, message } = err
	return res.status(statusCode).json({
		status: 'error',
		statusCode,
		message
	})
}
