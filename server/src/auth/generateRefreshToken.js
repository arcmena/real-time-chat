import jwt from 'jsonwebtoken'

import { JWT_OPTIONS } from 'constants/authConstants'

const generateRefreshToken = ({ id }, refreshSecret) =>
  jwt.sign({ id }, refreshSecret, JWT_OPTIONS.AUTH_TOKEN)

export default generateRefreshToken
