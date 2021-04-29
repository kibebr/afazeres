import * as E from 'fp-ts/Either'
import * as F from 'fp-ts/function'
import { isAlpha, isShorterThan, isLongerThan } from '../utils/String'
import { Newtype, iso } from 'newtype-ts'

// eslint-disable-next-line functional/prefer-type-literal
export interface Username extends Newtype<{ readonly Username: unique symbol }, string> {}

export const isoUsername = iso<Username>()

export type UsernameErrors
  = 'UsernameTooShort'
  | 'UsernameTooLong'
  | 'UsernameNotAlpha'

export type UsernameError = {
  readonly tag: 'UsernameError'
  readonly reason: UsernameErrors
}

const constructUsernameError = (reason: UsernameErrors): UsernameError => ({
  tag: 'UsernameError',
  reason
})

export const parseUsername: (u: string) => E.Either<UsernameError, Username> = F.flow(
  E.fromPredicate(
    isLongerThan(3),
    F.pipe('UsernameTooShort', constructUsernameError, F.constant)
  ),
  E.chain(E.fromPredicate(
    isShorterThan(15),
    F.pipe('UsernameTooLong', constructUsernameError, F.constant)
  )),
  E.chain(E.fromPredicate(
    isAlpha,
    F.pipe('UsernameNotAlpha', constructUsernameError, F.constant)
  )),
  E.map(isoUsername.wrap)
)
