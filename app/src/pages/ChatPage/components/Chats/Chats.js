import { useEffect, useRef } from 'react'
import { useMutation } from '@apollo/client'

import { CREATE_CHAT_MUTATION } from 'graphql/mutations/chat'

import { useAuth } from 'contexts/AuthContext'

const getOtherUser = (id, users) => users.find(user => user.id !== id)

const Chats = ({ navigate, activeChat }) => {
  const { me, chats, subscribeToNewChats } = useAuth()
  const { id: currentUserId } = me

  const [createChat] = useMutation(CREATE_CHAT_MUTATION)

  useEffect(() => {
    subscribeToNewChats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const inputRef = useRef(null)

  const handleCreateChat = () => {
    if (inputRef.current.value) {
      createChat({
        variables: {
          data: {
            otherUsername: inputRef.current.value
          }
        }
      })
    }
  }

  return (
    <>
      <h2>Your Chats</h2>
      <div>
        <input type="text" name="createChat" id="createChat" ref={inputRef} />
        <button onClick={handleCreateChat}>create chat</button>
      </div>
      <ul style={{ cursor: 'pointer', listStyle: 'none', marginTop: '15px' }}>
        {chats.map(({ id, users }) => {
          const otherUser = getOtherUser(currentUserId, users)

          return (
            <li
              style={{
                minHeight: '46px',
                backgroundColor: activeChat === id ? '#28374d' : '#202c3d'
              }}
              key={id}
              onClick={() => navigate(`/chat/${id}`)}
            >
              <h3>{otherUser.username}</h3>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Chats
