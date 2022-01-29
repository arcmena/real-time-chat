import { useQuery } from '@apollo/client'
import { createContext, useContext } from 'react'

import { ME_QUERY } from 'graphql/query/user'
import { NEW_CHAT_SUBSCRIPTION } from 'graphql/subscription/chat'

const UserContext = createContext({})

const UserProvider = ({ children }) => {
  const {
    data,
    loading: loadingUser,
    error: errorUser,
    subscribeToMore
  } = useQuery(ME_QUERY)

  const subscribeToNewChats = () =>
    subscribeToMore({
      document: NEW_CHAT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const newChat = subscriptionData.data.newChat

        return Object.assign({}, prev, {
          me: {
            ...prev.me,
            chats: [...prev.me.chats, newChat]
          }
        })
      }
    })

  const providerValue = {
    ...data?.me,
    subscribeToNewChats,
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
