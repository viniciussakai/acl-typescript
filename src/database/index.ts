import { createConnection, getConnection } from 'typeorm'
import config from '@config/database'

class Database {
	public async getConnection(): Promise<any> {
		try {
			await createConnection(config)
			getConnection('default')
			console.log('[database] Successfully initialized')
		} catch (error) {
			console.log('Error while connecting to the database', error)
			return error
		}
	}
}

export default new Database()
