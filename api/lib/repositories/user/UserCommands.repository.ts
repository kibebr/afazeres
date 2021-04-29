/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/functional-parameters */

import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import {
  ISelectUserByUsernameCommandQuery,
  ISelectUserByUsernameCommandResult
} from './UserCommands.repository.types'
import { sql } from '@pgtyped/query'
import { db } from '../Pg'

const selectUserByUsernameCommand =
  sql<ISelectUserByUsernameCommandQuery>`SELECT * FROM users WHERE username = $username`

export const selectUserByUsername = (username: string): TE.TaskEither<Error, ISelectUserByUsernameCommandResult[]> => TE.tryCatch(
  async () => await selectUserByUsernameCommand.run({ username }, db),
  E.toError
)
