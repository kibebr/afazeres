import * as O from 'fp-ts/Option'
import { iso, Newtype } from 'newtype-ts'
import { flow } from 'fp-ts/function'
import { isEmoji, getEmojiLength } from '../utils/String'

/* eslint-disable functional/prefer-type-literal */
export interface Emoji extends Newtype<{ readonly Emoji: unique symbol }, string> {}
/* eslint-enable functional/prefer-type-literal */

export const isoEmoji = iso<Emoji>()

export const parseEmoji: (e: string) => O.Option<Emoji> = flow(
  O.fromPredicate(isEmoji),
  O.chain(O.fromPredicate(flow(getEmojiLength, (x) => x === 1))),
  O.map(isoEmoji.wrap)
)
