import jwt from 'jsonwebtoken'

import { JWT_EXPIRATION, JWT_SECRET } from 'constants/authConstants'

const generateAuthToken = ({ id, username }) =>
  jwt.sign({ id, username }, JWT_SECRET, JWT_EXPIRATION.AUTH_TOKEN)

export default generateAuthToken
