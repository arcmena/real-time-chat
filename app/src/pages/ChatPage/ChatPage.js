import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

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
  const [activeChat, setActiveChat] = useState()

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Side>
          <Chats activeChat={activeChat} />
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
