import { nanoid } from 'nanoid'
import { isoUsername, isoEmail, isoParsedPassword, ParsedUser } from '../../lib/domain/User'

export const createParsedUser = (_?: Partial<ParsedUser>): ParsedUser => ({
  id: nanoid(),
  username: isoUsername.wrap('username'),
  email: isoEmail.wrap('email@mail.com'),
  password: isoParsedPassword.wrap('pwd'),
  folders: {},
  containers: {},
  afazeres: {},
  ..._
})
