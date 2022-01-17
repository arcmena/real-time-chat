const auth = (req, _res, next) => {
  const { authorization } = req.headers

  if (authorization) {
    const [_bearer, token] = authorization.split(' ')

    if (token) {
      try {
        const user = getUserFromToken(token)
        req.user = user
      } catch (error) {
        // TODO: add refresh token logic
      }
    }
  }

  next()
}

export default auth
