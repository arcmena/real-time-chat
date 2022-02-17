import cn from 'classnames'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { Button, Input } from 'components/ui'
import ErrorMessage from 'components/ui/ErrorMessage'

import { CREATE_USER_MUTATION, LOGIN_MUTATION } from 'graphql/mutations/user'

import authStorage from 'lib/authStorage'

import { SignupForm, SignupPageContainer } from './SignupPage.styles'

const schema = yup.object({
  username: yup.string().required('This field is required'),
  password: yup.string().required('This field is required'),
  repeatPassword: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

const SignupPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: { username: '', password: '', repeatPassword: '' },
    resolver: yupResolver(schema)
  })

  const [createUser] = useMutation(CREATE_USER_MUTATION)
  const [login] = useMutation(LOGIN_MUTATION)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const onSubmit = async data => {
    if (isLoading) return

    try {
      const { username, password } = data

      await createUser({ variables: { data: { username, password } } })

      const {
        data: { login: loginResponse }
      } = await login({
        variables: { data: { username, password } }
      })

      authStorage.setToken(loginResponse.token)

      navigate('/', { replace: true })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SignupPageContainer>
      <SignupForm onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h1>Sign up to Arctichat!</h1>
        <h2>To sign up you need to tell us your username and password! :D</h2>
        <Input
          className="field"
          placeholder="Your badass username here"
          name="username"
          {...register('username')}
        />
        {errors.username && (
          <ErrorMessage>{errors.username.message}</ErrorMessage>
        )}
        <Input
          className="field"
          placeholder="Your password"
          name="password"
          type="password"
          {...register('password')}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <Input
          className="field"
          placeholder="Repeat your password"
          name="repeatPassword"
          type="password"
          {...register('repeatPassword')}
        />
        {errors.repeatPassword && (
          <ErrorMessage>{errors.repeatPassword.message}</ErrorMessage>
        )}
        <Button
          className={cn('submit', isValid && !isLoading ? 'valid' : 'invalid')}
        >
          {isLoading ? 'Loading...' : 'Sign up!'}
        </Button>
      </SignupForm>
    </SignupPageContainer>
  )
}

export default SignupPage
