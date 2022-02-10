import prismaClient from 'prismaClient'

import { JWT_SECRET_2 } from 'constants/authConstants'

import getIdFromRefreshToken from './getIdFromRefreshToken'
import verifyRefreshToken from './verifyRefreshToken'
import generateAuthToken from './generateAuthToken'
import generateRefreshToken from './generateRefreshToken'

const refreshToken = async refreshToken => {
  let userId

  try {
    const { id } = getIdFromRefreshToken()
    userId = id
  } catch (error) {
    return {}
  }

  const user = await prismaClient.user.findUnique({ where: { id: userId } })

  if (!user) return {}

  const refreshSecret = user.password + JWT_SECRET_2

  try {
    verifyRefreshToken(refreshToken, refreshSecret)
  } catch (error) {
    return {}
  }

  const newAccessToken = generateAuthToken(user)
  const newRefreshToken = generateRefreshToken(user, refreshSecret)

  return {}
}

export default refreshToken
