import { useQuery, useSubscription } from '@apollo/client'
import { useUser } from 'contexts/UserContext'
import { MESSAGES_QUERY } from 'graphql/query/chat'
import { NEW_MESSAGES_SUBSCRIPTION } from 'graphql/subscription/chat'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'

const getOtherUser = (id, users) => users.find(user => user.id !== id)

const Side = ({ children }) => {
  return children
}

const Chat = () => {
  const { chatId } = useParams()

  const intChatId = Number(chatId)

  const { data, loading, subscribeToMore } = useQuery(MESSAGES_QUERY, {
    variables: { data: { chatId: intChatId } }
  })

  subscribeToMore({
    document: NEW_MESSAGES_SUBSCRIPTION,
    variables: { data: { chatId: intChatId } },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev

      const newMessage = subscriptionData.data.newMessage

      return Object.assign({}, prev, {
        messages: {
          chat: {
            ...prev.messages.chat,
            messages: [...prev.messages.chat.messages, newMessage]
          }
        }
      })
    }
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <header>chat with id {chatId}</header>
      <main>
        {loading && <>loading...</>}
        {data?.messages?.chat.messages.map(({ user, content }) => (
          <ul>
            <li style={{ listStyle: 'none' }}>
              {user.username}: {content}
            </li>
          </ul>
        ))}
      </main>
    </div>
  )
}

const HomePage = () => {
  const { id: currentUserId, username, chats } = useUser()

  const navigate = useNavigate()

  return (
    <div>
      <h1>Hello to home page {username}!</h1>

      <div style={{ display: 'flex' }}>
        <Side>
          <ul style={{ cursor: 'pointer' }}>
            {chats.map(({ id, lastMessage, users }) => {
              const otherUser = getOtherUser(currentUserId, users)

              return (
                <li key={id} onClick={() => navigate(`/chat/${id}`)}>
                  <h2>{otherUser.username}</h2>
                </li>
              )
            })}
          </ul>
        </Side>

        <Routes>
          <Route path="/chat/:chatId" element={<Chat />} />
        </Routes>
      </div>
    </div>
  )
}

export default HomePage
