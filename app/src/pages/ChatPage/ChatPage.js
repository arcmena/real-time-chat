import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Chat from './components/Chat'
import Chats from './components/Chats'

import {
  ChatPageContainer,
  NoActiveChatMessage,
  SideBar
} from './ChatPage.styles'

const HomePage = () => {
  const [activeChat, setActiveChat] = useState()

  return (
    <ChatPageContainer>
      <SideBar>
        <Chats activeChat={activeChat} />
      </SideBar>

      {!activeChat && (
        <NoActiveChatMessage>
          You have no active chat. Open / create one clicking on the left tab.
        </NoActiveChatMessage>
      )}

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
