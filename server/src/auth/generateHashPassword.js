import bcrypt from 'bcrypt'

import { HASH_ROUNDS } from '../constants/authConstants'

const generateHashPassword = password => bcrypt.hash(password, HASH_ROUNDS)

export default generateHashPassword
