import express from 'express'
import cors from 'cors'
import database from './database'

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
	}

	private middleware(): void {
		this.express.use(cors())
		this.express.use(express.json())
	}

	private routes(): void {}

	private error(): void {
		this.express.use((err, req, res, next) => {
			if (!err) next()
		})
	}

	private async initializeDatabase(): Promise<void> {
		await database.getConnection()
	}
}

export default new App().express
