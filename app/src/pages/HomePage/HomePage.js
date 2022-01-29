import { useMutation, useQuery } from '@apollo/client'
import { useUser } from 'contexts/UserContext'
import { CREATE_MESSAGE_MUTATION } from 'graphql/mutations/chat'
import { MESSAGES_QUERY } from 'graphql/query/chat'
import { NEW_MESSAGE_SUBSCRIPTION } from 'graphql/subscription/chat'
import { useRef, useState } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'

const getOtherUser = (id, users) => users.find(user => user.id !== id)

const Side = ({ children }) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minWidth: '300px' }}
    >
      {children}
    </div>
  )
}

const Chat = () => {
  const { chatId: paramChatId } = useParams()

  const chatId = Number(paramChatId)

  const { data, loading, subscribeToMore } = useQuery(MESSAGES_QUERY, {
    variables: { data: { chatId: chatId } }
  })

  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION)

  subscribeToMore({
    document: NEW_MESSAGE_SUBSCRIPTION,
    variables: { data: { chatId: chatId } },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev

      const newMessage = subscriptionData.data.newMessage

      const hasMessageAlready = prev.messages.chat.messages.find(
        ({ id }) => id === newMessage.id
      )

      if (!hasMessageAlready) {
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
    }
  })

  const inputRef = useRef(null)

  const onSubmit = e => {
    e.preventDefault()

    if (!inputRef.current.value) return

    const content = inputRef.current.value

    sendMessage({
      variables: {
        data: { chatId, content }
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
  const { id: currentUserId, username, chats, logOut } = useUser()
  const [activeChat, setActiveChat] = useState()

  const navigate = useNavigate()

  return (
    <div>
      <h1>{username}</h1>
      <button onClick={() => logOut(navigate)}>log out</button>

      <div style={{ display: 'flex' }}>
        <Side>
          <h2>Your Chats</h2>
          <ul
            style={{ cursor: 'pointer', listStyle: 'none', marginTop: '15px' }}
          >
            {chats.map(({ id, users }) => {
              const otherUser = getOtherUser(currentUserId, users)

              return (
                <li
                  style={{
                    minHeight: '46px',
                    backgroundColor: activeChat === id ? '#28374d' : '#202c3d'
                  }}
                  key={id}
                  onClick={() => {
                    setActiveChat(id)
                    navigate(`/chat/${id}`)
                  }}
                >
                  <h3>{otherUser.username}</h3>
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
