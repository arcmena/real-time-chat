import jwt from 'jsonwebtoken'

import { JWT_OPTIONS, JWT_SECRET } from 'constants/authConstants'

const generateAuthToken = ({ id, username }) =>
  jwt.sign({ id, username }, JWT_SECRET, JWT_OPTIONS.AUTH_TOKEN)

export default generateAuthToken
