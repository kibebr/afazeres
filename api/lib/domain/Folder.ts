import * as E from 'fp-ts/Either'
import * as t from 'io-ts'
import * as RA from 'fp-ts/ReadonlyArray'
import * as AP from 'fp-ts/Apply'
import * as F from 'fp-ts/function'
import { Lens } from 'monocle-ts'
import { EmojiDomainError, parseEmoji, Emoji } from './Emoji'
import { iso, Newtype } from 'newtype-ts'
import { isLongerThan, isShorterThan } from '../utils/String'

/* eslint-disable functional/prefer-type-literal */
export interface FolderName extends Newtype<{ readonly FolderName: unique symbol }, string> {}
/* eslint-enable functional/prefer-type-literal */

const isoFolderName = iso<FolderName>()

export type FolderDomainErrors
  = 'FolderNameTooLong'
  | 'FolderNameTooShort'

export type FolderDomainError
  = { readonly tag: 'FolderDomainError', readonly reason: FolderDomainErrors }

export type Folder = {
  readonly id: string
  readonly emoji: Emoji
  readonly name: FolderName
  readonly containers: readonly string[]
}

export const UnparsedFolderV = t.type({
  id: t.string,
  emoji: t.string,
  name: t.string,
  containers: t.array(t.string)
})

export type UnparsedFolder = t.TypeOf<typeof UnparsedFolderV>

const containersL = Lens.fromProp<Folder>()('containers')

const constructFolderDomainError = (r: FolderDomainErrors): FolderDomainError => ({
  tag: 'FolderDomainError',
  reason: r
})

export const parseFolderName: (f: string) => E.Either<FolderDomainError, FolderName> = F.flow(
  E.fromPredicate(
    isLongerThan(1),
    F.pipe('FolderNameTooShort', constructFolderDomainError, F.constant)
  ),
  E.chain(E.fromPredicate(
    isShorterThan(20),
    F.pipe('FolderNameTooShort', constructFolderDomainError, F.constant)
  )),
  E.map(isoFolderName.wrap)
)

export const parseFolder = (f: UnparsedFolder): E.Either<FolderDomainError | EmojiDomainError, Folder> => AP.sequenceS(E.Applicative)({
  id: E.right(f.id),
  name: parseFolderName(f.name),
  emoji: F.pipe(f.emoji, parseEmoji, E.fromOption(F.constant({ tag: 'EmojiDomainError', reason: 'NotEmoji' }))),
  containers: E.right(f.containers)
})

export const addContainer = (id: string) => containersL.modify(RA.append(id))
