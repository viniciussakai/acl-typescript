export default class ServerError extends Error {
	public message: string
	public statusCode: number

	constructor(statusCode?: number, message?: string) {
		super()
		this.statusCode = statusCode || 500
		this.message = message || 'Internal Error'
	}
}
