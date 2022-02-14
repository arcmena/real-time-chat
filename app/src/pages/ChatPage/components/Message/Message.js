import cn from 'classnames'

import { useAuth } from 'contexts/AuthContext'

import s from './Message.module.css'
import { MessageContainer, MessageContent } from './Message.styles'

const Message = ({ message: { content, user: messageFrom } }) => {
  const { me } = useAuth()

  return (
    <MessageContainer mine={me.id === messageFrom.id}>
      <MessageContent
        mine={me.id === messageFrom.id}
        // className={cn( ? s.mine : s.not_mine)}
      >
        {content}
      </MessageContent>
    </MessageContainer>
  )
}

export default Message
