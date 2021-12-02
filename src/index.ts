import app from './server'
import 'reflect-metadata'
import 'dotenv/config'

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
	console.log(`[server] running on port: ${PORT}`)
})
