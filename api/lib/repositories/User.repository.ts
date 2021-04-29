import { User } from '../domain/User'
import * as TE from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'

export const queryByUsername = (username: string): TE.TaskEither<Error, O.Option<User>> =>
