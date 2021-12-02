import express from 'express'
import cors from 'cors'

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

	private async initializeDatabase(): Promise<void> {}
}

export default new App().express
