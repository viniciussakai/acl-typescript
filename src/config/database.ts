import { ConnectionOptions } from 'typeorm'
import 'dotenv/config'
import path from 'path'

const config: ConnectionOptions = {
	type: 'mysql',
	host: process.env.MYSQL_HOST,
	port: Number(process.env.MYSQL_PORT),
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DB,
	entities: [path.resolve(__dirname, '..', 'entities', '*.ts')],
	migrations: [path.resolve(__dirname, '..', 'database', 'migrations', '*.ts')],
	cli: {
		entitiesDir: path.resolve(__dirname, '..', 'models'),
		migrationsDir: path.resolve(__dirname, '..', 'database', 'migrations')
	}
}

export default config
