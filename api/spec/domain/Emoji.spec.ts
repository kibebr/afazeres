import { parseEmoji } from '../../lib/domain/Emoji'

describe('Emoji', () => {
  it('returns None for non-emoji strings', () => {
    const res = parseEmoji('test')

    expect(res).toBeNone()
  })

  it('returns Some for emoji char', () => {
    const res = parseEmoji('🌼')

    expect(res).toBeSome()
  })

  it('returns None if string has more than 1 char', () => {
    const res = parseEmoji('🌼🌺')

    expect(res).toBeNone()
  })

  it('returns None if str has one char but is not emoji', () => {
    const res = parseEmoji('@')

    expect(res).toBeNone()
  })
})
