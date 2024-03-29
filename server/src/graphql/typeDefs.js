import path from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

const typeDefsArray = loadFilesSync(path.join(__dirname, 'modules', '**'), {
  extensions: ['graphql']
})

export default mergeTypeDefs(typeDefsArray)
