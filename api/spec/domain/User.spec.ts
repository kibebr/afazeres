import { parseUsername, parsePassword, parseEmail, addFolder, addContainer } from '../../lib/domain/User'
import { createFolder } from '../fixtures/createFolder'
import { createParsedUser } from '../fixtures/createParsedUser'
import { createContainer } from '../fixtures/createContainer'
import { keys } from 'fp-ts/Record'
import { findFirst } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { prop } from 'fp-ts-ramda'

describe('User', () => {
  describe('Parsing', () => {
    describe('Username', () => {
      it('fails when username is shorter than 3 chars', () => {
        const res = parseUsername('a')
        expect(res).toBeLeft()
      })

      it('fails when username is longer than 15 chars', () => {
        const res = parseUsername('abcdefllsfadpaaodsajadjoia')
        expect(res).toBeLeft()
      })

      it('fails when username is not alpha', () => {
        const res = parseUsername('@@@@kibe@@_')
        expect(res).toBeLeft()
      })
    })

    describe('Password', () => {
      it('fails when password is shorter than 7 chars', () => {
        const res = parsePassword('abcdef')
        expect(res).toBeLeft()
      })
    })

    describe('Email', () => {
      it('fails when email does not include @', () => {
        const res = parseEmail('kibegmail.com')
        expect(res).toBeLeft()
      })

      it('fails when email is shorter than 1 char', () => {
        const res = parseEmail('')
        expect(res).toBeLeft()
      })
    })
  })

  describe('Folders', () => {
    it('adds a folder', () => {
      const folder = createFolder()
      const user = createParsedUser()

      const res = addFolder(folder)(user)

      expect(pipe(
        res,
        prop('folders'),
        keys,
        findFirst((s) => s === folder.id)
      )).toBeSome()
    })
  })

  describe('Containers', () => {
    it('adds a container', () => {
      const container = createContainer()
      const user = createParsedUser()

      const res = addContainer(container)(user)

      expect(res).toBeSome()
    })
  })
})
