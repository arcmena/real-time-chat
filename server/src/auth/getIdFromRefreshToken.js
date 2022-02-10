import jwt from 'jsonwebtoken'

const getIdFromRefreshToken = refreshToken => {
  const { id } = jwt.decode(refreshToken)

  return { id }
}

export default getIdFromRefreshToken
