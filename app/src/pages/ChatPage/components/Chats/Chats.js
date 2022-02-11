import { useEffect, useRef, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { CREATE_CHAT_MUTATION } from 'graphql/mutations/chat'

import { useAuth } from 'contexts/AuthContext'

import { getOtherUser } from 'utils/chatUtils'

import { CreateChatContainer } from './Chats.styles'
import { Button } from 'components/ui'

const Chats = ({ activeChat }) => {
  const { me, chats, subscribeToNewChats } = useAuth()
  const { id: currentUserId } = me

  const [creatingChat, setCreatingChat] = useState(false)

  const [createChat] = useMutation(CREATE_CHAT_MUTATION)

  const navigate = useNavigate()

  useEffect(() => {
    subscribeToNewChats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [creatingChat])

  const handleCreateChat = e => {
    e.preventDefault()

    if (inputRef.current.value) {
      createChat({
        variables: {
          data: {
            otherUsername: inputRef.current.value
          }
        }
      })

      setCreatingChat(false)
    }
  }

  return (
    <>
      <ul style={{ cursor: 'pointer', listStyle: 'none' }}>
        {chats.map(({ id, users }) => {
          const otherUser = getOtherUser(currentUserId, users)

          return (
            <li
              style={{
                minHeight: '46px',
                backgroundColor: activeChat === id && '#28374d',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '1rem'
              }}
              key={id}
              onClick={() => navigate(`/chat/${id}`)}
            >
              <h3>{otherUser.username}</h3>
            </li>
          )
        })}
      </ul>
      <CreateChatContainer>
        {creatingChat ? (
          <form onSubmit={handleCreateChat}>
            <input
              type="text"
              name="createChat"
              id="createChat"
              placeholder="Contact username"
              ref={inputRef}
            />
          </form>
        ) : (
          <Button onClick={() => setCreatingChat(true)}>+</Button>
        )}
      </CreateChatContainer>
    </>
  )
}

export default Chats
