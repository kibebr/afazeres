import * as TE from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'
import * as F from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import { parseUser, User } from '../../domain/User'
import { selectUserByUsername } from './UserCommands.repository'

export const queryByUsername: (username: string) => TE.TaskEither<Error, O.Option<User>> = F.flow(
  selectUserByUsername,
  TE.map(F.flow(
    A.head,
    O.map((u) => u as User)
  ))
)
