import * as E from 'fp-ts/Either'
import * as F from 'fp-ts/function'
import { contains } from 'fp-ts-std/String'
import { iso, Newtype } from 'newtype-ts'
import { isLongerThan } from '../utils/String'

/* eslint-disable functional/prefer-type-literal */
export interface Email extends Newtype<{ readonly Email: unique symbol }, string> {}
/* eslint-enable functional/prefer-type-literal */

export const isoEmail = iso<Email>()

export type EmailErrors
  = 'EmailTooShort'
  | 'EmailNo@'

export type EmailError = {
  readonly tag: 'EmailError'
  readonly reason: EmailErrors
}

export const constructEmailError = (r: EmailErrors): EmailError => ({
  tag: 'EmailError',
  reason: r
})

export const parseEmail: (e: string) => E.Either<EmailError, Email> = F.flow(
  E.fromPredicate(
    isLongerThan(1),
    F.pipe('EmailTooShort', constructEmailError, F.constant)
  ),
  E.chain(E.fromPredicate(
    contains('@'),
    F.pipe('EmailNo@', constructEmailError, F.constant)
  )),
  E.map(isoEmail.wrap)
)
