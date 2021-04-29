import { User } from '../domain/User'
import * as TE from 'fp-ts/TaskEither'

export const getUser = (username: string): TE.TaskEither<Error, User>
