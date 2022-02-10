import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { useAuth } from 'contexts/AuthContext'

import Chat from './components/Chat'
import Chats from './components/Chats'

const Side = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
      {children}
    </div>
  )
}

const HomePage = () => {
  const { me, logOut } = useAuth()

  const [activeChat, setActiveChat] = useState()

  const navigate = useNavigate()

  return (
    <div>
      <h1>{me.username}</h1>
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
