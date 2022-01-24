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

  const { data, loading } = useQuery(MESSAGES_QUERY, {
    variables: { data: { chatId: Number(chatId) } }
  })

  console.log(data?.messages?.chat)
  console.log(loading)

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
                  <p>
                    {lastMessage
                      ? `${lastMessage.user.username}: ${lastMessage.content}`
                      : 'No messages'}
                  </p>
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
