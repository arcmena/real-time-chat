import { useUser } from 'contexts/UserContext'
import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import Chat from './components/Chat'
import Chats from './components/Chats'

const Side = ({ children }) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minWidth: '300px' }}
    >
      {children}
    </div>
  )
}

const HomePage = () => {
  const { username, logOut } = useUser()

  const [activeChat, setActiveChat] = useState()

  const navigate = useNavigate()

  console.log('home')

  return (
    <div>
      <h1>{username}</h1>
      <button onClick={() => logOut(navigate)}>log out</button>

      <div style={{ display: 'flex' }}>
        <Side>
          <Chats navigate={navigate} activeChat={activeChat} />
        </Side>

        <Routes>
          <Route
            path="/chat/:chatId"
            element={<Chat setActiveChat={setActiveChat} />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default HomePage
