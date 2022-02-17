import { useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'

import { MESSAGES_QUERY } from 'graphql/queries/chat'
import { CREATE_MESSAGE_MUTATION } from 'graphql/mutations/chat'
import { NEW_MESSAGE_SUBSCRIPTION } from 'graphql/subscriptions/chat'

import { useAuth } from 'contexts/AuthContext'

import { Button, Input } from 'components/ui'
import Message from '../Message'
import SendIcon from 'assets/icons/send.svg'

import { getOtherUser } from 'utils/chatUtils'

import { ChatContainer, ChatHeader, MessagesContainer } from './Chat.styles'

const Chat = ({ setActiveChat }) => {
  const { me } = useAuth()
  const { id: currentUserId } = me
  const { chatId: paramChatId } = useParams()

  const chatId = Number(paramChatId)

  const inputRef = useRef(null)
  const bottomDivRef = useRef(null)

  const navigate = useNavigate()

  const { data, loading, subscribeToMore } = useQuery(MESSAGES_QUERY, {
    variables: { data: { chatId: chatId } },
    fetchPolicy: 'network-only'
  })

  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION)

  useEffect(() => {
    setActiveChat(chatId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId])

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

  const focusOnBottonDiv = () => bottomDivRef.current.scrollIntoView()

  useEffect(() => {
    if (bottomDivRef.current !== null) focusOnBottonDiv()
  }, [data])

  const onSubmit = e => {
    e.preventDefault()

    const treated = inputRef.current.value.replaceAll(/\s/g, '')

    if (!treated) return

    const content = inputRef.current.value

    sendMessage({
      variables: {
        data: { chatId, content }
      }
    })

    inputRef.current.value = ''
  }

  const closeChat = () => {
    navigate('/')
    setActiveChat()
  }

  return (
    <ChatContainer>
      {loading && <>loading...</>}
      {data && (
        <>
          <ChatHeader>
            <h1>
              {getOtherUser(currentUserId, data.messages.chat.users).username}
            </h1>

            <Button onClick={closeChat}>X</Button>
          </ChatHeader>
          <MessagesContainer>
            <ul>
              {data?.messages?.chat.messages.map(message => (
                <li style={{ listStyle: 'none' }} key={message.id}>
                  <Message message={message} />
                </li>
              ))}
            </ul>
            <div ref={bottomDivRef} />
          </MessagesContainer>
        </>
      )}
      <form onSubmit={onSubmit}>
        <Input
          className="field"
          type="text"
          name="content"
          ref={inputRef}
          autoComplete="off"
        />
        <Button type="submit">
          <img src={SendIcon} alt="send" width="27" height="27" />
        </Button>
      </form>
    </ChatContainer>
  )
}

export default Chat
