//Chat Client to provide the connection with the backend
import ChatClient from './lib/ChatClient'
import { UIProvider } from './contexts/UIContext'

import { ChatView } from './components/chat'
import { Layout } from './components/common'

const App = () => {
  return (
    <ChatClient>
      <UIProvider>
        <Layout>
          <ChatView />
        </Layout>
      </UIProvider>
    </ChatClient>
  )
}

export default App
