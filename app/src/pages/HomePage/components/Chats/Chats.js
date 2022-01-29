import { useUser } from 'contexts/UserContext'

const getOtherUser = (id, users) => users.find(user => user.id !== id)

const Chats = ({ navigate, activeChat }) => {
  const { id: currentUserId, chats } = useUser()

  return (
    <>
      <h2>Your Chats</h2>
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
