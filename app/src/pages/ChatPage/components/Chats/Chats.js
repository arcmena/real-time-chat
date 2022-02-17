import { useCallback, useEffect, useRef, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { CREATE_CHAT_MUTATION } from 'graphql/mutations/chat'

import { useAuth } from 'contexts/AuthContext'

import { Button } from 'components/ui'

import { getOtherUser } from 'utils/chatUtils'

import { CreateChatContainer, NoChatsMessage } from './Chats.styles'
import ErrorMessage from 'components/ui/ErrorMessage'

const Chats = ({ activeChat }) => {
  const { me, chats, subscribeToNewChats } = useAuth()
  const { id: currentUserId } = me

  const [createChatInput, setCreateChatInput] = useState('')
  const [creatingChat, setCreatingChat] = useState(false)

  const [creatingChatError, setCreatingChatError] = useState('')

  const inputRef = useRef(null)

  const [createChat] = useMutation(CREATE_CHAT_MUTATION)

  const navigate = useNavigate()

  useEffect(() => {
    subscribeToNewChats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [creatingChat])

  const handleCreateChat = async e => {
    e.preventDefault()

    if (createChatInput) {
      const {
        data: {
          createChat: { errors }
        }
      } = await createChat({
        variables: {
          data: {
            otherUsername: createChatInput
          }
        }
      })

      if (errors) {
        return setCreatingChatError(errors[0].message)
      }

      setCreatingChatError('')
      setCreateChatInput('')
      setCreatingChat(false)
    }
  }

  const handleChangeCreateChatInput = e => {
    const {
      target: { value }
    } = e

    setCreateChatInput(value)
  }

  const blockEmptyChars = useCallback(event => {
    const isNumeric =
      (event.charCode >= 65 && event.charCode <= 90) ||
      (event.charCode >= 97 && event.charCode <= 122) ||
      event.charCode !== 18

    if (!isNumeric) {
      event.preventDefault()
    }
  }, [])

  return (
    <>
      {chats.length === 0 && (
        <NoChatsMessage>
          Looks like you don't have any chats. Create one clicking in the button
          below and type your contact's username
        </NoChatsMessage>
      )}
      {chats && (
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
      )}

      <CreateChatContainer>
        {creatingChat ? (
          <form onSubmit={handleCreateChat} autoComplete="off">
            <input
              type="text"
              name="createChat"
              id="createChat"
              placeholder="Contact username"
              ref={inputRef}
              value={createChatInput}
              onChange={handleChangeCreateChatInput}
              onKeyPress={blockEmptyChars}
            />
            {creatingChatError && (
              <ErrorMessage>{creatingChatError}</ErrorMessage>
            )}
          </form>
        ) : (
          <Button onClick={() => setCreatingChat(true)}>+</Button>
        )}
      </CreateChatContainer>
    </>
  )
}

export default Chats
