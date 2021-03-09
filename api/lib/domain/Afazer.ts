import * as E from 'fp-ts/Either'
import * as t from 'io-ts'
import * as F from 'fp-ts/function'
import * as AP from 'fp-ts/Apply'
import { iso, Newtype } from 'newtype-ts'
import { isShorterThan } from '../utils/String'

/* eslint-disable functional/prefer-type-literal */
export interface Content extends Newtype<{ readonly Content: unique symbol }, string> {}
/* eslint-enable functional/prefer-type-literal */

export const isoContent = iso<Content>()

export type Afazer = {
  readonly id: string
  readonly content: Content
  readonly done: boolean
}

export const UnparsedAfazerV = t.type({
  id: t.string,
  content: t.string,
  done: t.boolean
})

export type UnparsedAfazer = t.TypeOf<typeof UnparsedAfazerV>

export type AfazerDomainErrors
  = 'ContentTooLong'

export type AfazerDomainError
  = { readonly tag: 'AfazerDomainError', readonly reason: AfazerDomainErrors }

export const constructAfazerDomainError = (r: AfazerDomainErrors): AfazerDomainError => ({
  tag: 'AfazerDomainError',
  reason: r
})

export const parseAfazerContent: (c: string) => E.Either<AfazerDomainError, Content> = F.flow(
  E.fromPredicate(
    isShorterThan(300),
    F.pipe('ContentTooLong', constructAfazerDomainError, F.constant)
  ),
  E.map(isoContent.wrap)
)

export const parseAfazer = (a: UnparsedAfazer): E.Either<AfazerDomainError, Afazer> => AP.sequenceS(E.Applicative)({
  id: E.right(a.id),
  content: parseAfazerContent(a.content),
  done: E.right(a.done)
})
