import jwtConfig from '@config/jwt'
import jwt from 'jsonwebtoken'

export const generate = (params = {}): string => {
	return jwt.sign(params, jwtConfig.JWT_SECRET, {
		expiresIn: 84100
	})
}
