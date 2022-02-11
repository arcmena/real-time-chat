import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Chat from './components/Chat'
import Chats from './components/Chats'

import { SideBar } from './ChatPage.styles'

const HomePage = () => {
  const [activeChat, setActiveChat] = useState()

  return (
    <>
      <SideBar>
        <Chats activeChat={activeChat} />
      </SideBar>

      <Routes>
        <Route
          path="/chat/:chatId"
          element={<Chat setActiveChat={setActiveChat} />}
        />
      </Routes>
    </>
  )
}

export default HomePage
