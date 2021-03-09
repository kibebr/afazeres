import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Apply'
import * as t from 'io-ts'
import { flow, constant, pipe } from 'fp-ts/function'
import { Folder, parseFolder, UnparsedFolderV } from './Folder'
import { iso, Newtype } from 'newtype-ts'
import { contains } from 'fp-ts-std/String'
import { Container, parseContainer, UnparsedContainerV } from './Container'
import { Afazer, parseAfazer, UnparsedAfazerV } from './Afazer'
import { isAlpha, isLongerThan, isShorterThan } from '../utils/String'
import { upsertAt } from 'fp-ts/Record'
import { Lens } from 'monocle-ts'

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

export type ParsedUser = {
  readonly id?: string
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

export const foldersL = Lens.fromProp<ParsedUser>()('folders')
export const containersL = Lens.fromProp<ParsedUser>()('containers')

export const parseUsername: (u: string) => E.Either<UserDomainError, Username> = flow(
  E.fromPredicate(
    isLongerThan(3),
    pipe('UsernameTooShort', constructUserError, constant)
  ),
  E.chain(E.fromPredicate(
    isShorterThan(15),
    pipe('UsernameTooLong', constructUserError, constant)
  )),
  E.chain(E.fromPredicate(
    isAlpha,
    pipe('UsernameNotAlpha', constructUserError, constant)
  )),
  E.map(isoUsername.wrap)
)

export const parseEmail: (e: string) => E.Either<UserDomainError, Email> = flow(
  E.fromPredicate(
    isLongerThan(1),
    pipe('EmailTooShort', constructUserError, constant)
  ),
  E.chain(E.fromPredicate(
    contains('@'),
    pipe('EmailDoesntInclude@', constructUserError, constant)
  )),
  E.map(isoEmail.wrap)
)

export const parsePassword: (p: string) => E.Either<UserDomainError, ParsedPassword> = flow(
  E.fromPredicate(
    isLongerThan(7),
    pipe('PasswordTooShort', constructUserError, constant)
  ),
  E.map(isoParsedPassword.wrap)
)

export const parseUser = (u: UnparsedUser): E.Either<UserDomainError, ParsedUser> => A.sequenceS(E.Applicative)({
  id: E.right(u.id),
  username: parseUsername(u.username),
  email: parseEmail(u.email),
  password: parsePassword(u.password),
  afazeres: E.right(u.afazeres),
  containers: E.right(u.containers),
  folders: E.right(u.folders)
})

export const addFolder = (f: Folder) => foldersL.modify(upsertAt(f.id, f))

export const addContainer = (c: Container) => containersL.modify(upsertAt(c.id, c))
