import Routes from 'routes'

import { GlobalStyles } from 'styles/globalStyles'

import Provider from 'graphql/Provider'

const NewApp = () => {
  return (
    <Provider>
      <GlobalStyles />
      <Routes />
    </Provider>
  )
}

export default NewApp
