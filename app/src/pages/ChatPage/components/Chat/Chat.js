import { useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'

import { MESSAGES_QUERY } from 'graphql/queries/chat'
import { CREATE_MESSAGE_MUTATION } from 'graphql/mutations/chat'
import { NEW_MESSAGE_SUBSCRIPTION } from 'graphql/subscriptions/chat'

import { ChatContainer } from './Chat.styles'

const Chat = ({ setActiveChat }) => {
  const { chatId: paramChatId } = useParams()

  const chatId = Number(paramChatId)

  useEffect(() => {
    setActiveChat(chatId)
  }, [chatId, setActiveChat])

  const { data, loading, subscribeToMore } = useQuery(MESSAGES_QUERY, {
    variables: { data: { chatId: chatId } },
    fetchPolicy: 'network-only'
  })

  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION)

  useEffect(() => {
    subscribeToMore({
      document: NEW_MESSAGE_SUBSCRIPTION,
      variables: { data: { chatId: chatId } },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        if (subscriptionData.data.newMessage.chatId !== prev.messages.chat.id)
          return prev

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
  }, [chatId, subscribeToMore])

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
    <ChatContainer style={{ display: 'flex', flexDirection: 'column' }}>
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
    </ChatContainer>
  )
}

export default Chat
