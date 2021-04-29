import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Apply'
import * as R from 'fp-ts/Record'
import * as F from 'fp-ts/function'
import * as t from 'io-ts'
import { parseUsername, Username, UsernameError } from './Username'
import { parseEmail, Email, EmailError } from './Email'
import { parsePassword, ParsedPassword, ParsedPasswordError } from './ParsedPassword'
import { Folder, FolderDomainError, parseFolder, UnparsedFolderV } from './Folder'
import { Container, ContainerDomainError, parseContainer, UnparsedContainerV } from './Container'
import { Afazer, parseAfazer, AfazerDomainError, UnparsedAfazerV } from './Afazer'
import { Lens as L } from 'monocle-ts'
import { EmojiDomainError } from './Emoji'

type UserErrorReasons
  = UsernameError
  | EmailError
  | ParsedPasswordError
  | ContainerDomainError
  | FolderDomainError
  | AfazerDomainError
  | EmojiDomainError

export type UserDomainError = {
  readonly tag: 'UserDomainError'
  readonly reason: UserErrorReasons
}

export const constructUserError = (r: UserErrorReasons): UserDomainError => ({
  tag: 'UserDomainError',
  reason: r
})

export type User = {
  readonly id: string
  readonly username: Username
  readonly email: Email
  readonly password: ParsedPassword
  readonly folders: Record<string, Folder>
  readonly containers: Record<string, Container>
  readonly afazeres: Record<string, Afazer>
}

export const UnparsedUserV = t.type({
  id: t.string,
  username: t.string,
  email: t.string,
  password: t.string,
  folders: t.record(t.string, UnparsedFolderV),
  containers: t.record(t.string, UnparsedContainerV),
  afazeres: t.record(t.string, UnparsedAfazerV)
})

export type UnparsedUser = t.TypeOf<typeof UnparsedUserV>

export const foldersL = L.fromProp<User>()('folders')
export const containersL = L.fromProp<User>()('containers')

export const parseUser = (u: UnparsedUser): E.Either<UserDomainError, User> => A.sequenceS(E.Applicative)({
  id: E.right(u.id),
  username: parseUsername(u.username),
  email: parseEmail(u.email),
  password: parsePassword(u.password),
  afazeres: F.pipe(u.afazeres, R.map(parseAfazer), R.sequence(E.Applicative)),
  containers: F.pipe(u.containers, R.map(parseContainer), R.sequence(E.Applicative)),
  folders: F.pipe(u.folders, R.map(parseFolder), R.sequence(E.Applicative))
})

export const addFolder = (f: Folder) => foldersL.modify(R.upsertAt(f.id, f))

export const addContainer = (c: Container) => containersL.modify(R.upsertAt(c.id, c))
