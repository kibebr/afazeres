import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'
import * as t from 'io-ts'
import * as C from './Controller'
import { flow } from 'fp-ts/function'

export const GetUserRequest = t.type({
  params: t.type({
    username: t.string
  })
})

declare const fetchUserByUsername: (u: string) => TE.TaskEither<Error, unknown> 

export const getUser: (res: C.HttpRequest) => T.Task<C.HttpResponse<any>> = flow(

)
