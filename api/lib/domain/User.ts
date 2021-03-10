import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Apply'
import * as R from 'fp-ts/Record'
import * as F from 'fp-ts/function'
import * as t from 'io-ts'
import { Folder, FolderDomainError, parseFolder, UnparsedFolderV } from './Folder'
import { iso, Newtype } from 'newtype-ts'
import { contains } from 'fp-ts-std/String'
import { Container, ContainerDomainError, parseContainer, UnparsedContainerV } from './Container'
import { Afazer, parseAfazer, AfazerDomainError, UnparsedAfazerV } from './Afazer'
import { isAlpha, isLongerThan, isShorterThan } from '../utils/String'
import { Lens as L } from 'monocle-ts'
import { EmojiDomainError } from './Emoji'

/* eslint-disable functional/prefer-type-literal */
export interface Username extends Newtype<{ readonly Username: unique symbol }, string> {}
export interface Email extends Newtype<{ readonly Email: unique symbol }, string> {}
export interface ParsedPassword extends Newtype<{ readonly ParsedPassword: unique symbol }, string> {}
/* eslint-enable functional/prefer-type-literal */

export const isoUsername = iso<Username>()
export const isoEmail = iso<Email>()
export const isoParsedPassword = iso<ParsedPassword>()

export type UserDomainErrors
  = 'UsernameTooLong'
  | 'UsernameTooShort'
  | 'UsernameNotAlpha'
  | 'PasswordTooShort'
  | 'EmailTooShort'
  | 'EmailDoesntInclude@'

export type UserDomainError = {
  readonly tag: 'UserDomainError'
  readonly reason: UserDomainErrors
}

export const constructUserError = (r: UserDomainErrors): UserDomainError => ({
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

export const parseUsername: (u: string) => E.Either<UserDomainError, Username> = F.flow(
  E.fromPredicate(
    isLongerThan(3),
    F.pipe('UsernameTooShort', constructUserError, F.constant)
  ),
  E.chain(E.fromPredicate(
    isShorterThan(15),
    F.pipe('UsernameTooLong', constructUserError, F.constant)
  )),
  E.chain(E.fromPredicate(
    isAlpha,
    F.pipe('UsernameNotAlpha', constructUserError, F.constant)
  )),
  E.map(isoUsername.wrap)
)

export const parseEmail: (e: string) => E.Either<UserDomainError, Email> = F.flow(
  E.fromPredicate(
    isLongerThan(1),
    F.pipe('EmailTooShort', constructUserError, F.constant)
  ),
  E.chain(E.fromPredicate(
    contains('@'),
    F.pipe('EmailDoesntInclude@', constructUserError, F.constant)
  )),
  E.map(isoEmail.wrap)
)

export const parsePassword: (p: string) => E.Either<UserDomainError, ParsedPassword> = F.flow(
  E.fromPredicate(
    isLongerThan(7),
    F.pipe('PasswordTooShort', constructUserError, F.constant)
  ),
  E.map(isoParsedPassword.wrap)
)

export const parseUser = (u: UnparsedUser): E.Either<UserDomainError | EmojiDomainError | FolderDomainError | AfazerDomainError | ContainerDomainError, User> => A.sequenceS(E.Applicative)({
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
