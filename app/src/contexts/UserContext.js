import { useQuery } from '@apollo/client'
import { createContext, useContext } from 'react'

import { ME_QUERY } from '../graphql/query/user'

const UserContext = createContext({})

const UserProvider = ({ children }) => {
  const { data, loading: loadingUser, error: errorUser } = useQuery(ME_QUERY)

  const providerValue = {
    ...data?.me,
    loadingUser,
    errorUser
  }

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  const context = useContext(UserContext)

  return context
}

export { UserProvider, useUser }
