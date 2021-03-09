import { test } from 'fp-ts-std/String'
import GraphemeSplitter from 'grapheme-splitter'

const emojiSplitter = new GraphemeSplitter()

export const isLongerThan = (n: number) => (s: string): boolean => s.length > n
export const isShorterThan = (n: number) => (s: string): boolean => s.length < n
export const getEmojiLength = (s: string): number => emojiSplitter.countGraphemes(s)
export const isAlpha = test(/^[a-z0-9]+$/i)
export const isEmoji = test(/\p{Emoji}/u)
