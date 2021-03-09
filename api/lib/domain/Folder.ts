import * as E from 'fp-ts/Either'
import * as t from 'io-ts'
import { pipe, constant, flow } from 'fp-ts/function'
import { Container, UnparsedContainerV } from './Container'
import { Lens } from 'monocle-ts'
import { upsertAt } from 'fp-ts/Record'
import { Emoji } from './Emoji'
import { iso, Newtype } from 'newtype-ts'
import { isLongerThan, isShorterThan } from '../utils/String'

/* eslint-disable functional/prefer-type-literal */
export interface FolderName extends Newtype<{ readonly FolderName: unique symbol }, string> {}
/* eslint-enable functional/prefer-type-literal */

export const isoFolderName = iso<FolderName>()

type FolderDomainErrors
  = 'FolderNameTooLong'
  | 'FolderNameTooShort'

type FolderDomainError
  = { readonly tag: 'FolderDomainError', readonly reason: FolderDomainErrors }

export type Folder = {
  readonly id: string
  readonly emoji: Emoji
  readonly name: FolderName
  readonly containers: Record<string, Container>
}

export const UnparsedFolderV = t.type({
  id: t.string,
  emoji: t.string,
  name: t.string,
  containers: t.record(t.string, UnparsedContainerV)
})

export type UnparsedFolder = t.TypeOf<typeof UnparsedFolderV>

const containersL = Lens.fromProp<Folder>()('containers')

const constructFolderDomainError = (r: FolderDomainErrors): FolderDomainError => ({
  tag: 'FolderDomainError',
  reason: r
})

const parseFolderName: (f: string) => E.Either<FolderDomainError, FolderName> = flow(
  E.fromPredicate(
    isLongerThan(1),
    pipe('FolderNameTooShort', constructFolderDomainError, constant)
  ),
  E.chain(E.fromPredicate(
    isShorterThan(20),
    pipe('FolderNameTooShort', constructFolderDomainError, constant)
  )),
  E.map(isoFolderName.wrap)
)

export const addContainer = (c: Container) => containersL.modify(upsertAt(c.id, c))
