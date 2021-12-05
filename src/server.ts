import express from 'express'
import cors from 'cors'
import database from './database'
import routes from '@routes/index'
import { handleError } from '@errors/errorHandler'

class App {
	public express: express.Application

	/*
        Construcor
  */
	public constructor() {
		this.express = express()
		this.initializeDatabase()
		this.middleware()
		this.routes()
		this.error()
	}

	private middleware(): void {
		this.express.use(cors())
		this.express.use(express.json())
	}

	private routes(): void {
		this.express.use('/', routes)
	}

	private error(): void {
		this.express.use((err, req, res, next) => {
			if (!err) next()

			return handleError(err, res)
		})
	}

	private async initializeDatabase(): Promise<void> {
		await database.getConnection()
	}
}

export default new App().express
