import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'
import * as t from 'io-ts'
import * as C from './Controller'
import * as F from 'fp-ts/function'
import * as R from 'fp-ts-ramda'
import { User } from '../domain/User'
import { queryByUsername } from '../repositories/user/User.repository'

export const GetUserRequest = t.type({
  params: t.type({
    username: t.string
  })
})

export const getUser: (res: C.HttpRequest) => T.Task<C.HttpResponse<string> | C.HttpResponse<User>> = F.flow(
  GetUserRequest.decode,
  TE.fromEither,
  TE.chainW(F.flow(
    R.prop('params'),
    R.prop('username'),
    queryByUsername
  )),
  TE.foldW(
    F.constant(F.pipe(C.internalError(), T.of)),
    F.flow(
      O.foldW(
        F.constant(F.pipe('User not found.', C.notFound)),
        C.ok
      ),
      T.of
    )
  )
)
