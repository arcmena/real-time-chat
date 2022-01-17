import jwt from 'jsonwebtoken'

import { JWT_SECRET } from 'constants/authConstants'

const getUserFromToken = token => {
  const { id, username } = jwt.verify(token, JWT_SECRET)

  return { id, username }
}

export default getUserFromToken
