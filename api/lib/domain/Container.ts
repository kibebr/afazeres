import * as E from 'fp-ts/Either'
import * as F from 'fp-ts/function'
import * as AP from 'fp-ts/Apply'
import * as R from 'fp-ts/Record'
import * as t from 'io-ts'
import * as RA from 'fp-ts/ReadonlyArray'
import { parseAfazer, Afazer, UnparsedAfazerV, AfazerDomainError } from './Afazer'
import { parseEmoji, Emoji, EmojiDomainError } from './Emoji'
import { iso, Newtype } from 'newtype-ts'
import { Lens as L } from 'monocle-ts'
import { isLongerThan, isShorterThan } from '../utils/String'

/* eslint-disable functional/prefer-type-literal */
export interface ContainerName extends Newtype<{ readonly Content: unique symbol }, string> {}
/* eslint-enable functional/prefer-type-literal */

export type Container = {
  readonly id: string
  readonly name: ContainerName
  readonly emoji: Emoji
  readonly afazeres: readonly string[]
}

type ContainerDomainErrors
  = 'ContainerNameTooLong'
  | 'ContainerNameTooShort'

export type ContainerDomainError
  = { readonly tag: 'ContainerDomainError', readonly reason: ContainerDomainErrors }

export const constructContainerDomainError = (r: ContainerDomainErrors): ContainerDomainError => ({
  tag: 'ContainerDomainError',
  reason: r
})

export const isoContainerName = iso<ContainerName>()

const afazeresL = L.fromProp<Container>()('afazeres')

export const UnparsedContainerV = t.type({
  id: t.string,
  name: t.string,
  emoji: t.string,
  afazeres: t.array(t.string)
})

export type UnparsedContainer = t.TypeOf<typeof UnparsedContainerV>

export const parseContainerName: (n: string) => E.Either<ContainerDomainError, ContainerName> = F.flow(
  E.fromPredicate(
    isLongerThan(0),
    F.pipe('ContainerNameTooShort', constructContainerDomainError, F.constant)
  ),
  E.chain(E.fromPredicate(
    isShorterThan(20),
    F.pipe('ContainerNameTooLong', constructContainerDomainError, F.constant)
  )),
  E.map(isoContainerName.wrap)
)

export const parseContainer = (c: UnparsedContainer): E.Either<ContainerDomainError | EmojiDomainError, Container> => AP.sequenceS(E.Applicative)({
  id: E.right(c.id),
  name: parseContainerName(c.name),
  emoji: F.pipe(c.emoji, parseEmoji, E.fromOption(F.constant({ tag: 'EmojiDomainError', reason: 'NotEmoji' }))),
  afazeres: E.right(c.afazeres)
})

export const addAfazer = (id: string) => afazeresL.modify(RA.append(id))
