import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Chat from './components/Chat'
import Chats from './components/Chats'

import { ChatPageContainer, SideBar } from './ChatPage.styles'
import useWindowSize from 'hooks/useWindowSize'

const HomePage = () => {
  const [activeChat, setActiveChat] = useState()

  return (
    <ChatPageContainer>
      <SideBar>
        <Chats activeChat={activeChat} />
      </SideBar>

      <Routes>
        <Route
          path="/chat/:chatId"
          element={<Chat setActiveChat={setActiveChat} />}
        />
      </Routes>
    </ChatPageContainer>
  )
}

export default HomePage
