import { useAuth } from 'contexts/AuthContext'

import { MessageContainer, MessageContent } from './Message.styles'

const Message = ({ message: { content, user: messageFrom } }) => {
  const { me } = useAuth()

  const mine = me.id === messageFrom.id

  return (
    <MessageContainer mine={mine}>
      <MessageContent mine={mine}>{content}</MessageContent>
    </MessageContainer>
  )
}

export default Message
