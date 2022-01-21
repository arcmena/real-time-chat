import { useMutation } from '@apollo/client'
import cn from 'classnames'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, Input } from '../../components/ui'
import { LOGIN_MUTATION } from '../../graphql/mutations/user'
import authStorage from '../../lib/authStorage'

import s from './LoginPage.module.css'

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
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>Hello there!</h1>
      <h2>To enter the chat you need to tell us your nickname :D</h2>
      <Input
        className={s.nickname}
        placeholder="Your badass username here"
        name="username"
        {...register('username')}
      />
      <Input
        className={s.nickname}
        placeholder="Your password"
        name="password"
        type="password"
        {...register('password')}
      />
      <Button className={cn(s.submit, isValid ? s.valid : s.invalid)}>
        Enter!
      </Button>
    </form>
  )
}

export default LoginPage
