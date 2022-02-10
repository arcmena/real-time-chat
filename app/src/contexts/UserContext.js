import { useQuery } from '@apollo/client'
import { createContext, useCallback, useContext } from 'react'

import { ME_CHATS_QUERY } from 'graphql/query/user'
import { NEW_CHAT_SUBSCRIPTION } from 'graphql/subscription/chat'

import authStorage from 'lib/authStorage'

const UserContext = createContext({})

const UserProvider = ({ children }) => {
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
