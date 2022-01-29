import { useMutation, useQuery } from '@apollo/client'
import { useUser } from 'contexts/UserContext'
import { CREATE_MESSAGE_MUTATION } from 'graphql/mutations/chat'
import { MESSAGES_QUERY } from 'graphql/query/chat'
import { NEW_MESSAGE_SUBSCRIPTION } from 'graphql/subscription/chat'
import { useRef } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'

const getOtherUser = (id, users) => users.find(user => user.id !== id)

const Side = ({ children }) => {
  return children
}

const Chat = () => {
  const { chatId } = useParams()

  const intChatId = Number(chatId)

  const { data, loading, subscribeToMore } = useQuery(MESSAGES_QUERY, {
    variables: { data: { chatId: intChatId } },
    fetchPolicy: 'network-only'
  })

  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION)

  subscribeToMore({
    document: NEW_MESSAGE_SUBSCRIPTION,
    variables: { data: { chatId: intChatId } },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev

      const newMessage = subscriptionData.data.newMessage

      return Object.assign({}, prev, {
        messages: {
          ...prev.messages,
          chat: {
            ...prev.messages.chat,
            messages: [...prev.messages.chat.messages, newMessage]
          }
        }
      })
    }
  })

  const inputRef = useRef(null)

  const onSubmit = e => {
    e.preventDefault()

    if (!inputRef.current.value) return

    sendMessage({
      variables: {
        data: { chatId: intChatId, content: inputRef.current.value }
      }
    })

    inputRef.current.value = ''
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <header>chat with id {chatId}</header>
      <main>
        {loading && <>loading...</>}
        <div>
          <ul>
            {data?.messages?.chat.messages.map(({ user, content, id }) => (
              <li style={{ listStyle: 'none' }} key={id}>
                {user.username}: {content}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={onSubmit}>
          <input type="text" name="content" ref={inputRef} autoComplete="off" />
        </form>
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
            {chats.map(({ id, users }) => {
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
