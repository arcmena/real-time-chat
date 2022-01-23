import { useUser } from 'contexts/UserContext'

const HomePage = () => {
  const { username } = useUser()

  return <div>Hello to home page {username}!</div>
}

export default HomePage
