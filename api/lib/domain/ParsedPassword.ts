import * as E from 'fp-ts/Either'
import * as F from 'fp-ts/function'
import { isLongerThan } from '../utils/String'
import { Newtype, iso } from 'newtype-ts'

/* eslint-disable functional/prefer-type-literal */
export interface ParsedPassword extends Newtype<{ readonly ParsedPassword: unique symbol }, string> {}
/* eslint-enable functional/prefer-type-literal */

export const isoParsedPassword = iso<ParsedPassword>()

export type ParsedPasswordErrors
  = 'PasswordTooShort'

export type ParsedPasswordError = {
  readonly tag: 'ParsedPasswordError'
  readonly reason: ParsedPasswordErrors
}

export const constructParsedPasswordError = (reason: ParsedPasswordErrors): ParsedPasswordError => ({
  tag: 'ParsedPasswordError',
  reason
})

export const parsePassword: (p: string) => E.Either<ParsedPasswordError, ParsedPassword> = F.flow(
  E.fromPredicate(
    isLongerThan(7),
    F.pipe('PasswordTooShort', constructParsedPasswordError, F.constant)
  ),
  E.map(isoParsedPassword.wrap)
)
