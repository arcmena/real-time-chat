import { useMutation } from '@apollo/client'
import cn from 'classnames'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, Input } from 'components/ui'
import { LOGIN_MUTATION } from 'graphql/mutations/user'
import authStorage from 'lib/authStorage'

import { LoginForm, LoginPageContainer } from './LoginPage.styles'

// TODO: form validation with yup
// TODO: styles

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { isValid }
  } = useForm({
    defaultValues: { username: '', password: '' }
  })

  const [login] = useMutation(LOGIN_MUTATION)

  const navigate = useNavigate()

  const onSubmit = async data => {
    const { username, password } = data

    const {
      data: { login: loginResponse }
    } = await login({
      variables: { data: { username, password } }
    })

    if (loginResponse.token) {
      authStorage.setToken(loginResponse.token)

      navigate('/', { replace: true })
    }
  }

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <h1>Hello there!</h1>
        <h2>
          To enter the chat you need to tell us your username and password! :D
        </h2>
        <Input
          className="field"
          placeholder="Your badass username here"
          name="username"
          {...register('username')}
        />
        <Input
          className="field"
          placeholder="Your password"
          name="password"
          type="password"
          {...register('password')}
        />
        <Button className={cn('submit', isValid ? 'valid' : 'invalid')}>
          Enter!
        </Button>
      </LoginForm>
    </LoginPageContainer>
  )
}

export default LoginPage
