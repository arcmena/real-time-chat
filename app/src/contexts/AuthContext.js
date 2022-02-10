import { useQuery } from '@apollo/client'
import { createContext, useCallback, useContext } from 'react'

import { ME_CHATS_QUERY } from 'graphql/queries/user'
import { NEW_CHAT_SUBSCRIPTION } from 'graphql/subscriptions/chat'

import authStorage from 'lib/authStorage'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const {
    data,
    loading: loadingUser,
    error: errorUser,
    subscribeToMore
  } = useQuery(ME_CHATS_QUERY)

  const subscribeToNewChats = useCallback(
    () =>
      subscribeToMore({
        document: NEW_CHAT_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev

          const newChat = subscriptionData.data.newChat

          return Object.assign({}, prev, {
            ...prev,
            chats: [...prev.chats, newChat]
          })
        }
      }),
    [subscribeToMore]
  )

  const logOut = useCallback(navigate => {
    authStorage.destroyToken()
    navigate('/login')
  }, [])

  const providerValue = {
    ...data,
    subscribeToNewChats,
    loadingUser,
    errorUser,
    logOut
  }

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
